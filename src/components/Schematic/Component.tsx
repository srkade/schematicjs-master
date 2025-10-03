import { useEffect, useRef, useState } from "react";
import { Connector } from "./Connector"; // Adjust the path as needed

type ComponentProps = {
  x: number;
  y: number;
  dashed?: boolean;
  component: ComponentType;
};

export type ComponentType = {
  id: string;
  label: string;
  category: string;
  shape: string;
  connectors: ConnectorType[];
};

type ConnectorType = {
  id: string;
  label: string;
};

const componentSize = { width: 100, height: 60 };
const padding = 50;

export function Component(props: ComponentProps) {
  const componentRef = useRef<SVGTextElement | null>(null);
  const [componentWidth, setComponentWidth] = useState<number>(0);

  useEffect(() => {
    const ref = componentRef.current;
    if (ref) {
      setComponentWidth(ref.getBBox().width + padding);
    }
  }, [props]);

  return (
    <g key={props.component.id}>
      <rect
        x={props.x}
        y={props.y}
        width={componentWidth}
        height={componentSize.height}
        fill="lightblue"
        stroke="black"
        strokeDasharray={props.dashed === true ? "6,4" : undefined}
        onClick={() => {
          // Your callback logic here
          console.log("Rectangle clicked!");
        }}
      />
      <text
        ref={(el) => {
          componentRef.current = el;
        }}
        x={props.x + (componentWidth / 2)}
        y={props.y + componentSize.height / 2}
        textAnchor="middle"
        fontSize="12"
        fill="black"
      >
        {props.component.label + ` (${props.component.id})`}
      </text>
      {/*props.component.connectors.map((conn) => (
        <Connector
          key={conn.id}
          x={props.x + componentWidth + 10}
          y={props.y + 10 + props.component.connectors.indexOf(conn) * 30}
          dashed={props.dashed}
          connector={conn}
        />
      ))*/}
    </g>
  );
}
