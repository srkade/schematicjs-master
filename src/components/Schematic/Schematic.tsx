// ...existing code...

import React, { useState, useEffect, useRef, JSX } from "react";
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
  components: ComponentType[];
  connections: ConnectionType[];
};
// ...existing code...

const colors = {
  OG: "orange",
};

export default function Schematic({ data }: { data: SchematicData }) {
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
    setViewBox(fitViewBox);
  };

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
      x: dragOrigin.x - dx * (viewBox.w / 800),
      y: dragOrigin.y - dy * (viewBox.h / 600),
      w: viewBox.w,
      h: viewBox.h,
    });
  };
  const [viewBox, setViewBox] = useState({ x: 0, y: 0, w: 800, h: 600 });
  const [fitViewBox, setFitViewBox] = useState(viewBox);
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
  const padding = 50;
  const connectorNamePadding = 25;

  var maxX = 0;
  var maxY =
    padding +
    componentSize.height +
    spaceForWires() +
    componentSize.height +
    padding;

  useEffect(() => {
    var newWidths: { [id: string]: number } = {};
    var connWidths: { [id: string]: number } = {};

    data.components.forEach((comp, i) => {
      const ref = componentNameRefs.current[comp.id];
      if (ref) {
        newWidths[comp.id] = ref.getBBox().width;
      }
      maxX += newWidths[comp.id];
      comp.connectors.forEach((conn) => {
        const ref = connectorNameRefs.current[conn.id];
        if (ref) {
          connWidths[conn.id] = ref.getBBox().width;
        }
      });
    });
    setConnectorNameWidths(connWidths);
    setComponentNameWidths(newWidths);

    var connCount: { [id: string]: number } = {};
    data.connections.forEach((conn) => {
      const fromConnector = conn.from.connectorId;
      const toConnector = conn.to.connectorId;
      connCount[fromConnector] = (connCount[fromConnector] || 0) + 1;
      connCount[toConnector] = (connCount[toConnector] || 0) + 1;
    });
    setConnectorConnectionCount(connCount);

    const newBox = {
      x: 0,
      y: 0,
      w: maxX,
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
    return (connectionsCount * 10) + 40; // 10px per connection + padding
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
    let offset = ((index + 1) * offsetStep) + offsetStep
    let reverseOffset = max - min - ((index + 1) * offsetStep) - offsetStep
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

  function getWidthForComponent(component: ComponentType): number {
    let index = data.components.findIndex((c) => c.id === component.id);
    if (index == 0) {
      let last = data.components[data.components.length - 1];
      let lastX = getXForComponent(last);
      let lastWidth = getWidthForComponent(last);
      return lastX + lastWidth;
    }
    if (component.connectors.length == 1) {
      return componentNameWidths[component.id] + padding;
    } else {
      let width = padding;
      component.connectors.forEach((conn) => {
        width += getWidthForConnector(conn) + padding / 2;
      });
      return Math.max(width, componentNameWidths[component.id] + padding);
    }
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
    let index = data.components.findIndex((c) => c.id === component.id);
    const y =
      index < 1
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
    return x + width * (index + 1) - connWidth;
  }

  function getYForConnector(
    connector: ConnectorType,
    component: ComponentType
  ): number {
    let index = data.components.findIndex((c) => c.id === component.id);
    return index < 1
      ? getYForComponent(component) + componentSize.height - 10
      : getYForComponent(component) - 10;
  }

  function getConnectionsForConnector(conn: ConnectorType): ConnectionType[] {
    return data.connections.filter(
      (c) => c.from.connectorId === conn.id || c.to.connectorId === conn.id
    );
  }

  function getWidthForConnector(conn: ConnectorType): number {
    let connections = getConnectionsForConnector(conn);
    let interConnectionSpacing = 15;
    if (connections.length > 1) {
      let connectionsBasedWidth = (connections.length + 1) * interConnectionSpacing;
      return (
        Math.max(connectionsBasedWidth, connectorNameWidths[conn.id] + connectorNamePadding)
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

  function getContrastingColor(hex: string): string {
    // Remove '#' if present
    hex = hex.replace(/^#/, "");
    // Parse r, g, b
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // If luminance is high, return black; else, return white
    return luminance > 0.5 ? "#000000" : "#FFFFFF";
  }

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div style={{ position: "absolute", top: 10, left: 10, zIndex: 10 }}>
        <button
          onClick={resetView}
          style={{
            marginRight: 8,
            padding: "6px 10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            background: "white",
            cursor: "pointer",
          }}
        >
          Reset View
        </button>
        <button
          onClick={() => zoom("in")}
          style={{
            marginRight: 8,
            padding: "6px 10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            background: "white",
            cursor: "pointer",
          }}
        >
          Zoom In
        </button>
        <button
          onClick={() => zoom("out")}
          style={{
            padding: "6px 10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            background: "white",
            cursor: "pointer",
          }}
        >
          Zoom Out
        </button>
      </div>

      <svg
        width={"1024"}
        height="768"
        style={{
          border: "1px solid #ccc",
          background: "#fafafa",
          cursor: dragging ? "grabbing" : "grab",
        }}
        viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {data.components.map((comp, componentIndex) => (
          <g key={comp.id}>
            {comp.shape === "rectangle" && (
              <rect
                x={getXForComponent(comp)}
                y={getYForComponent(comp)}
                width={getWidthForComponent(comp)}
                height={componentSize.height}
                fill="lightblue"
                stroke="black"
                strokeDasharray={componentIndex !== 0 ? "6,4" : undefined}
                onClick={() => {
                  // Your callback logic here
                  console.log("Rectangle clicked!");
                }}
              />
            )}
            <text
              ref={(el) => {
                componentNameRefs.current[comp.id] = el;
              }}
              x={getXForComponentTitle(comp)}
              y={getYForComponent(comp) + componentSize.height / 2}
              textAnchor="middle"
              fontSize="12"
              fill="black"
            >
              {comp.label + ` (${comp.id})`}
            </text>
            {comp.connectors.map((conn) => (
              <g key={conn.id}>
                <rect
                  x={getXForConnector(conn, comp)}
                  y={getYForConnector(conn, comp)}
                  width={getWidthForConnector(conn)}
                  height={20}
                  fill="lightgreen"
                  stroke="black"
                  strokeDasharray={componentIndex !== 0 ? "6,4" : undefined}
                />
                <text
                  ref={(el) => {
                    connectorNameRefs.current[conn.id] = el;
                  }}
                  x={
                    getXForConnector(conn, comp) +
                    getWidthForConnector(conn) / 2
                  }
                  y={getYForConnector(conn, comp) + 13}
                  textAnchor="middle"
                  fontSize="10"
                  fill="black"
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

          const toData = getComponentConnectorTupleFromConnectionPoint(toConn);
          const toComponent = toData[0];
          const to = toData[1];

          if (!from || !to) return null;

          let fromIndex = data.components.findIndex(
            (c) => c.id === fromComponent!.id
          );
          let toIndex = data.components.findIndex(
            (c) => c.id === toComponent!.id
          );

          var fromStoredConnectionPoint =
            connectionPoints[connectionPointKey(wire.from)];

          var fromX = fromStoredConnectionPoint?.x;
          if (fromX == undefined) {
            const fromConnectorX = getXForConnector(from, fromComponent!);
            const fromConnectorWidth = getWidthForConnector(from);
            const fromConnectorCount = connectorConnectionCount[from.id] || 1;
            const fromConnectorOffset =
              fromConnectorCount == 1
                ? fromConnectorWidth / 2
                : (fromConnectorWidth / (fromConnectorCount + 1)) * (i + 1);

            fromX = fromConnectorX + fromConnectorOffset;
          }

          var fromY = fromStoredConnectionPoint?.y;
          if (fromY == undefined) {
            fromY =
              fromIndex == 0
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
            const toConnectorOffset =
              toConnectorCount == 1
                ? toConnectorWidth / 2
                : (toConnectorWidth / (toConnectorCount + 1)) * (i + 1);

            toX = toConnectorX + toConnectorOffset;
          }
          var toY = toStoredConnectionPoint?.y;
          if (toY == undefined) {
            toY =
              toIndex == 0
                ? getYForConnector(to, toComponent!) + 20
                : getYForConnector(to, toComponent!);
          }

          connectionPoints[connectionPointKey(wire.to)] = { x: toX, y: toY };

          const offset = getConnectionOffset(i, data.connections.length,fromY, toY, 10);
          let min = Math.min(fromY, toY);
          let radius = 5;
          let wireElement;
          wireElement = (
            <g>
              <circle cx={fromX} cy={fromY} r={radius} fill={"white"} stroke={wire.color}></circle>
              <polyline
                key={i}
                points={`
                  ${fromX},${fromIndex == 0 ? fromY + radius : fromY - radius} ${fromX},${min + offset} ${toX},${
                  min + offset
                } ${toX},${toIndex == 0 ? toY + radius : toY - radius}`}
                fill="none"
                stroke={wire.color}
                strokeWidth={2}
                markerEnd="url(#arrowhead)"
              />
              <circle cx={toX} cy={toY} r={5} fill={"white"} stroke={wire.color}></circle>
              <text
                x={fromX}
                y={fromY}
                textAnchor="middle"
                fontSize="5"
                alignmentBaseline="middle"
                fill="black"
              >
                {wire.from.cavity}
              </text>
              <text
                x={toX}
                y={toY}
                textAnchor="middle"
                fontSize="5"
                alignmentBaseline="middle"
                fill="black"
              >
                {wire.to.cavity}
              </text>
            </g>
          );
          return <g key={i}>{wireElement}</g>;
        })}
      </svg>
    </div>
  );
}
