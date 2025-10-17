const S9 = {
  masterComponents: ["S9"],
  components: [
    {
      id: "S9",
      label: "Light switch",
      category: "Switch",
      shape: "rectangle",
      connectors: [
        {
          id: "XS9",
          label: "XS9",
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
          id: "XSP_450",
          label: "XSP_450",
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
    {
      id: "LC",
      label: "Load Center",
      category: "Transformer",
      shape: "rectangle",
      connectors: [
        {
          id: "X90",
          label: "X90",
        },
      ],
    },
    {
      id: "HR",
      label: "Headlight relay",
      category: "Instrument",
      shape: "rectangle",
      connectors: [
        {
          id: "XK3",
          label: "XK3",
        },
      ],
    },
  ],
  connections: [
    {
      color: "yellow",
      from: {
        componentId: "S9",
        connectorId: "XS9",
        cavity: "B",
      },
      to: {
        componentId: "SPL1",
        connectorId: "XSP_450",
        cavity: "L",
      },
      label: "",
    },
    {
      color: "pink",
      from: {
        componentId: "ICC",
        connectorId: "XJ1",
        cavity: "12",
      },
      to: {
        componentId: "S9",
        connectorId: "XS9",
        cavity: "C",
      },
      label: "",
    },
    {
      color: "yellow",
      from: {
        componentId: "LC",
        connectorId: "X90",
        cavity: "47",
        
      },
      to: {
        componentId: "S9",
        connectorId: "XS9",
        cavity: "D",
      },
      label: "",
    },
    {
      color: "green",
      from: {
        componentId: "HR",
        connectorId: "XK3",
        cavity: "19",
      },
      to: {
        componentId: "S9",
        connectorId: "XS9",
        cavity: "1",
      },
      label: "",
    },
  ],
};

export default S9;
