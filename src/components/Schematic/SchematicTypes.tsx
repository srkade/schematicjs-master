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
  cavity?: number;

  // Add these optional fields ↓↓↓
  engineering_component_name?: string;
  engineering_manufacturer?: string;
  primary_part_number?: string;
  harness_name?: string;
  component_type?: string;
  connector_type?: string;
  manufacturer?: string;
  connector_part_number?: string;
  remove?: boolean;
  harnessPartNumber?: string;
};
export type ConnectorType = {
  id: string;
  label: string;
  color?: string;
  gender?: string;
};
export type ConnectionPoint = {
  componentId: string;
  connectorId: string;
  cavity: string;
  gender?: string;
};
export type ConnectionType = {
  color: string;
  from: ConnectionPoint;
  to: ConnectionPoint;
  label: string;
  wireDetails?: WireDetailsType; // Add this
};
export type SchematicData = {
  masterComponents: string[];
  components: ComponentType[];
  connections: ConnectionType[];
};

export type WirePopupType = {
  wire: ConnectionType;
  fromComponent: ComponentType;
  fromConnector: ConnectorType;
  toComponent: ComponentType;
  toConnector: ConnectorType;
  connections?: ConnectionType[];
};

export type WireDetailsType = {
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
export type PopupConnectorType = {
  componentCode: string;
  connectorCode: string;
  harnessName?: string;
  partNumber?: string;
  gender?: string;
  color?: string;
  connectorType?: string;
  cavityCount?: number;
};