import { useEffect, useRef, useState } from "react";

type ConnectorProps = {
  x: number;
  y: number;
  dashed?: boolean;
  connector: ConnectorType;
};

export type ConnectorType = {
  id: string;
  label: string;
};

const connectorNamePadding = 25;

export function Connector(props: ConnectorProps) {
  const connectorRef = useRef<SVGTextElement | null>(null);

  const [connectorWidth, setConnectorWidth] = useState<number>(0);

  useEffect(() => {
    const ref = connectorRef.current;
    if (ref) {
      setConnectorWidth(ref.getBBox().width + connectorNamePadding);
    }
  }, [props.connector]);

  return (
    <g key={props.connector.id}>
      <rect
        x={props.x}
        y={props.y}
        width={connectorWidth}
        height={20}
        fill="lightgreen"
        stroke="black"
        strokeDasharray={props.dashed === true ? "6,4" : undefined}
      />
      <text
        ref={(el) => {
          connectorRef.current = el;
        }}
        x={
          props.x +
          connectorWidth / 2
        }
        y={props.y + 13}
        textAnchor="middle"
        fontSize="10"
        fill="black"
      >
        {props.connector.label}
      </text>
    </g>
  );
}
