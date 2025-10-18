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
      
    }
  ],
  connections: [
    {
      color: "yellow",
      from: {
        componentId: "S9",
        connectorId: "XS9",
        cavity: "B",
        gender: ""
      },
      to: {
        componentId: "SPL1",
        connectorId: "XSP_450",
        cavity: "L",
        gender: ""
      },
      label: "",
      wireDetails: {
        circuitNumber: "450A",
        wireSize: 1,
        wireColor: "YE",
        wireLength: 1339,
        wireType: "Regular",
        twistId: "",
        shieldId: "",
        wireOption: "",
        mark: "",
        from: {
          connectorNumber: "XS9",
          devName: "Light switch",
          connPartNumber: "57M9361",
          termPartNo: "57M9200",
          sealPartNo: "",
          cavity: "B",
        },
        to: {
          connectorNumber: "XSP_450",
          devName: "Splice",
          connPartNumber: "",
          termPartNo: "",
          sealPartNo: "",
          cavity: "L",
        },
      },
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
      wireDetails: {
        circuitNumber: "400A",
        wireSize: 1,
        wireColor: "YE",
        wireLength: 571,
        wireType: "Regular",
        twistId: "",
        shieldId: "",
        wireOption: "",
        mark: "",
        from: {
          connectorNumber: "X90",
          devName: "Load center",
          connPartNumber: "57M13428",
          termPartNo: "57M7491",
          sealPartNo: "57M9219",
          cavity: "47"
        },
        to: {
          connectorNumber: "XS9",
          devName: "Light switch",
          connPartNumber: "57M9361",
          termPartNo: "57M9200",
          sealPartNo: "",
          cavity: "D"
        }
      }
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
      wireDetails: {
        circuitNumber: "456A-1",
        wireSize: 0.8,
        wireColor: "GN",
        wireLength: "",
        wireType: "Regular",
        twistId: "",
        shieldId: "",
        wireOption: "",
        mark: "",
        from: {
          connectorNumber: "XK3",
          devName: "Headlight relay",
          connPartNumber: "",
          termPartNo: "",
          sealPartNo: "",
          cavity: "19"
        },
        to: {
          connectorNumber: "XS9",
          devName: "Light switch",
          connPartNumber: "57M9361",
          termPartNo: "57M9200",
          sealPartNo: "",
          cavity: "1"
        }
      }
    }
  ],
};
export default S9;
