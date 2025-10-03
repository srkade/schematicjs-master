
const S4 = {
  components: [
    {
      id: "S4",
      label: "Seat Switch",
      category: "Switch",
      shape: "rectangle",
      connectors: [
        {
          id: "XS4",
          label: "XS4",
        },
      ],
    },
    {
      id: "SPL1",
      label: "Splice",
      category: "Splice",
      shape: "circle",
      connectors: [
        {
          id: "XSP_500",
          label: "XSP_500",
        },
      ],
    },
    {
      id: "ICC",
      label: "Instrument Cluster Controller",
      category: "Instrument",
      shape: "rectangle",
      connectors: [
        {
          id: "XJ2",
          label: "XJ2",
        },
      ],
    },
  ],
  connections: [
    {
      color: "yellow",
      from: {
        componentId: "S4",
        connectorId: "XS4",
        cavity: "2",
      },
      to: {
        componentId: "SPL1",
        connectorId: "XSP_500",
        cavity: "L",
      },
      label: "",
    },
    {
      color: "pink",
      from: {
        componentId: "ICC",
        connectorId: "XJ2",
        cavity: "3",
      },
      to: {
        componentId: "S4",
        connectorId: "XS4",
        cavity: "4",
      },
      label: "",
    },
  ],
};
export default S4;