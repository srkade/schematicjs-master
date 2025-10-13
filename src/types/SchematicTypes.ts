export type ComponentType = {
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

export type ConnectorType = {
  id: string;
  label: string;
};

export type ConnectionPoint = {
  componentId: string;
  connectorId: string;
  cavity: string;
};

export type ConnectionType = {
  color: string;
  from: ConnectionPoint;
  to: ConnectionPoint;
  label: string;
};

export type SchematicData = {
  masterComponents: string[];
  components: ComponentType[];
  connections: ConnectionType[];
};