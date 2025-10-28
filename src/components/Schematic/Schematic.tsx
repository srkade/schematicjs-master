// ...existing code...

import React, {
  useState,
  useEffect,
  useRef,
  JSX,
  useLayoutEffect,
} from "react";
import TridentShape from "../symbols/TridentShape";
import FuseSymbol from "../symbols/FuseSymbol";
import Sensor from "../symbols/Sensor";
import ElectricalSwitch from "../symbols/ElectricalSwitch";
import Transistor from "../symbols/Transistor";
import Transformer from "../symbols/Transformer";
import MotorSymbol from "../symbols/MotorSymbol";


interface ComponentType {
  id: string;
  label: string;
  category: string;
  shape: string;
  connectors: Array<{ id: string; label: string }>;
  engineering_component_name?: string;
  engineering_manufacturer?: string;
  primary_part_number?: string;
  harness_name?: string;
  component_type?: string;
  connector_type?: string;
  remove?: boolean;
  manufacturer?: string;
  connector_part_number?: string;
  gender?: string;
}
type ConnectorType = {
  id: string;
  label: string;
  color?: string;
  gender?: string;
};
type ConnectionPoint = {
  componentId: string;
  connectorId: string;
  cavity: string;
  gender?: string;
};
type ConnectionType = {
  color?: string;
  from: ConnectionPoint;
  to: ConnectionPoint;
  label: string;
  wireDetails?: WireDetailsType; // Add this
  
};
type SchematicData = {
  masterComponents: string[];
  components: ComponentType[];
  connections: ConnectionType[];
};

interface WirePopupType {
  color?: string;
  fromComponent?: ComponentType;
  toComponent?: ComponentType;
  fromConnector?: {
    label?: string;
    gender?: string;
  };
  toConnector?: {
    label?: string;
    gender?: string;
  };
  wire?: {
    color?: string;
    from?: {
      componentId?: string;
      connectorId?: string;
      cavity?: string;
      gender?: string;
    };
    to?: {
      componentId?: string;
      connectorId?: string;
      cavity?: string;
      gender?: string;
    };
    wireDetails?: {
      circuitNumber?: string;
      wireSize?: number;
      wireColor?: string;
      wireLength?: number;
      wireType?: string;
      twistId?: string;
      shieldId?: string;
      wireOption?: string;
      mark?: string;
      from?: {
        connectorNumber?: string;
        devName?: string;
        connPartNumber?: string;
        termPartNo?: string;
        sealPartNo?: string;
        cavity?: string;
      };
      to?: {
        connectorNumber?: string;
        devName?: string;
        connPartNumber?: string;
        termPartNo?: string;
        sealPartNo?: string;
        cavity?: string;
      };
    };
  };
}

type WireDetailsType = {
  circuitNumber: string;
  wireSize: number;
  wireColor: string;
  wireLength: number;
  wireType: string;
  twistId: string;
  shieldId: string;
  wireOption: string;
  mark: string;
  from: {
    connectorNumber: string;
    devName: string;
    connPartNumber: string;
    termPartNo: string;
    sealPartNo: string;
    cavity: string;
  };
  to: {
    connectorNumber: string;
    devName: string;
    connPartNumber: string;
    termPartNo: string;
    sealPartNo: string;
    cavity: string;
  };
};
interface PopupConnectorType {
  componentCode?: string;
  connectorCode?: string;
  label?: string;
  harnessName?: string;
  partNumber?: string;
  gender?: string;
  cavityCount?: number;
  color?: string;
  connectorType?: string;
  manufacturer?: string;
  termPartNo?: string;
  sealPartNo?: string;
}





// ...existing code...
const colors = {
  OG: "orange",
};

