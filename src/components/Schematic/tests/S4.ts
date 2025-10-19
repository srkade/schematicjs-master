const S4 = {
  masterComponents: ["S4"],
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
      category: "Transistor",
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
         gender: ""
      },
      to: {
        componentId: "SPL_500",
        connectorId: "XSP_500",
        cavity: "L",
        gender: ""
      },
      label: "",
      wireDetails: {
        circuitNumber: "500C",
        wireSize: 0.8,
        wireColor: "YE",
        wireLength: 2377,
        wireType: "Regular",
        twistId: "",
        shieldId: "",
        wireOption: "",
        mark: "",
        from: {
          connectorNumber: "XS4",
          devName: "Seat switch",
          connPartNumber: "57M7535",
          termPartNo: "57M7546",
          sealPartNo: "",
          cavity: "2",
        },
        to: {
          connectorNumber: "XSP_500",
          devName: "Splice",
          connPartNumber: "",
          termPartNo: "",
          sealPartNo: "",
          cavity: "L",
        },
      },
    },
    {
      color: "pink",
      from: {
        componentId: "ICC",
        connectorId: "XJ2",
        cavity: "3",
        gender: ""
      },
      to: {
        componentId: "S4",
        connectorId: "XS4",
        cavity: "4",
        gender: ""
      },
      label: "",
      wireDetails: {
        circuitNumber: "800A",
        wireSize: 0.8,
        wireColor: "PK",
        wireLength: 2510,
        wireType: "Regular",
        twistId: "",
        shieldId: "",
        wireOption: "",
        mark: "",
        from: {
          connectorNumber: "XJ2",
          devName: "Instrument Cluster Controller",
          connPartNumber: "57M12920",
          termPartNo: "57M11448",
          sealPartNo: "",
          cavity: "3",
          gender: ""
        },
        to: {
          connectorNumber: "XS4",
          devName: "Seat switch",
          connPartNumber: "57M7535",
          termPartNo: "57M7546",
          sealPartNo: "",
          cavity: "4",
          gender: ""
        },
      },
    },
  ],
};
export default S4;
