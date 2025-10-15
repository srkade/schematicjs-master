// ...existing code...

import React, { useState, useEffect, useRef, JSX, useLayoutEffect } from "react";
import TridentShape from "../symbols/TridentShape";
import FuseSymbol from "../symbols/FuseSymbol";
type ComponentType = {
  id: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  label: string;
  category: string;
  shape: string;
  connectors: ConnectorType[];
};
type ConnectorType = {
  id: string;
  label: string;
};
type ConnectionPoint = {
  componentId: string;
  connectorId: string;
  cavity: string;
};
type ConnectionType = {
  color: string;
  from: ConnectionPoint;
  to: ConnectionPoint;
  label: string;
};
type SchematicData = {
  masterComponents: string[];
  components: ComponentType[];
  connections: ConnectionType[];
};
// ...existing code...

const colors = {
  OG: "orange",
};

export default function Schematic({ data, scale = 5 }: { data: SchematicData; scale?: number }) {
  const svgWrapperRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Dragging state
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(
    null
  );
  const [dragOrigin, setDragOrigin] = useState<{ x: number; y: number } | null>(
    null
  );


  // Reset view handler
  const resetView = () => {
    const { w: schematicW, h: schematicH, x: fitX, y: fitY } = fitViewBox;

    const svgWidth = 2100;
    const svgHeight =900;

    const margin = 0.1;
    const scaleX = svgWidth / schematicW;
    const scaleY = svgHeight / schematicH;
    let scaleFactor = Math.min(scaleX, scaleY) * (1 - margin);

    scaleFactor *= 0.6; // If you want a zoomed-out default

    const newW = schematicW * scaleFactor;
    const newH = schematicH * scaleFactor;

    // Center calculation
    const centerX = fitX + schematicW / 2 - newW / 2;
    const centerY = fitY + schematicH / 2 - newH / 2;

    setViewBox({
      x: centerX,
      y: centerY,
      w: newW,
      h: newH,
    });
  };

  // Mouse wheel handler for zoom
  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault();
    const scaleFactor = 1.1;
    const mouseX = e.nativeEvent.offsetX;
    const mouseY = e.nativeEvent.offsetY;
    let { x, y, w, h } = viewBox;

    // Calculate zoom direction
    const zoomIn = e.deltaY < 0;
    // Mouse coordinates in SVG space
    const svg = e.currentTarget;
    const bounds = svg.getBoundingClientRect();
    const svgX = (mouseX / svg.width.baseVal.value) * w + x;
    const svgY = (mouseY / svg.height.baseVal.value) * h + y;

    let newW = zoomIn ? w / scaleFactor : w * scaleFactor;
    let newH = zoomIn ? h / scaleFactor : h * scaleFactor;

    // Keep mouse position centered after zoom
    const newX = svgX - (mouseX / svg.width.baseVal.value) * newW;
    const newY = svgY - (mouseY / svg.height.baseVal.value) * newH;

    setViewBox({
      x: newX,
      y: newY,
      w: newW,
      h: newH,
    });
  };

  //  Full screen handlers
  const enterFullscreen = () => {
    if (svgWrapperRef.current) {
      svgWrapperRef.current.requestFullscreen();
    }
  };

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Mouse event handlers for pan/drag
  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    setDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setDragOrigin({ x: viewBox.x, y: viewBox.y });
  };

  const handleMouseUp = () => {
    setDragging(false);
    setDragStart(null);
    setDragOrigin(null);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!dragging || !dragStart || !dragOrigin) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    setViewBox({
      x: dragOrigin.x - dx * (viewBox.w / 300),
      y: dragOrigin.y - dy * (viewBox.h / 100),
      w: viewBox.w,
      h: viewBox.h,
    });
  };
  const [viewBox, setViewBox] = useState({ x: 0, y: 0, w: 800, h: 600 });
  const [fitViewBox, setFitViewBox] = useState(viewBox);

  //change deafault view box on data change
  useEffect(() => {
    if (fitViewBox) {
      resetView();
    }
  }, [fitViewBox]);

  const [componentNameWidths, setComponentNameWidths] = useState<{
    [id: string]: number;
  }>({});
  const [connectorNameWidths, setConnectorNameWidths] = useState<{
    [id: string]: number;
  }>({});

  const componentNameRefs = useRef<{ [id: string]: SVGTextElement | null }>({});
  const connectorNameRefs = useRef<{ [id: string]: SVGTextElement | null }>({});
  const [connectorConnectionCount, setConnectorConnectionCount] = useState<{
    [id: string]: number;
  }>({});

  var connectionPoints: { [id: string]: { x: number; y: number } } = {};

  const componentSize = { width: 100, height: 60 };
  //pin padding changeed
  const padding = 20;
  const connectorNamePadding = 25;

  var maxX = 0;
  var maxY =
    padding +
    componentSize.height +
    spaceForWires() +
    componentSize.height +
    padding;

  useLayoutEffect(() => {
    let newWidths: { [id: string]: number } = {};
    let connWidths: { [id: string]: number } = {};
    let tempMaxX = 0;

    data.components.forEach((comp) => {
      const ref = componentNameRefs.current[comp.id];
      if (ref) {
        newWidths[comp.id] = ref.getBBox().width;
      } else {
        newWidths[comp.id] = 100; // fallback width
      }
      tempMaxX += newWidths[comp.id];

      comp.connectors.forEach((conn) => {
        const ref = connectorNameRefs.current[conn.id];
        if (ref) {
          connWidths[conn.id] = ref.getBBox().width;
        } else {
          connWidths[conn.id] = 50; // fallback width
        }
      });
    });

    setComponentNameWidths(newWidths);
    setConnectorNameWidths(connWidths);

    // Connections count
    const connCount: { [id: string]: number } = {};
    data.connections.forEach((conn) => {
      connCount[conn.from.connectorId] = (connCount[conn.from.connectorId] || 0) + 1;
      connCount[conn.to.connectorId] = (connCount[conn.to.connectorId] || 0) + 1;
    });
    setConnectorConnectionCount(connCount);

    // Set viewBox and fitViewBox AFTER layout measured
    const newBox = {
      x: 0,
      y: 0,
      w: tempMaxX,
      h: maxY,
    };

    setViewBox(newBox);
    setFitViewBox(newBox);
  }, [data]);


  // Remove wheel gesture

  // Zoom in/out buttons
  const zoom = (inOrOut: "in" | "out") => {
    const scaleFactor = 1.1;
    const { x, y, w, h } = viewBox;
    let newW = w,
      newH = h;
    if (inOrOut === "in") {
      newW = w / scaleFactor;
      newH = h / scaleFactor;
    } else {
      newW = w * scaleFactor;
      newH = h * scaleFactor;
    }
    setViewBox({ x, y, w: newW, h: newH });
  };

  function spaceForWires() {
    let connectionsCount = data.connections.length;
    return connectionsCount * 10 + 40; // 10px per connection + padding
  }

  function connectionPointKey(point: ConnectionPoint): string {
    return `${point.componentId}_${point.connectorId}_${point.cavity}`;
  }

  function getConnectionOffset(
    index: number,
    count: number,
    y1: number,
    y2: number,
    offsetStep = 10
  ) {
    let max = Math.max(y1, y2);
    let min = Math.min(y1, y2);
    let mid = count / 2;
    let offset = (index + 1) * offsetStep + offsetStep;
    let reverseOffset = max - min - (index + 1) * offsetStep - offsetStep;
    return index < mid ? offset : reverseOffset;
  }

  function getIntersection(
    xa: number,
    ya: number,
    xb: number,
    yb: number,
    xc: number,
    yc: number,
    xd: number,
    yd: number
  ) {
    // Returns intersection point if line AB and CD intersect
    const denom = (xb - xa) * (yd - yc) - (yb - ya) * (xd - xc);
    if (denom === 0) return null;
    const r = ((ya - yc) * (xd - xc) - (xa - xc) * (yd - yc)) / denom;
    const s = ((ya - yc) * (xb - xa) - (xa - xc) * (yb - ya)) / denom;
    if (r > 0 && r < 1 && s > 0 && s < 1) {
      // Intersection point
      return {
        x: xa + r * (xb - xa),
        y: ya + r * (yb - ya),
      };
    }
    return null;
  }

  function checkAndReturnIntersection(
    i: number,
    x1: number,
    x2: number,
    y1: number,
    y2: number
  ): JSX.Element | undefined {
    let intersection = null;
    for (let j = 0; j < data.connections.length; j++) {
      if (i === j) continue;
      const w2 = data.connections[j];
      const f2 = w2.from;
      const f2Tuple = getComponentConnectorTupleFromConnectionPoint(f2);
      const f2Component = f2Tuple[0];
      const f2Connector = f2Tuple[1];
      const t2 = w2.to;
      const t2Tuple = getComponentConnectorTupleFromConnectionPoint(t2);
      const t2Component = t2Tuple[0];
      const t2Connector = t2Tuple[1];

      if (!f2Component || !f2Connector || !t2Component || !t2Connector)
        continue;
      const x3 =
        getXForConnector(f2Connector, f2Component) +
        getWidthForConnector(f2Connector) / 2;
      const y3 = getYForConnector(f2Connector, f2Component) + 20 / 2;
      const x4 =
        getXForConnector(t2Connector, t2Component) +
        getWidthForConnector(t2Connector) / 2;
      const y4 = getYForConnector(t2Connector, t2Component) + 20 / 2;
      // Check intersection
      const inter = getIntersection(x1, y1, x2, y2, x3, y3, x4, y4);
      if (inter && i > j) {
        intersection = inter;
        break;
      }
    }
    if (intersection) {
      const diameter = 10;
      const radius = diameter / 2;
      // Direction of the wire
      const dx_hump = x2 - x1;
      const dy_hump = y2 - y1;
      const length_hump = Math.sqrt(dx_hump * dx_hump + dy_hump * dy_hump);
      // Unit vector along the wire
      const ux = dx_hump / length_hump;
      const uy = dy_hump / length_hump;
      // Points before and after intersection
      const beforeX = intersection.x - ux * radius;
      const beforeY = intersection.y - uy * radius;
      const afterX = intersection.x + ux * radius;
      const afterY = intersection.y + uy * radius;
      // Perpendicular unit vector
      const perpUx = -uy;
      const perpUy = ux;
      // Arc control point for semicircle (perpendicular to wire)
      const arcCtrlX = intersection.x + perpUx * radius;
      const arcCtrlY = intersection.y + perpUy * radius;

      return (
        <g>
          <path
            d={`M ${x1} ${y1} L ${beforeX} ${beforeY} Q ${arcCtrlX} ${arcCtrlY} ${afterX} ${afterY} L ${x2} ${y2}`}
            stroke={"red"}
            strokeWidth="2"
            fill="none"
          />
        </g>
      );
    }
  }

  function getConnectionsForComponent(component: ComponentType) {
    return data.connections.filter(
      (c) => c.from.componentId === component.id || c.to.componentId === component.id
    );
  }

  function getWidthForComponent(component: ComponentType): number {
    const defaultWidth = componentNameWidths[component.id] + padding
    let connectionCount = getConnectionsForComponent(component).length;
    if (connectionCount > 1) {
      let width = padding;
      component.connectors.forEach((conn) => {
        width += getWidthForConnector(conn) + padding / 2;
      });
      return Math.max(width, defaultWidth);
    }
    return defaultWidth;
  }

  function getXForComponent(component: ComponentType): number {
    let index = data.components.findIndex((c) => c.id === component.id);
    if (index < 1) {
      return padding;
    } else {
      let x = padding;
      for (let i = 1; i < index; i++) {
        let component = data.components[i];
        x += getWidthForComponent(component) + padding;
      }
      return x;
    }
  }

  function getYForComponent(component: ComponentType): number {
    let isMasterComponent = data.masterComponents.includes(component.id);
    const y = isMasterComponent
      ? padding
      : padding + componentSize.height + spaceForWires() + componentSize.height;
    return y;
  }

  function getXForComponentTitle(component: ComponentType): number {
    return (
      getXForComponent(component) +
      componentNameWidths[component.id] / 2 +
      padding / 2
    );
  }

  function getXForConnector(
    connector: ConnectorType,
    component: ComponentType
  ): number {
    let x = getXForComponent(component);
    let componentCount = component.connectors.length;
    let width = getWidthForComponent(component) / (componentCount + 1);
    let index = component.connectors.findIndex((c) => c.id === connector.id);
    let connWidth = getWidthForConnector(connector) / 2;
    const connectorSpacing = 30; //change to add spacing between greenbox
    return x + width * (index + 1) - connWidth + index * connectorSpacing;
  }

  function getYForConnector(
    connector: ConnectorType,
    component: ComponentType
  ): number {
    let isMasterComponent = data.masterComponents.includes(component.id);
    const gap = 1; //to move green box outside
    return isMasterComponent
      ? getYForComponent(component) + componentSize.height + gap
      : getYForComponent(component) - gap - 20;
  }

  function getConnectionsForConnector(conn: ConnectorType): ConnectionType[] {
    return data.connections.filter(
      (c) => c.from.connectorId === conn.id || c.to.connectorId === conn.id
    );
  }

  function getWidthForConnector(conn: ConnectorType): number {
    let connections = getConnectionsForConnector(conn);
    let interConnectionSpacing = 30;
    if (connections.length > 1) {
      let connectionsBasedWidth =
        (connections.length + 1) * interConnectionSpacing;
      return (
        // Pin padding changeed
        Math.max(
          connectionsBasedWidth,
          connectorNameWidths[conn.id] + connectorNamePadding,
          100
        )
      );
    }
    return connectorNameWidths[conn.id] + connectorNamePadding;
  }

  function getComponentConnectorTupleFromConnectionPoint(
    point: ConnectionPoint
  ): [ComponentType?, ConnectorType?] {
    const fromComponent = data.components.find(
      (comp) => point.componentId === comp.id
    );
    if (fromComponent) {
      const connector = fromComponent.connectors.find(
        (conn) => conn.id === point.connectorId
      );
      if (connector) {
        return [fromComponent, connector];
      }
    }
    return [undefined, undefined];
  }

  const buttonStyle = {
    padding: "3px 7px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    background: "white",
    cursor: "pointer",
  };

  return (
    <div
  ref={svgWrapperRef}
  style={{
    position: "relative",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: isFullscreen ? "100vh" : 600,
    background: "#fafafa",
    overflow: "hidden",
    minHeight: isFullscreen ? undefined : 600, // ensure min height stays fixed
    maxHeight: isFullscreen ? undefined : 600, // prevent growing heights
  }}
>
      <div
    style={{
      position: "relative",
      padding: 8,
      zIndex: 10,
      background: "white",
      display: "flex",
      gap: 8,
      flexShrink: 0, // prevent shrinking if flex adjustments occur
    }}
  >
        <button onClick={resetView} style={buttonStyle}>
          Reset View
        </button>
        <button onClick={() => zoom("in")} style={buttonStyle}>
          Zoom In
        </button>
        <button onClick={() => zoom("out")} style={buttonStyle}>
          Zoom Out
        </button>
        <button
          onClick={isFullscreen ? exitFullscreen : enterFullscreen}
          style={buttonStyle}
        >
          {isFullscreen ? "Default Screen" : "Full Screen"}
        </button>
      </div>
        <div style={{
    flex: 1,                  // Dynamically takes all available vertical space
    overflow: "hidden",
    display: "flex"
  }}>
        <svg
          onWheel={handleWheel}
          style={{
            border: "1px solid #ccc",
            width: "100%",
            height: "100%",
            cursor: dragging ? "grabbing" : "grab",
            display: "block",
            // backgroundColor: "#f0e086ff",
            userSelect: dragging ? "none" : "auto", // Disable text selection while dragging
            WebkitUserSelect: dragging ? "none" : "auto", // For Safari
            MozUserSelect: dragging ? "none" : "auto", // For Firefox
            msUserSelect: dragging ? ("none" as any) : ("auto" as any),
          }}
          viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}

          onTouchStart={(e) => {
            e.preventDefault();
            const t = e.touches[0];
            handleMouseDown({
              clientX: t.clientX,
              clientY: t.clientY,
            } as unknown as React.MouseEvent<SVGSVGElement>);
          }}
          onTouchMove={(e) => {
            e.preventDefault();
            const t = e.touches[0];
            handleMouseMove({
              clientX: t.clientX,
              clientY: t.clientY,
            } as unknown as React.MouseEvent<SVGSVGElement>);
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            handleMouseUp();
          }}
        >
          {data.components.map((comp, componentIndex) => (
            <g key={comp.id}>
              {comp.category?.toLowerCase() === "splice" ? (
                <g>
                  {/* Outer green circle */}
                  <circle
                    cx={getXForComponent(comp) + getWidthForComponent(comp) / 2}
                    cy={getYForComponent(comp) + componentSize.height / 2 - 40}
                    r={componentSize.height / 4} // adjust radius as needed
                    fill="white"
                    stroke="black"
                    strokeWidth={2}
                  />
                  {/* Inner black dot */}
                  <circle
                    cx={getXForComponent(comp) + getWidthForComponent(comp) / 2}
                    cy={getYForComponent(comp) + componentSize.height / 2 - 40}
                    r={componentSize.height / 6}
                    fill="black"
                  />
                </g>
              ) : (
                /* Default rectangle for other components */
                comp.shape === "rectangle" && (
                  <rect
                    x={getXForComponent(comp)}
                    y={getYForComponent(comp)}
                    width={getWidthForComponent(comp)}
                    height={componentSize.height}
                    fill="lightblue"
                    stroke="black"
                    strokeDasharray={componentIndex !== 0 ? "6,4" : undefined}
                    onClick={() => {
                      console.log("Rectangle clicked!", comp.id);
                    }}
                  />
                )
              )}

              {/* change */}
              {/* {symbolLibrary[comp.category] && (
                <g>
                  {(() => {
                    const SymbolComponent = symbolLibrary[comp.category];
                    if (!SymbolComponent) return null;

                    // Calculate  position inside the rectangle
                    const centerX = getXForComponent(comp) + getWidthForComponent(comp) / 10;
                    const centerY = getYForComponent(comp) + componentSize.height / 4;

                    return (
                      <SymbolComponent
                        x={centerX}    // adjust horizontal offset
                        y={centerY}    // adjust vertical offset
                        width={10}          // adjust size to fit rectangle
                        height={30}
                        stroke="black"
                        strokeWidth={1}
                      />
                    );
                  })()}
                </g>
              )} */}
              <text
                vectorEffect="non-scaling-stroke"
                ref={(el) => {
                  componentNameRefs.current[comp.id] = el;
                }}
                x={getXForComponentTitle(comp)}
                // y={getYForComponent(comp) + componentSize.height / 2}
                y={
                  getYForComponent(comp) +
                  (getYForComponent(comp) + componentSize.height / 2 < viewBox.y + viewBox.h / 2
                    ? -componentSize.height / 2 //+(-0.10)  // above component
                    : componentSize.height + 30)       // below component
                }
                textAnchor="middle"
                fontSize="12"
                fill="black"
              >
                {comp.label + ` (${comp.id})`}
              </text>
              {comp.connectors.map((conn) => (
                <g key={conn.id}>
                  {/* open conditional rendering when the component is not splice */}
                  {comp.category?.toLowerCase() !== "splice" && (
                    <rect
                      x={getXForConnector(conn, comp)}
                      y={getYForConnector(conn, comp)}
                      width={getWidthForConnector(conn)}
                      height={20}
                      fill="lightgreen"
                      stroke="black"
                      strokeDasharray={componentIndex !== 0 ? "6,4" : undefined}
                    />
                  )}
                  {/* load center fuse symbol */}
                  {comp.label.toLowerCase() === "load center" && (
                    <FuseSymbol
                      cx={getXForConnector(conn, comp) + getWidthForConnector(conn) / 2}
                      cy={getYForConnector(conn, comp) +50} // adjust vertical offset
                      size={16}
                      stroke="black"
                    />
                  )}
                  <text
                    ref={(el) => {
                      connectorNameRefs.current[conn.id] = el;
                    }}
                    x={
                      getXForConnector(conn, comp)
                      // + getWidthForConnector(conn) / 2
                    }
                    y={getYForConnector(conn, comp) + 13}
                    textAnchor="end" //change to move text at the left
                    dominantBaseline="middle" //change to take text left at middle
                    fontSize="10"
                    fill="black"
                    fontWeight="bold"
                  >
                    {conn.label}
                  </text>
                </g>
              ))}
            </g>
          ))}

          {data.connections.map((wire, i) => {
            const fromConn = wire.from;
            const toConn = wire.to;
            
            const fromData =
              getComponentConnectorTupleFromConnectionPoint(fromConn);
            const fromComponent = fromData[0];
            const from = fromData[1];

            const toData =
              getComponentConnectorTupleFromConnectionPoint(toConn);
            const toComponent = toData[0];
            const to = toData[1];

            if (!from || !to) return null;

            let isFromMasterComponent = data.masterComponents.includes(
              fromComponent!.id
            );
            let isToMasterComponent = data.masterComponents.includes(
              toComponent!.id
            );

            var fromStoredConnectionPoint =
              connectionPoints[connectionPointKey(wire.from)];

            var fromX = fromStoredConnectionPoint?.x;
            if (fromX == undefined) {
              const fromConnectorX = getXForConnector(from, fromComponent!);
              const fromConnectorWidth = getWidthForConnector(from);
              const fromConnectorCount = connectorConnectionCount[from.id] || 1;
              const connIndex = getConnectionsForConnector(from).findIndex(
                (c) => c === wire
              );
              const fromConnectorOffset =
                fromConnectorCount === 1
                  ? fromConnectorWidth / 2
                  : (fromConnectorWidth / (fromConnectorCount + 1)) *
                    (connIndex + 1);

              fromX = fromConnectorX + fromConnectorOffset;
            }

            var fromY = fromStoredConnectionPoint?.y;
            if (fromY == undefined) {
              fromY = isFromMasterComponent
                ? getYForConnector(from, fromComponent!) + 20
                : getYForConnector(from, fromComponent!);
            }

            connectionPoints[connectionPointKey(wire.from)] = {
              x: fromX,
              y: fromY,
            };

            var toStoredConnectionPoint =
              connectionPoints[connectionPointKey(wire.to)];
            var toX = toStoredConnectionPoint?.x;
            if (toX == undefined) {
              const toConnectorX = getXForConnector(to, toComponent!);
              const toConnectorWidth = getWidthForConnector(to);
              const toConnectorCount = connectorConnectionCount[to.id] || 1;
              const connIndexTo = getConnectionsForConnector(to).findIndex(
                (c) => c === wire
              );
              const toConnectorOffset =
                toConnectorCount === 1
                  ? toConnectorWidth / 2
                  : (toConnectorWidth / (toConnectorCount + 1)) *
                    (connIndexTo + 1);

              toX = toConnectorX + toConnectorOffset;
            }
            var toY = toStoredConnectionPoint?.y;
            if (toY == undefined) {
              toY = isToMasterComponent
                ? getYForConnector(to, toComponent!) + 20
                : getYForConnector(to, toComponent!);
            }
            
            

            connectionPoints[connectionPointKey(wire.to)] = { x: toX, y: toY };

            const offset = getConnectionOffset(
              i,
              data.connections.length,
              fromY,
              toY,
              10
            );
            let min = Math.min(fromY, toY);
            const midY = min + offset; //middle line start dynamically
            // Calculate the positions where the tridents should be
            const fromTridentY = fromY < toY ? midY : fromY - 10; // lift if needed
            const toTridentY = fromY < toY ? toY : midY + 10;
            let isFromTop = isFromMasterComponent;
            let isToTop = isToMasterComponent;
            let fromLabelY = isFromTop ? fromY - 5 : fromY + 15;
            let toLabelY = isToTop ? toY - 5 : toY + 15;

            let wireElement;
            wireElement = (
              <g>
                {/* <circle cx={fromX} cy={fromY} r={5} fill={wire.color}></circle> */}

                {/* {isFromTop ? (
                  // top component → trident points UP
                  <TridentShape cx={fromX} cy={fromY - 15} color={wire.color} size={10} />
                ) : (
                  // bottom component → trident points DOWN
                  <g transform={`translate(${fromX}, ${fromY + 15}) scale(1, -1)`}>
                    <TridentShape cx={0} cy={0} color={wire.color} size={10} />
                  </g>
                )} */}
                {fromComponent?.category?.toLowerCase() !== "splice" && (
                  <>
                    {isFromTop ? (
                      // top component → trident points UP
                      <TridentShape
                        cx={fromX}
                        cy={fromY - 15}
                        color={wire.color}
                        size={10}
                      />
                    ) : (
                      // bottom component → trident points DOWN
                      <g
                        transform={`translate(${fromX}, ${
                          fromY + 15
                        }) scale(1, -1)`}
                      >
                        <TridentShape
                          cx={0}
                          cy={0}
                          color={wire.color}
                          size={10}
                        />
                      </g>
                    )}
                  </>
                )}
                


                <polyline
                  key={i}
                  points={`${fromX},${fromY} ${fromX},${min + offset} ${toX},${
                    min + offset
                  } ${toX},${toY}`}
                  fill="none"
                  stroke={wire.color}
                  strokeWidth={2}
                  markerEnd="url(#arrowhead)"
                />
                {/* <circle cx={toX} cy={toY} r={5} fill={wire.color}></circle> */}
                {toComponent?.category?.toLowerCase() !== "splice" && (
                  <>
                    {isToTop ? (
                      // top component → trident points UP
                      <TridentShape
                        cx={toX}
                        cy={toY - 15}
                        color={wire.color}
                        size={10}
                      />
                    ) : (
                      // bottom component → trident points DOWN
                      <g
                        transform={`translate(${toX}, ${
                          toY + 15
                        }) scale(1, -1)`}
                      >
                        <TridentShape
                          cx={0}
                          cy={0}
                          color={wire.color}
                          size={10}
                        />
                      </g>
                    )}
                  </>
                )}

                <text
                  x={fromX + 10}
                  y={fromLabelY}
                  textAnchor="start"
                  fontSize="10"
                  alignmentBaseline="middle"
                  fill="black"
                  fontWeight="bold"
                >
                  {wire.from.cavity}
                </text>
                <text
                  x={toX + 10}
                  y={toLabelY}
                  textAnchor="start"
                  fontSize="10"
                  alignmentBaseline="middle"
                  fill="black"
                  fontWeight="bold"
                >
                  {wire.to.cavity}
                </text>
              </g>
            );
            return <g key={i}>{wireElement}</g>;
          })}
        </svg>
      </div>
    </div>
  );
}