export default function Schematic({
  data,
  scale = 1,
}: {
  data: SchematicData;
  scale?: number;
}) {
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

  //states for managing the component selection
  const [selectedComponentIds, setSelectedComponentIds] = useState<string[]>(
    []
  );
  const [popupComponent, setPopupComponent] = useState<ComponentType | null>(
    null
  );
  const [popupPosition, setPopupPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  //states to manage the wire selection
  const [selectedWires, setSelectedWires] = useState<string[]>([]);
  const [popupWire, setPopupWire] = useState<WirePopupType | null>(null);
  const [popupWirePosition, setPopupWirePosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  //state to manange the connector selection
  const [selectedConnector, setSelectedConnector] = useState<ConnectorType | null>(null);
  const [popupConnector, setPopupConnector] = useState<PopupConnectorType | null>(null);

  const handleConnectorClick = (
    e: React.MouseEvent<SVGRectElement, MouseEvent>,
    connector: ConnectorType,
    comp: ComponentType
  ) => {
    e.stopPropagation();
    setSelectedComponentIds([]);  // deselect any selected component
    setSelectedWires([]);
    setSelectedConnector(connector);
    const cavityCount = calculateCavityCountForConnector(connector);
    setPopupComponent(null);
    setPopupWire(null);


    setPopupConnector({
      componentCode: comp.label || comp.id,
      connectorCode: connector.label || connector.id,
      harnessName: comp.harness_name,
      partNumber: comp.connector_part_number,
      gender: connector.gender,
      color: connector.color,
      connectorType: comp.connector_type,
      cavityCount,
    });
    setPopupWire(null);
  };



  // Reset view handler
  // const resetView = () => {
  //   if (!svgWrapperRef.current) return;

  //   const svgWidth = svgWrapperRef.current.clientWidth;
  //   const svgHeight = svgWrapperRef.current.clientHeight;

  //   const { w: schematicW, h: schematicH, x: fitX, y: fitY } = fitViewBox;

  //   let scaleFactor = 1;

  //   if (data.components.length === 1) {
  //     // Single component: apply default zoom factor
  //     scaleFactor = scaleFactor * 0.6; // Zoomed out default
  //   } else {
  //     // Multiple components: scale to fit SVG
  //     const margin = 0.05;
  //     const scaleX = svgWidth / schematicW;
  //     const scaleY = svgHeight / schematicH;
  //     scaleFactor = Math.min(scaleX, scaleY) * (1 - margin);
  //   }

  //   const newW = schematicW * scaleFactor;
  //   const newH = schematicH * scaleFactor;

  //   // Center schematic
  //   const centerX = fitX + (schematicW - newW) / 2;
  //   const centerY = fitY + (schematicH - newH) / 2;

  //   setViewBox({
  //     x: centerX,
  //     y: centerY,
  //     w: newW,
  //     h: newH,
  //   });
  // };

  const resetView = () => {
    if (!svgWrapperRef.current) return;

    const svgWidth = svgWrapperRef.current.clientWidth;
    const svgHeight = svgWrapperRef.current.clientHeight;

    const { w: schematicW, h: schematicH, x: fitX, y: fitY } = fitViewBox;

    const margin = 0.05;
    const scaleX = svgWidth / schematicW;
    const scaleY = svgHeight / schematicH;
    let scaleFactor = Math.min(scaleX, scaleY) * (1 - margin);

    let newW, newH, centerX, centerY;

    if (schematicW < svgWidth && schematicH < svgHeight) {
      // Small schematic — keep centered
      scaleFactor = Math.min(scaleFactor, 1);
      newW = schematicW * scaleFactor + 200;
      newH = schematicH * scaleFactor + 200;

      centerX = fitX - (newW - schematicW) / 2;
      centerY = fitY - (newH - schematicH) / 2;
    } else {
      // Large schematic — align to top and expand horizontally
      const expandFactor = 1.3; // expand width to the right
      newW = schematicW * expandFactor;
      newH = schematicH * scaleFactor * 2; // keep proportional height

      centerX = fitX;     // left aligned
      centerY = fitY + 100;     // top aligned
    }

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
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // If click is outside both the SVG and popup
      if (
        !svgWrapperRef.current?.contains(e.target as Node) &&
        !popupRef.current?.contains(e.target as Node)
      ) {
        setSelectedComponentIds([]);
        setPopupComponent(null);
        setSelectedConnector(null);
        setPopupConnector(null);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!svgWrapperRef.current?.contains(e.target as Node)) {
        setSelectedComponentIds([]);
        setPopupComponent(null);
        setSelectedConnector(null);
        setPopupConnector(null);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);


  const handleClosePopup = (e: React.MouseEvent) => {
    e.stopPropagation();        // prevent outside-click effect
    setPopupConnector(null);    // close popup
    setSelectedConnector(null); // clear highlight
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
      x: dragOrigin.x - dx * (viewBox.w / 300),
      y: dragOrigin.y - dy * (viewBox.h / 100),
      w: viewBox.w,
      h: viewBox.h,
    });
  };
  const popupRef = useRef<HTMLDivElement | null>(null);

  const [viewBox, setViewBox] = useState({ x: 0, y: 0, w: 800, h: 600 });
  const [fitViewBox, setFitViewBox] = useState(viewBox);
  // Track if popup was manually closed
  const [popupClosedManually, setPopupClosedManually] = useState(false);

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
  const clickTimeout = useRef<number | null>(null);

  const [connectorConnectionCount, setConnectorConnectionCount] = useState<{
    [id: string]: number;
  }>({});

  var connectionPoints: { [id: string]: { x: number; y: number } } = {};

  const componentSize = { width: 100, height: 60 };
  const connectorHeight = 20;
  //pin padding changeed
  const padding = 20;
  const connectorNamePadding = 25;
  const connectorSpacing = 30; //change to add spacing between greenbox

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
      connCount[conn.from.connectorId] =
        (connCount[conn.from.connectorId] || 0) + 1;
      connCount[conn.to.connectorId] =
        (connCount[conn.to.connectorId] || 0) + 1;
    });
    setConnectorConnectionCount(connCount);

    // Set viewBox and fitViewBox AFTER layout measured
    const newBox = {
      x: 0,
      y: 0,
      w: tempMaxX,
      h: maxY,
    };
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
    return connectionsCount * 20 + 40; // 20px per connection + padding
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
    let reverseOffset = max - min - index * offsetStep - offsetStep;
    return reverseOffset;
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
        getWidthForConnector(f2Connector, f2Component) / 2;
      const y3 = getYForConnector(f2Connector, f2Component) + 20 / 2;
      const x4 =
        getXForConnector(t2Connector, t2Component) +
        getWidthForConnector(t2Connector, t2Component) / 2;
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
      (c) =>
        c.from.componentId === component.id || c.to.componentId === component.id
    );
  }

  function getWidthForComponent(component: ComponentType): number {
    const defaultWidth = componentNameWidths[component.id] + padding;
    if (component.shape === "rectangle") {
      let connectionCount = getConnectionsForComponent(component).length;
      if (connectionCount > 1) {
        let width = connectorSpacing;
        component.connectors.forEach((conn) => {
          width += getWidthForConnector(conn, component) + connectorSpacing;
        });
        return Math.max(width, defaultWidth);
      }
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
      : padding +
      componentSize.height +
      spaceForWires() +
      componentSize.height +
      padding;
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
    if (component.shape === "rectangle") {
      let connectorCount = component.connectors.length;
      let index = component.connectors.findIndex((c) => c.id === connector.id);
      var connWidth = 0;
      if (connectorCount > 1) {
        connWidth += connectorSpacing;
        for (var i = 0; i < index; i++) {
          let conn = component.connectors[i];
          connWidth += getWidthForConnector(conn, component);
          connWidth += connectorSpacing;
        }
        return x + connWidth;
      }
    }
    return (
      x +
      getWidthForComponent(component) / 2 -
      getWidthForConnector(component.connectors[0], component) / 2
    );
  }

  function getYForConnector(
    connector: ConnectorType,
    component: ComponentType
  ): number {
    let isMasterComponent = data.masterComponents.includes(component.id);
    return isMasterComponent
      ? getYForComponent(component) + componentSize.height
      : getYForComponent(component) - 20;
  }

  function getConnectionsForConnector(conn: ConnectorType): ConnectionType[] {
    return data.connections.filter(
      (c) => c.from.connectorId === conn.id || c.to.connectorId === conn.id
    );
  }

  function getWidthForConnector(
    conn: ConnectorType,
    comp: ComponentType
  ): number {
    let connections = getConnectionsForConnector(conn);
    if (comp.shape === "rectangle") {
      let interConnectionSpacing = 30;
      let connectionsBasedWidth =
        (connections.length + 1) * interConnectionSpacing;
      return Math.max(
        connectionsBasedWidth,
        connectorNameWidths[conn.id] + connectorNamePadding,
        100
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
  function getXForWireToSplice(
    component: ComponentType,
    wireIndex: number,
    totalWires: number
  ) {
    // always attach in center horizontally
    const centerX =
      getXForComponent(component) + getWidthForComponent(component) / 2;
    // optionally spread vertically slightly
    const spacing = 10; // space between multiple wires
    const offsetY = (wireIndex - (totalWires - 1) / 2) * spacing;
    return { x: centerX, offsetY };
  }

  function calculateCavityCountForConnector(conn: ConnectorType): number {
    // Count all connections where this connector is involved
    const count = data.connections.filter(
      (connection) =>
        connection.from.connectorId === conn.id ||
        connection.to.connectorId === conn.id
    ).length;

    return count;
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
        height: isFullscreen ? "100vh" : "100%",
        background: "#fafafa",
        overflow: "hidden",
        minHeight: isFullscreen ? undefined : "100%", // ensure min height stays fixed
        maxHeight: isFullscreen ? undefined : "100%", // prevent growing heights
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
      <div
        style={{
          flex: 1, // Dynamically takes all available vertical space
          overflow: "hidden",
          display: "flex",
        }}
      >
        <svg
          onClick={(e) => {
            // Only deselect if click is on the SVG itself, not on components
            if ((e.target as SVGElement).tagName === "svg") {
              setSelectedComponentIds([]);
              setPopupComponent(null);
              setPopupClosedManually(false);
            }
          }}
          onWheel={handleWheel}
          style={{
            border: "1px solid #ccc",
            width: "100%",
            height: "100%",
            cursor: dragging ? "grabbing" : "grab",
            display: "block",
            backgroundColor: "#e5e5e5",
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
                  <circle
                    cx={getXForComponent(comp) + getWidthForComponent(comp) / 2}
                    cy={getYForComponent(comp) - connectorHeight / 2}
                    r={componentSize.height / 8} // adjust radius as needed
                    fill="white"
                    stroke="black"
                    strokeWidth={1}
                  />
                  <circle
                    cx={getXForComponent(comp) + getWidthForComponent(comp) / 2}
                    cy={getYForComponent(comp) - connectorHeight / 2}
                    r={componentSize.height / 10}
                    fill="black"
                  />
                </g>
              ) : (
                comp.shape === "rectangle" && (
                  <g
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedWires([]);
                      setSelectedConnector(null);

                      // Select this component
                      setSelectedComponentIds([comp.id]);
                      setPopupWire(null);
                      setPopupConnector(null);


                      // Show popup only if it wasn't manually closed
                      if (!popupClosedManually) {
                        setPopupComponent(comp);
                        setPopupPosition({
                          x:
                            getXForComponent(comp) +
                            getWidthForComponent(comp) +
                            900,
                          y:
                            getYForComponent(comp) + componentSize.height + 100,
                        });
                      }
                    }}
                  >
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
                    {selectedComponentIds.includes(comp.id) && (
                      <rect
                        x={getXForComponent(comp)}
                        y={
                          getYForComponent(comp) < viewBox.y + viewBox.h / 2
                            ? getYForComponent(comp) - 60
                            : getYForComponent(comp) + 60
                        }
                        width={getWidthForComponent(comp)}
                        height={componentSize.height}
                        fill="#3390FF"
                        opacity={0.3}
                        pointerEvents="none" // so the click still passes through to the base rect
                      />
                    )}

                    {comp.category?.toLowerCase() === "sensor" && (
                      <Sensor
                        x={getXForComponent(comp) + 20} // left of rectangle
                        y={getYForComponent(comp) + 15} // top of rectangle
                        width={getWidthForComponent(comp) / 20} // match rectangle width
                        height={componentSize.height / 2} // match rectangle height
                        stroke="black"
                        strokeWidth={1}
                      />
                    )}

                    {comp.category?.toLowerCase() === "switch" && (
                      <ElectricalSwitch
                        x={getXForComponent(comp)}
                        y={getYForComponent(comp)}
                        sizeMultiplier={0.5}
                        stroke="black"
                        strokeWidth={1}
                      />
                    )}

                    {comp.category?.toLowerCase() === "transistor" && (
                      <Transistor
                        x={
                          getXForComponent(comp) +
                          getWidthForComponent(comp) / 12
                        } // horizontal centering
                        y={getYForComponent(comp) + componentSize.height / 2} // vertical centering
                        sizeMultiplier={0.3} // make smaller so it fits neatly inside
                        stroke="black"
                        strokeWidth={5}
                      />
                    )}
                    {comp.category?.toLowerCase() === "transformer" && (
                      <Transformer
                        x={
                          getXForComponent(comp) +
                          getWidthForComponent(comp) / 16
                        } // horizontal centering
                        y={getYForComponent(comp) + componentSize.height / 6} // vertical centering
                        sizeMultiplier={0.2} // scale it down to fit
                        stroke="black"
                        strokeWidth={1}
                        fill="black"
                      />
                    )}
                    {comp.category?.toLowerCase() === "motor" && (
                      <MotorSymbol
                        cx={getXForComponent(comp) + getWidthForComponent(comp) / 5} // center of rectangle
                        cy={getYForComponent(comp) + componentSize.height / 2}       // center of rectangle
                        size={Math.min(getWidthForComponent(comp), componentSize.height) * 0.5} // scale to fit rectangle
                        color="black"
                        fill="#B0E0E6"
                      />
                    )}

                  </g>
                )
              )}
              <text
                vectorEffect="non-scaling-stroke"
                ref={(el) => {
                  componentNameRefs.current[comp.id] = el;
                }}
                x={getXForComponentTitle(comp)}
                // y={getYForComponent(comp) + componentSize.height / 2}
                y={
                  getYForComponent(comp) +
                  (getYForComponent(comp) + componentSize.height / 2 <
                    viewBox.y + viewBox.h / 2
                    ? -componentSize.height / 2 //+(-0.10)  // above component
                    : componentSize.height + 30) // below component
                }
                textAnchor="middle"
                fontSize="20"
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
                      width={getWidthForConnector(conn, comp)}
                      height={connectorHeight}
                      fill={selectedConnector?.id === conn.id ? "#3390FF" : "lightgreen"} // highlight selected
                      stroke="black"
                      strokeDasharray={componentIndex !== 0 ? "6,4" : undefined}
                      onClick={(e) => handleConnectorClick(e, conn, comp)} // <-- add this
                    />
                  )}

                  <text
                    ref={(el) => {
                      connectorNameRefs.current[conn.id] = el;
                    }}
                    x={getXForConnector(conn, comp)}
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
              const fromConnectorWidth = getWidthForConnector(
                from,
                fromComponent!
              );
              const fromConnectorCount = connectorConnectionCount[from.id] || 1;
              const connIndex = getConnectionsForConnector(from).findIndex(
                (c) => c === wire
              );
              const fromConnectorOffset =
                fromConnectorCount === 1
                  ? fromConnectorWidth / 2
                  : (fromConnectorWidth / (fromConnectorCount + 1)) *
                  (connIndex + 1);

              fromX =
                fromComponent?.shape === "circle"
                  ? fromConnectorX + fromConnectorWidth / 2
                  : fromConnectorX + fromConnectorOffset;
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
              const toConnectorWidth = getWidthForConnector(to, toComponent!);
              const toConnectorCount = connectorConnectionCount[to.id] || 1;
              const connIndexTo = getConnectionsForConnector(to).findIndex(
                (c) => c === wire
              );
              const toConnectorOffset =
                toConnectorCount === 1
                  ? toConnectorWidth / 2
                  : (toConnectorWidth / (toConnectorCount + 1)) *
                  (connIndexTo + 1);

              toX =
                toComponent?.shape === "circle"
                  ? toConnectorX + toConnectorWidth / 2
                  : toConnectorX + toConnectorOffset;
            }
            var toY = toStoredConnectionPoint?.y;
            if (toY == undefined) {
              toY = isToMasterComponent
                ? getYForConnector(to, toComponent!) + 20
                : getYForConnector(to, toComponent!);
            }

            connectionPoints[connectionPointKey(wire.to)] = { x: toX, y: toY };

            let intermediateY;
            const offset = getConnectionOffset(
              i,
              data.connections.length,
              fromY,
              toY,
              20
            );
            let min = Math.min(fromY, toY);
            intermediateY = min + offset;

            // Calculate the positions where the tridents should be
            const fromTridentY = fromY < toY ? intermediateY : fromY - 10; // lift if needed
            const toTridentY = fromY < toY ? toY : intermediateY + 10;

            let isFromTop = isFromMasterComponent;
            let isToTop = isToMasterComponent;

            let fromLabelY = isFromTop ? fromY - 5 : fromY + 15;
            let toLabelY = isToTop ? toY - 5 : toY + 15;

            let wireElement;
            wireElement = (
              <g>
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
                        transform={`translate(${fromX}, ${fromY + 15
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
                <g
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent deselecting everything else

                    setSelectedComponentIds([]);
                    setSelectedConnector(null);
                    // Select only this wire
                    setSelectedWires([i.toString()]);
                    setPopupComponent(null);
                    setPopupConnector(null);


                    // Set popupWire with all details
                    setPopupWire({
                      wire,
                      fromComponent: fromComponent!,
                      fromConnector: from!,
                      toComponent: toComponent!,
                      toConnector: to!,
                    });

                    // Set popup position
                    setPopupWirePosition({
                      x: fromX + 900,
                      y: intermediateY + 100,
                    });
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <polyline
                    key={i}
                    points={`${fromX},${fromY} ${fromX},${intermediateY} ${toX},${intermediateY} ${toX},${toY}`}
                    fill="none"
                    stroke={
                      selectedWires.includes(i.toString())
                        ? "#3390FF"
                        : wire.color
                    }
                    strokeWidth={selectedWires.includes(i.toString()) ? 6 : 3}
                    markerEnd="url(#arrowhead)"
                    pointerEvents="stroke" // important
                  />
                </g>
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
                        transform={`translate(${toX}, ${toY + 15
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
     {/* ==================== COMPONENT POPUP ==================== */}
{popupComponent && (
  <div
    style={{
      position: "fixed",
      top: "30%",
      right: "20px",
      transform: "translate(0%, -30%)",
      width: "480px",
      maxHeight: "700px",
      background: "#ffffff",
      border: "1px solid #ddd",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0px 6px 24px rgba(0,0,0,0.15)",
      zIndex: 1000,
      overflowY: "auto",
      fontFamily: "'Segoe UI', Arial, sans-serif",
    }}
  >
    {/* HEADER */}
    <h3
      style={{
        textAlign: "center",
        color: "#333",
        borderBottom: "3px solid #007bff",
        paddingBottom: "10px",
        marginBottom: "16px",
        fontSize: "20px",
      }}
    >
      Component Details
    </h3>

    {/* COMPONENT DETAILS TABLE */}
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        fontSize: "14px",
        marginBottom: "10px",
      }}
    >
      <tbody>
        {/* ID */}
        {popupComponent.id && (
          <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
            <td
              style={{
                fontWeight: "600",
                padding: "10px 8px",
                width: "45%",
                backgroundColor: "#f8f9fa",
                color: "#555",
              }}
            >
              ID
            </td>
            <td style={{ padding: "10px 8px", color: "#333" }}>
              {popupComponent.id}
            </td>
          </tr>
        )}

        {/* Engineering Component Name */}
        {popupComponent.engineering_component_name && (
          <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
            <td
              style={{
                fontWeight: "600",
                padding: "10px 8px",
                backgroundColor: "#f8f9fa",
                color: "#555",
              }}
            >
              Engineering Component Name
            </td>
            <td style={{ padding: "10px 8px", color: "#333" }}>
              {popupComponent.engineering_component_name}
            </td>
          </tr>
        )}


        {/* Category */}
        {popupComponent.category && (
          <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
            <td
              style={{
                fontWeight: "600",
                padding: "10px 8px",
                backgroundColor: "#f8f9fa",
                color: "#555",
              }}
            >
              Category
            </td>
            <td style={{ padding: "10px 8px", color: "#333" }}>
              {popupComponent.category}
            </td>
          </tr>
        )}

        {/* Shape */}
        {popupComponent.shape && (
          <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
            <td
              style={{
                fontWeight: "600",
                padding: "10px 8px",
                backgroundColor: "#f8f9fa",
                color: "#555",
              }}
            >
              Shape
            </td>
            <td style={{ padding: "10px 8px", color: "#333", textTransform: "capitalize" }}>
              {popupComponent.shape}
            </td>
          </tr>
        )}

       
        {/* Engineering Manufacturer */}
        {popupComponent.engineering_manufacturer && (
          <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
            <td
              style={{
                fontWeight: "600",
                padding: "10px 8px",
                backgroundColor: "#f8f9fa",
                color: "#555",
              }}
            >
              Engineering Manufacturer
            </td>
            <td style={{ padding: "10px 8px", color: "#333" }}>
              {popupComponent.engineering_manufacturer}
            </td>
          </tr>
        )}

        {/* Manufacturer */}
        {popupComponent.manufacturer && (
          <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
            <td
              style={{
                fontWeight: "600",
                padding: "10px 8px",
                backgroundColor: "#f8f9fa",
                color: "#555",
              }}
            >
              Manufacturer
            </td>
            <td style={{ padding: "10px 8px", color: "#333" }}>
              {popupComponent.manufacturer}
            </td>
          </tr>
        )}

        {/* Primary Part Number */}
        {popupComponent.primary_part_number && (
          <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
            <td
              style={{
                fontWeight: "600",
                padding: "10px 8px",
                backgroundColor: "#f8f9fa",
                color: "#555",
              }}
            >
              Primary Part Number
            </td>
            <td style={{ padding: "10px 8px", color: "#333" }}>
              {popupComponent.primary_part_number}
            </td>
          </tr>
        )}

        {/* Connector Part Number */}
        {popupComponent.connector_part_number && (
          <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
            <td
              style={{
                fontWeight: "600",
                padding: "10px 8px",
                backgroundColor: "#f8f9fa",
                color: "#555",
              }}
            >
              Connector Part Number
            </td>
            <td style={{ padding: "10px 8px", color: "#333" }}>
              {popupComponent.connector_part_number}
            </td>
          </tr>
        )}

        {/* Harness Name */}
        {popupComponent.harness_name && (
          <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
            <td
              style={{
                fontWeight: "600",
                padding: "10px 8px",
                backgroundColor: "#f8f9fa",
                color: "#555",
              }}
            >
              Harness Name
            </td>
            <td style={{ padding: "10px 8px", color: "#333" }}>
              {popupComponent.harness_name}
            </td>
          </tr>
        )}

        {/* Component Type */}
        {popupComponent.component_type && (
          <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
            <td
              style={{
                fontWeight: "600",
                padding: "10px 8px",
                backgroundColor: "#f8f9fa",
                color: "#555",
              }}
            >
              Component Type
            </td>
            <td style={{ padding: "10px 8px", color: "#333" }}>
              {popupComponent.component_type}
            </td>
          </tr>
        )}

        {/* Connector Type */}
        {popupComponent.connector_type && (
          <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
            <td
              style={{
                fontWeight: "600",
                padding: "10px 8px",
                backgroundColor: "#f8f9fa",
                color: "#555",
              }}
            >
              Connector Type
            </td>
            <td style={{ padding: "10px 8px", color: "#333" }}>
              {popupComponent.connector_type}
            </td>
          </tr>
        )}

        {/* Gender */}
        {popupComponent.gender && (
          <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
            <td
              style={{
                fontWeight: "600",
                padding: "10px 8px",
                backgroundColor: "#f8f9fa",
                color: "#555",
              }}
            >
              Gender
            </td>
            <td style={{ padding: "10px 8px", color: "#333" }}>
              {popupComponent.gender}
            </td>
          </tr>
        )}

        {/* Remove Status */}
        {popupComponent.remove !== undefined && (
          <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
            <td
              style={{
                fontWeight: "600",
                padding: "10px 8px",
                backgroundColor: "#f8f9fa",
                color: "#555",
              }}
            >
              Remove Status
            </td>
            <td style={{ padding: "10px 8px", color: "#333" }}>
              {popupComponent.remove ? "Yes" : "No"}
            </td>
          </tr>
        )}

        {/* Connectors */}
        {popupComponent.connectors && popupComponent.connectors.length > 0 && (
          <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
            <td
              style={{
                fontWeight: "600",
                padding: "10px 8px",
                backgroundColor: "#f8f9fa",
                color: "#555",
              }}
            >
              Connectors
            </td>
            <td style={{ padding: "10px 8px", color: "#333" }}>
              {popupComponent.connectors.map((c) => c.label).join(", ")}
            </td>
          </tr>
        )}
      </tbody>
    </table>

    {/* CLOSE BUTTON */}
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <button
        onClick={() => {
          setSelectedComponentIds([]);
          setPopupComponent(null);
          setPopupClosedManually(false);
        }}
        style={{
          background: "linear-gradient(135deg, #007bff 0%, #0056b3 100%)",
          color: "white",
          border: "none",
          padding: "10px 24px",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "600",
          boxShadow: "0px 3px 8px rgba(0,123,255,0.3)",
          transition: "all 0.3s ease",
        }}
        onMouseOver={(e) => ((e.currentTarget).style.transform = "scale(1.05)")}
        onMouseOut={(e) => ((e.currentTarget).style.transform = "scale(1)")}
      >
        Close
      </button>
    </div>
  </div>
)}

      {/* ==================== WIRE POPUP ==================== */}
{popupWire && (
  <div
    style={{
      position: "fixed",
      top: "50%",
      right: "20px",
      transform: "translateY(-50%)",
      width: "500px",
      maxHeight: "750px",
      background: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0px 6px 24px rgba(0,0,0,0.15)",
      padding: "24px",
      zIndex: 1000,
      overflowY: "auto",
      fontFamily: "'Segoe UI', Arial, sans-serif",
      lineHeight: "1.6",
    }}
  >
    {/* HEADER */}
    <h3
      style={{
        borderBottom: "3px solid #007bff",
        paddingBottom: "10px",
        marginBottom: "20px",
        color: "#333",
        fontSize: "20px",
        textAlign: "center",
      }}
    >
      Wire Details
    </h3>

    {/* WIRE DETAILS TABLE */}
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginBottom: "24px",
        fontSize: "14px",
      }}
    >
      <tbody>
        {/* Color */}
        <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
          <td
            style={{
              fontWeight: "600",
              padding: "10px 8px",
              width: "45%",
              backgroundColor: "#f8f9fa",
              color: "#555",
            }}
          >
            Wire Color
          </td>
          <td style={{ padding: "10px 8px", color: "#333" }}>
            {popupWire.color || popupWire.wire?.wireDetails?.wireColor || "N/A"}
          </td>
        </tr>

        {/* Circuit Number */}
        {popupWire.wire?.wireDetails?.circuitNumber && (
          <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
            <td
              style={{
                fontWeight: "600",
                padding: "10px 8px",
                backgroundColor: "#f8f9fa",
                color: "#555",
              }}
            >
              Circuit Number
            </td>
            <td style={{ padding: "10px 8px", color: "#333" }}>
              {popupWire.wire.wireDetails.circuitNumber}
            </td>
          </tr>
        )}

        {/* Wire Size */}
        {popupWire.wire?.wireDetails?.wireSize && (
          <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
            <td
              style={{
                fontWeight: "600",
                padding: "10px 8px",
                backgroundColor: "#f8f9fa",
                color: "#555",
              }}
            >
              Wire Size
            </td>
            <td style={{ padding: "10px 8px", color: "#333" }}>
              {popupWire.wire.wireDetails.wireSize} mm
            </td>
          </tr>
        )}

        {/* Wire Length */}
        {popupWire.wire?.wireDetails?.wireLength && (
          <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
            <td
              style={{
                fontWeight: "600",
                padding: "10px 8px",
                backgroundColor: "#f8f9fa",
                color: "#555",
              }}
            >
              Wire Length
            </td>
            <td style={{ padding: "10px 8px", color: "#333" }}>
              {popupWire.wire.wireDetails.wireLength} mm
            </td>
          </tr>
        )}

        {/* Wire Type */}
        {popupWire.wire?.wireDetails?.wireType && (
          <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
            <td
              style={{
                fontWeight: "600",
                padding: "10px 8px",
                backgroundColor: "#f8f9fa",
                color: "#555",
              }}
            >
              Wire Type
            </td>
            <td style={{ padding: "10px 8px", color: "#333" }}>
              {popupWire.wire.wireDetails.wireType}
            </td>
          </tr>
        )}

        {/* Twist ID */}
        {popupWire.wire?.wireDetails?.twistId && (
          <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
            <td
              style={{
                fontWeight: "600",
                padding: "10px 8px",
                backgroundColor: "#f8f9fa",
                color: "#555",
              }}
            >
              Twist ID
            </td>
            <td style={{ padding: "10px 8px", color: "#333" }}>
              {popupWire.wire.wireDetails.twistId}
            </td>
          </tr>
        )}

        {/* Shield ID */}
        {popupWire.wire?.wireDetails?.shieldId && (
          <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
            <td
              style={{
                fontWeight: "600",
                padding: "10px 8px",
                backgroundColor: "#f8f9fa",
                color: "#555",
              }}
            >
              Shield ID
            </td>
            <td style={{ padding: "10px 8px", color: "#333" }}>
              {popupWire.wire.wireDetails.shieldId}
            </td>
          </tr>
        )}

        {/* Wire Option */}
        {popupWire.wire?.wireDetails?.wireOption && (
          <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
            <td
              style={{
                fontWeight: "600",
                padding: "10px 8px",
                backgroundColor: "#f8f9fa",
                color: "#555",
              }}
            >
              Wire Option
            </td>
            <td style={{ padding: "10px 8px", color: "#333" }}>
              {popupWire.wire.wireDetails.wireOption}
            </td>
          </tr>
        )}

        {/* Mark */}
        {popupWire.wire?.wireDetails?.mark && (
          <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
            <td
              style={{
                fontWeight: "600",
                padding: "10px 8px",
                backgroundColor: "#f8f9fa",
                color: "#555",
              }}
            >
              Mark
            </td>
            <td style={{ padding: "10px 8px", color: "#333" }}>
              {popupWire.wire.wireDetails.mark}
            </td>
          </tr>
        )}

        {/* Harness Name */}
        {popupWire.fromComponent?.harness_name && (
          <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
            <td
              style={{
                fontWeight: "600",
                padding: "10px 8px",
                backgroundColor: "#f8f9fa",
                color: "#555",
              }}
            >
              Harness Name
            </td>
            <td style={{ padding: "10px 8px", color: "#333" }}>
              {popupWire.fromComponent.harness_name}
            </td>
          </tr>
        )}
      </tbody>
    </table>

    {/* CONNECTION DETAILS SECTION */}
    <h3
      style={{
        borderBottom: "3px solid #007bff",
        paddingBottom: "8px",
        marginBottom: "16px",
        color: "#333",
        fontSize: "18px",
      }}
    >
      Connection Details
    </h3>

    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        fontSize: "14px",
        textAlign: "center",
        border: "1px solid #ddd",
      }}
    >
      <thead>
        <tr style={{ backgroundColor: "#007bff", color: "white" }}>
          <th style={{ border: "1px solid #ddd", padding: "10px", fontWeight: "600" }}>
            Property
          </th>
          <th style={{ border: "1px solid #ddd", padding: "10px", fontWeight: "600" }}>
            From
          </th>
          <th style={{ border: "1px solid #ddd", padding: "10px", fontWeight: "600" }}>
            To
          </th>
        </tr>
      </thead>
      <tbody>
        {/* Component */}
        <tr>
          <td
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              fontWeight: "600",
              backgroundColor: "#f8f9fa",
            }}
          >
            Component
          </td>
          <td style={{ border: "1px solid #ddd", padding: "10px" }}>
            {popupWire.fromComponent?.label ||
              popupWire.wire?.wireDetails?.from?.devName ||
              popupWire.wire?.from?.componentId ||
              "N/A"}
          </td>
          <td style={{ border: "1px solid #ddd", padding: "10px" }}>
            {popupWire.toComponent?.label ||
              popupWire.wire?.wireDetails?.to?.devName ||
              popupWire.wire?.to?.componentId ||
              "N/A"}
          </td>
        </tr>

        {/* Connector */}
        <tr>
          <td
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              fontWeight: "600",
              backgroundColor: "#f8f9fa",
            }}
          >
            Connector
          </td>
          <td style={{ border: "1px solid #ddd", padding: "10px" }}>
            {popupWire.fromConnector?.label ||
              popupWire.wire?.wireDetails?.from?.connectorNumber ||
              popupWire.wire?.from?.connectorId ||
              "N/A"}
          </td>
          <td style={{ border: "1px solid #ddd", padding: "10px" }}>
            {popupWire.toConnector?.label ||
              popupWire.wire?.wireDetails?.to?.connectorNumber ||
              popupWire.wire?.to?.connectorId ||
              "N/A"}
          </td>
        </tr>

        {/* Connector Part Number */}
        <tr>
          <td
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              fontWeight: "600",
              backgroundColor: "#f8f9fa",
            }}
          >
            Connector Part Number
          </td>
          <td style={{ border: "1px solid #ddd", padding: "10px" }}>
            {popupWire.wire?.wireDetails?.from?.connPartNumber || "N/A"}
          </td>
          <td style={{ border: "1px solid #ddd", padding: "10px" }}>
            {popupWire.wire?.wireDetails?.to?.connPartNumber || "N/A"}
          </td>
        </tr>

        {/* Terminal Part Number */}
        <tr>
          <td
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              fontWeight: "600",
              backgroundColor: "#f8f9fa",
            }}
          >
            Terminal Part Number
          </td>
          <td style={{ border: "1px solid #ddd", padding: "10px" }}>
            {popupWire.wire?.wireDetails?.from?.termPartNo || "N/A"}
          </td>
          <td style={{ border: "1px solid #ddd", padding: "10px" }}>
            {popupWire.wire?.wireDetails?.to?.termPartNo || "N/A"}
          </td>
        </tr>

        {/* Seal Part Number */}
        <tr>
          <td
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              fontWeight: "600",
              backgroundColor: "#f8f9fa",
            }}
          >
            Seal Part Number
          </td>
          <td style={{ border: "1px solid #ddd", padding: "10px" }}>
            {popupWire.wire?.wireDetails?.from?.sealPartNo || "N/A"}
          </td>
          <td style={{ border: "1px solid #ddd", padding: "10px" }}>
            {popupWire.wire?.wireDetails?.to?.sealPartNo || "N/A"}
          </td>
        </tr>

        {/* Gender */}
        <tr>
          <td
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              fontWeight: "600",
              backgroundColor: "#f8f9fa",
            }}
          >
            Gender
          </td>
          <td style={{ border: "1px solid #ddd", padding: "10px" }}>
            {popupWire.fromConnector?.gender ||
              popupWire.wire?.from?.gender ||
              "N/A"}
          </td>
          <td style={{ border: "1px solid #ddd", padding: "10px" }}>
            {popupWire.toConnector?.gender ||
              popupWire.wire?.to?.gender ||
              "N/A"}
          </td>
        </tr>

        {/* Cavity */}
        <tr>
          <td
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              fontWeight: "600",
              backgroundColor: "#f8f9fa",
            }}
          >
            Cavity
          </td>
          <td style={{ border: "1px solid #ddd", padding: "10px" }}>
            {popupWire.wire?.wireDetails?.from?.cavity ||
              popupWire.wire?.from?.cavity ||
              "N/A"}
          </td>
          <td style={{ border: "1px solid #ddd", padding: "10px" }}>
            {popupWire.wire?.wireDetails?.to?.cavity ||
              popupWire.wire?.to?.cavity ||
              "N/A"}
          </td>
        </tr>
      </tbody>
    </table>

    {/* CLOSE BUTTON */}
    <div style={{ textAlign: "center", marginTop: "24px" }}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setSelectedWires([]);
          setPopupWire(null);
        }}
        style={{
          background: "linear-gradient(135deg, #007bff 0%, #0056b3 100%)",
          color: "white",
          border: "none",
          padding: "10px 24px",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "600",
          boxShadow: "0px 3px 8px rgba(0,123,255,0.3)",
          transition: "all 0.3s ease",
        }}
        onMouseOver={(e) => ((e.currentTarget).style.transform = "scale(1.05)")}
        onMouseOut={(e) => ((e.currentTarget).style.transform = "scale(1)")}
      >
        Close
      </button>
    </div>
  </div>
)}

      
{/* ==================== CONNECTOR POPUP ==================== */}
{popupConnector && (
  <div
    style={{
      position: "fixed",
      top: "50%",
      right: "20px",
      transform: "translateY(-50%)",
      width: "480px",
      maxHeight: "700px",
      background: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0px 6px 24px rgba(0,0,0,0.15)",
      padding: "24px",
      zIndex: 1000,
      overflowY: "auto",
      fontFamily: "'Segoe UI', Arial, sans-serif",
      lineHeight: "1.6",
    }}
  >
    {/* HEADER */}
    <h3
      style={{
        fontSize: "20px",
        fontWeight: "bold",
        marginBottom: "20px",
        color: "#333",
        textAlign: "center",
        borderBottom: "3px solid #007bff",
        paddingBottom: "10px",
      }}
    >
      Connector Details
    </h3>

    {/* CONNECTOR DETAILS TABLE */}
    <table
      style={{
        width: "100%",
        fontSize: "14px",
        borderCollapse: "collapse",
      }}
    >
      <tbody>
        {/* Component Code */}
        {popupConnector.componentCode && (
          <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
            <td
              style={{
                fontWeight: "600",
                padding: "10px 8px",
                width: "45%",
                backgroundColor: "#f8f9fa",
                color: "#555",
              }}
            >
              Component Code
            </td>
            <td style={{ padding: "10px 8px", color: "#333" }}>
              {popupConnector.componentCode}
            </td>
          </tr>
        )}

        {/* Connector Code */}
        {popupConnector.connectorCode && (
          <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
            <td
              style={{
                fontWeight: "600",
                padding: "10px 8px",
                backgroundColor: "#f8f9fa",
                color: "#555",
              }}
            >
              Connector Code
            </td>
            <td style={{ padding: "10px 8px", color: "#333" }}>
              {popupConnector.connectorCode}
            </td>
          </tr>
        )}

        {/* Label */}
        {popupConnector.label && (
          <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
            <td
              style={{
                fontWeight: "600",
                padding: "10px 8px",
                backgroundColor: "#f8f9fa",
                color: "#555",
              }}
            >
              Label
            </td>
            <td style={{ padding: "10px 8px", color: "#333" }}>
              {popupConnector.label}
            </td>
          </tr>
        )}

        {/* Harness Name */}
        {popupConnector.harnessName && (
          <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
            <td
              style={{
                fontWeight: "600",
                padding: "10px 8px",
                backgroundColor: "#f8f9fa",
                color: "#555",
              }}
            >
              Harness Name
            </td>
            <td style={{ padding: "10px 8px", color: "#333" }}>
              {popupConnector.harnessName}
            </td>
          </tr>
        )}

        {/* Connector Part Number */}
        {popupConnector.partNumber && (
          <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
            <td
              style={{
                fontWeight: "600",
                padding: "10px 8px",
                backgroundColor: "#f8f9fa",
                color: "#555",
              }}
            >
              Connector Part Number
            </td>
            <td style={{ padding: "10px 8px", color: "#333" }}>
              {popupConnector.partNumber}
            </td>
          </tr>
        )}

        {/* Gender */}
        {popupConnector.gender && (
          <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
            <td
              style={{
                fontWeight: "600",
                padding: "10px 8px",
                backgroundColor: "#f8f9fa",
                color: "#555",
              }}
            >
              Gender
            </td>
            <td style={{ padding: "10px 8px", color: "#333" }}>
              {popupConnector.gender}
            </td>
          </tr>
        )}

        {/* Cavity Count */}
        {popupConnector.cavityCount && (
          <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
            <td
              style={{
                fontWeight: "600",
                padding: "10px 8px",
                backgroundColor: "#f8f9fa",
                color: "#555",
              }}
            >
              Cavity Count
            </td>
            <td style={{ padding: "10px 8px", color: "#333" }}>
              {popupConnector.cavityCount}
            </td>
          </tr>
        )}

        {/* Color */}
        {popupConnector.color && (
          <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
            <td
              style={{
                fontWeight: "600",
                padding: "10px 8px",
                backgroundColor: "#f8f9fa",
                color: "#555",
              }}
            >
              Color
            </td>
            <td style={{ padding: "10px 8px", color: "#333" }}>
              {popupConnector.color}
            </td>
          </tr>
        )}

        {/* Connector Type */}
        {popupConnector.connectorType && (
          <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
            <td
              style={{
                fontWeight: "600",
                padding: "10px 8px",
                backgroundColor: "#f8f9fa",
                color: "#555",
              }}
            >
              Connector Type
            </td>
            <td style={{ padding: "10px 8px", color: "#333" }}>
              {popupConnector.connectorType}
            </td>
          </tr>
        )}

        {/* Manufacturer */}
        {popupConnector.manufacturer && (
          <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
            <td
              style={{
                fontWeight: "600",
                padding: "10px 8px",
                backgroundColor: "#f8f9fa",
                color: "#555",
              }}
            >
              Manufacturer
            </td>
            <td style={{ padding: "10px 8px", color: "#333" }}>
              {popupConnector.manufacturer}
            </td>
          </tr>
        )}

        {/* Terminal Part Number */}
        {popupConnector.termPartNo && (
          <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
            <td
              style={{
                fontWeight: "600",
                padding: "10px 8px",
                backgroundColor: "#f8f9fa",
                color: "#555",
              }}
            >
              Terminal Part Number
            </td>
            <td style={{ padding: "10px 8px", color: "#333" }}>
              {popupConnector.termPartNo}
            </td>
          </tr>
        )}

        {/* Seal Part Number */}
        {popupConnector.sealPartNo && (
          <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
            <td
              style={{
                fontWeight: "600",
                padding: "10px 8px",
                backgroundColor: "#f8f9fa",
                color: "#555",
              }}
            >
              Seal Part Number
            </td>
            <td style={{ padding: "10px 8px", color: "#333" }}>
              {popupConnector.sealPartNo}
            </td>
          </tr>
        )}
      </tbody>
    </table>

    {/* CLOSE BUTTON */}
    <div ref={popupRef} style={{ textAlign: "center", marginTop: "24px" }}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setPopupConnector(null);
          setSelectedConnector(null);
        }}
        style={{
          background: "linear-gradient(135deg, #007bff 0%, #0056b3 100%)",
          color: "#fff",
          border: "none",
          padding: "10px 24px",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "600",
          boxShadow: "0px 3px 8px rgba(0,123,255,0.3)",
          transition: "all 0.3s ease",
        }}
        onMouseOver={(e) => ((e.currentTarget).style.transform = "scale(1.05)")}
        onMouseOut={(e) => ((e.currentTarget).style.transform = "scale(1)")}
      >
        Close
      </button>
    </div>
  </div>
)}
    </div>
  );
}


