
const DTC_StarterCoolDown = {
  masterComponents: ["S12"],
  components: [
     {
      id: "S12",
      label: "Horn switch",
      category: "dtc",
      shape: "rectangle",
      connectors: [
        {
          id: "XS12",
          label: "XS12",
        },
      ],
    },
    {
      id: "SPL_500",
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
      category: "Controller",
      shape: "rectangle",
      connectors: [
        {
          id: "XJ1",
          label: "XJ1",
        },
       
      ],
    },
    
    {
      id: "H1",
      label: "Horn",
      category: "Horn",
      shape: "rectangle",
      connectors: [
        {
          id: "XH1",
          label: "XH1",
        },
      ],
    },
   
    
  ],
  connections: [
    {
      color: "yellow",
      from: {
        componentId: "ICC",
        connectorId: "XJ1",
        cavity: "6",
      },
      to: {
        componentId: "SPL_500",
        connectorId: "XSP_500",
        cavity: "L",
      },
      label: "",
    },
    {
      color: "black",
      from: {
        componentId: "S12",
        connectorId: "XS12",
        cavity: "A",
      },
      to: {
        componentId: "SPL_500",
        connectorId: "XSP_500",
        cavity: "L",
      },
      label: "",
    },
    {
      color: "violet",
      from: {
        componentId: "H1",
        connectorId: "XH1",
        cavity: "A",
      },
      to: {
        componentId: "S12",
        connectorId: "XS12",
        cavity: "B",
      },
      label: "",
    },
    
  ],
};


export {  DTC_StarterCoolDown };
