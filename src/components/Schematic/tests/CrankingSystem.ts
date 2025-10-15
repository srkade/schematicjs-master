const CrankingSystem = {
  components: [
    {
      id: "Alternator",
      label: "Cranking System",
      category: "Power",
      shape: "rectangle",
      connectors: [
        { id: "XG2-1", label: "XG2-1" },
        { id: "XG2-3", label: "XG2-3" }
      ]
    },
    {
      id: "StarterMotor",
      label: "Starter Motor",
      category: "Actuator",
      shape: "rectangle",
      connectors: [
        { id: "XM1", label: "XM1" }
      ]
    },
    {
      id: "KeySwitch",
      label: "Key Switch",
      category: "Switch",
      shape: "rectangle",
      connectors: [
        { id: "XS1", label: "XS1" }
      ]
    },
    {
      id: "LoadCenter",
      label: "Load Center",
      category: "Instrument",
      shape: "rectangle",
      connectors: [
        { id: "X90", label: "X90" }
      ]
    },
    {
      id: "BrakeSwitch",
      label: "Brake Switch",
      category: "Switch",
      shape: "rectangle",
      connectors: [
        { id: "XS8", label: "XS8" }
      ]
    },
    {
      id: "SeatSwitch",
      label: "Seat Switch",
      category: "Switch",
      shape: "rectangle",
      connectors: [
        { id: "XS4", label: "XS4" }
      ]
    },
    {
      id: "ReverseSwitch",
      label: "Reverse Switch",
      category: "Switch",
      shape: "rectangle",
      connectors: [
        { id: "XS7", label: "XS7" }
      ]
    },
    {
      id: "PTOSwitch",
      label: "PTO Switch",
      category: "Switch",
      shape: "rectangle",
      connectors: [
        { id: "XS3", label: "XS3" }
      ]
    },
    {
      id: "ICC",
      label: "Instrument Cluster Controller",
      category: "Instrument",
      shape: "rectangle",
      connectors: [
        { id: "XJ2", label: "XJ2" },
        { id: "XJ1", label: "XJ1" }
      ]
    },
    {
      id: "Splice500",
      label: "Splice 500",
      category: "Splice",
      shape: "circle",
      connectors: [
        { id: "XSP500", label: "XSP500" }
      ]
    },
    {
      id: "MainHarness",
      label: "Main Chassis to Rear Lighting Harness",
      category: "Harness",
      shape: "rectangle",
      connectors: [
        { id: "X1", label: "X1" }
      ]
    }
  ],
  connections: [
    {
      color: "red",
      from: { componentId: "Alternator", connectorId: "XG2-1", cavity: "1" },
      to: { componentId: "StarterMotor", connectorId: "XM1", cavity: "1" },
      label: "200D"
    },
    {
      color: "red",
      from: { componentId: "LoadCenter", connectorId: "X90", cavity: "46" },
      to: { componentId: "KeySwitch", connectorId: "XS1", cavity: "B" },
      label: "204A"
    },
    {
      color: "red",
      from: { componentId: "LoadCenter", connectorId: "X90", cavity: "27" },
      to: { componentId: "LoadCenter", connectorId: "X90", cavity: "38" },
      label: "207A"
    },
    {
      color: "yellow",
      from: { componentId: "Alternator", connectorId: "XG2-3", cavity: "2" },
      to: { componentId: "Splice500", connectorId: "XSP500", cavity: "L" },
      label: "500B"
    },
    {
      color: "yellow",
      from: { componentId: "SeatSwitch", connectorId: "XS4", cavity: "2" },
      to: { componentId: "Splice500", connectorId: "XSP500", cavity: "L" },
      label: "500C"
    },
    {
      color: "yellow",
      from: { componentId: "BrakeSwitch", connectorId: "XS8", cavity: "5" },
      to: { componentId: "Splice500", connectorId: "XSP500", cavity: "L" },
      label: "500D"
    },
    {
      color: "yellow",
      from: { componentId: "ReverseSwitch", connectorId: "XS7", cavity: "1" },
      to: { componentId: "Splice500", connectorId: "XSP500", cavity: "L" },
      label: "500G"
    },
    {
      color: "yellow",
      from: { componentId: "ReverseSwitch", connectorId: "XS7", cavity: "4" },
      to: { componentId: "Splice500", connectorId: "XSP500", cavity: "L" },
      label: "500H"
    },
    {
      color: "yellow",
      from: { componentId: "PTOSwitch", connectorId: "XS3", cavity: "1" },
      to: { componentId: "Splice500", connectorId: "XSP500", cavity: "L" },
      label: "500J"
    },
    {
      color: "yellow",
      from: { componentId: "KeySwitch", connectorId: "XS1", cavity: "E" },
      to: { componentId: "Splice500", connectorId: "XSP500", cavity: "L" },
      label: "500P"
    },
    {
      color: "yellow",
      from: { componentId: "LoadCenter", connectorId: "X90", cavity: "8" },
      to: { componentId: "ICC", connectorId: "XJ2", cavity: "15" },
      label: "506A"
    },
    {
      color: "yellow",
      from: { componentId: "LoadCenter", connectorId: "X90", cavity: "11" },
      to: { componentId: "ICC", connectorId: "XJ2", cavity: "16" },
      label: "515A"
    },
    {
      color: "pink",
      from: { componentId: "ICC", connectorId: "XJ1", cavity: "4" },
      to: { componentId: "KeySwitch", connectorId: "XS1", cavity: "A" },
      label: "591A"
    },
    {
      color: "orange",
      from: { componentId: "MainHarness", connectorId: "X1", cavity: "B" },
      to: { componentId: "LoadCenter", connectorId: "X90", cavity: "28" },
      label: "593B"
    },
    {
      color: "red",
      from: { componentId: "LoadCenter", connectorId: "X90", cavity: "48" },
      to: { componentId: "ICC", connectorId: "XJ1", cavity: "10" },
      label: "595A"
    }
  ]
};

export default CrankingSystem;
