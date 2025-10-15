const DTC_CrankTimeExceeded = {
  masterComponents: ["DTC_E1000"],
  components: [
    {
      id: "DTC_E1000",
      label: "ICC 000677.14 (E1000) - Crank Time Exceeded",
      category: "DTC",
      shape: "rectangle",
      connectors: [
        {
          id: "ERROR_OUTPUT",
          label: "E1000",
        },
      ],
    },
    {
      id: "ICC",
      label: "Instrument Cluster Controller",
      category: "Controller",
      shape: "rectangle",
      connectors: [
        {
          id: "XJ1",
          label: "XJ1",
        },
        {
          id: "XJ2",
          label: "XJ2",
        },
      ],
    },
    {
      id: "XS1",
      label: "Key Switch",
      category: "Switch",
      shape: "rectangle",
      connectors: [
        {
          id: "CONN",
          label: "Connector",
        },
      ],
    },
    {
      id: "Y3",
      label: "Fuel Solenoid",
      category: "Actuator",
      shape: "rectangle",
      connectors: [
        {
          id: "CONN",
          label: "Connector",
        },
      ],
    },
  ],
  connections: [
    {
      color: "red",
      from: {
        componentId: "DTC_E1000",
        connectorId: "ERROR_OUTPUT",
        cavity: "1",
      },
      to: {
        componentId: "ICC",
        connectorId: "XJ1",
        cavity: "SYSTEM",
      },
      label: "Crank Time Monitor Signal",
    },
    {
      color: "blue",
      from: {
        componentId: "ICC",
        connectorId: "XJ1",
        cavity: "4",
      },
      to: {
        componentId: "XS1",
        connectorId: "CONN",
        cavity: "1",
      },
      label: "Key Switch Signal",
    },
    {
      color: "green",
      from: {
        componentId: "ICC",
        connectorId: "XJ1",
        cavity: "7",
      },
      to: {
        componentId: "Y3",
        connectorId: "CONN",
        cavity: "1",
      },
      label: "Fuel Solenoid Control",
    },
  ],
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
        {
          id: "ERROR_OUTPUT",
          label: "E1001",
        },
      ],
    },
    {
      id: "ICC",
      label: "Instrument Cluster Controller",
      category: "Controller",
      shape: "rectangle",
      connectors: [
        {
          id: "XJ1",
          label: "XJ1",
        },
        {
          id: "XJ2",
          label: "XJ2",
        },
      ],
    },
    {
      id: "XS9",
      label: "Light Switch",
      category: "Switch",
      shape: "rectangle",
      connectors: [
        {
          id: "CONN",
          label: "Connector",
        },
      ],
    },
  ],
  connections: [
    {
      color: "orange",
      from: {
        componentId: "DTC_E1001",
        connectorId: "ERROR_OUTPUT",
        cavity: "1",
      },
      to: {
        componentId: "ICC",
        connectorId: "XJ2",
        cavity: "SYSTEM",
      },
      label: "Starter Cool Down Monitor",
    },
    {
      color: "purple",
      from: {
        componentId: "ICC",
        connectorId: "XJ1",
        cavity: "12",
      },
      to: {
        componentId: "XS9",
        connectorId: "CONN",
        cavity: "1",
      },
      label: "Light Switch Signal",
    },
  ],
};

export { DTC_CrankTimeExceeded, DTC_StarterCoolDown };
