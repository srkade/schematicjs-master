const B3 = {
  masterComponents: ["B3"],
  components: [
    {
      id: "B3",
      label: "Coolant Temperature sensor",
      category: "Sensor",
      shape: "rectangle",
      connectors: [
        {
          id: "XB3",
          label: "XB3",
        },
      ],
    },
    {
      id: "ICC",
      label: "Instrument Cluster Controller",
      category: "Transistor",
      shape: "rectangle",
      connectors: [
        {
          id: "XJ1",
          label: "XJ1",
        },
      ],
    },
  ],
  connections: [
    {
      color: "orange",
      from: {
        componentId: "B3",
        connectorId: "XB3",
        cavity: "1",
      },
      to: {
        componentId: "ICC",
        connectorId: "XJ1",
        cavity: "16",
      },
      label: "",
    },
  ],
};
export default B3;
