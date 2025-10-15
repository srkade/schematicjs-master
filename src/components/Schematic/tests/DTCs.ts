const DTC_CrankTimeExceeded = {
  masterComponents: ["DTC_E1000"],
  components: [
    {
      id: "DTC_E1000",
      label: "ICC 000677.14 (E1000) - Crank Time Exceeded",
      category: "DTC",
      shape: "rectangle",
      connectors: [
        { id: "E1000", label: "E1000" }
      ]
    },
    {
      id: "ICC",
      label: "Instrument Cluster Controller",
      category: "Controller",
      shape: "rectangle",
      connectors: [
        { id: "XJ1", label: "XJ1" },
        { id: "XJ2", label: "XJ2" }
      ]
    },
    {
      id: "XS1",
      label: "Key Switch",
      category: "Switch",
      shape: "rectangle",
      connectors: [
        { id: "XS1", label: "XS1" }
      ]
    },
    {
      id: "Y3",
      label: "Fuel Solenoid",
      category: "Actuator",
      shape: "rectangle",
      connectors: [
        { id: "Y3", label: "Y3" }
      ]
    }
  ],
  connections: [
    {
      color: "red",
      from: { componentId: "DTC_E1000", connectorId: "E1000", cavity: "1" },
      to: { componentId: "ICC", connectorId: "XJ1", cavity: "4" },
      label: ""
    },
    {
      color: "blue",
      from: { componentId: "ICC", connectorId: "XJ1", cavity: "4" },
      to: { componentId: "XS1", connectorId: "XS1", cavity: "A" },
      label: ""
    },
    {
      color: "green",
      from: { componentId: "ICC", connectorId: "XJ1", cavity: "7" },
      to: { componentId: "Y3", connectorId: "Y3", cavity: "1" },
      label: ""
    }
  ]
};

const DTC_StarterCoolDown = {
  masterComponents: ["DTC_E1001"],
  components: [
    {
      id: "DTC_E1001",
      label: "ICC 000677.31 (E1001) - Starter Cool Down in Process",
      category: "DTC",
      shape: "rectangle",
      connectors: [
        { id: "E1001", label: "E1001" }
      ]
    },
    {
      id: "ICC",
      label: "Instrument Cluster Controller",
      category: "Controller",
      shape: "rectangle",
      connectors: [
        { id: "XJ1", label: "XJ1" },
        { id: "XJ2", label: "XJ2" }
      ]
    },
    {
      id: "XS9",
      label: "Light Switch",
      category: "Switch",
      shape: "rectangle",
      connectors: [
        { id: "XS9", label: "XS9" }
      ]
    }
  ],
  connections: [
    {
      color: "orange",
      from: { componentId: "DTC_E1001", connectorId: "E1001", cavity: "1" },
      to: { componentId: "ICC", connectorId: "XJ2", cavity: "2" },
      label: ""
    },
    {
      color: "purple",
      from: { componentId: "ICC", connectorId: "XJ1", cavity: "12" },
      to: { componentId: "XS9", connectorId: "XS9", cavity: "1" },
      label: ""
    }
  ]
};

export { DTC_CrankTimeExceeded, DTC_StarterCoolDown };
