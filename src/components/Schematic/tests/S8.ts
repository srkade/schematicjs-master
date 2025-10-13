const S8 = {
  masterComponents: ["S8"],
  components: [
    {
      id: "S8",
      label: "Brake switch",
      category: "Switch",
      shape: "rectangle",
      connectors: [
        {
          id: "XS8",
          label: "XS8",
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
      id: "SPL2",
      label: "Splice",
      category: "Splice",
      shape: "circle",
      connectors: [
        {
          id: "XSP_767",
          label: "XSP_767",
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
        componentId: "S8",
        connectorId: "XS8",
        cavity: "5",
      },
      to: {
        componentId: "SPL1",
        connectorId: "XSP_500",
        cavity: "L",
      },
      label: "",
    },
    {
      color: "violet",
      from: {
        componentId: "S8",
        connectorId: "XS8",
        cavity: "1",
      },
      to: {
        componentId: "SPL2",
        connectorId: "XSP_767",
        cavity: "L",
      },
      label: "",
    },
    {
      color: "violet",
      from: {
        componentId: "ICC",
        connectorId: "XJ2",
        cavity: "3",
      },
      to: {
        componentId: "S8",
        connectorId: "XS8",
        cavity: "1",
      },
      label: "",
    },
  ],
};

export default S8;
