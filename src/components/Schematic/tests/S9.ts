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
        label: "XS9"
      }
    ],
    engineering_component_name: "Light switch",
    engineering_manufacturer: "Bosch",
    primary_part_number: "57M9361",
    harness_name: "MAIN WIRING HARNESS (W1)",
    component_type: "Component",
    connector_type: "Direct",
    remove: false,
    manufacturer: "Delphi",
    connector_part_number: "57M9361",
    gender: "Female"
  },
  {
    id: "SPL_450",
    label: "Splice",
    category: "Splice",
    shape: "circle",
    connectors: [
      {
        id: "XSP_450",
        label: "XSP_450"
      }
    ],
    harness_name: "MAIN WIRING HARNESS (W1)",
    component_type: "Splice",
    connector_type: "Direct",
    remove: false
  },
  {
    id: "ICC",
    label: "Instrument Cluster Controller",
    category: "Transistor",
    shape: "rectangle",
    connectors: [
      {
        id: "XJ1",
        label: "XJ1"
      },
      {
        id: "XJ2",
        label: "XJ2"
      }
    ],
    engineering_component_name: "Instrument Cluster Controller",
    engineering_manufacturer: "Bosch",
    primary_part_number: "57M12666",
    harness_name: "MAIN WIRING HARNESS (W1)",
    component_type: "Component",
    connector_type: "Direct",
    remove: false,
    manufacturer: "Molex",
    connector_part_number: "57M12666",
    gender: "Female"
  },
  {
    id: "LC",
    label: "Load Center",
    category: "Transformer",
    shape: "rectangle",
    connectors: [
      {
        id: "X90",
        label: "X90"
      }
    ],
    engineering_component_name: "Load center",
    engineering_manufacturer: "Bosch",
    primary_part_number: "57M13428",
    harness_name: "MAIN WIRING HARNESS (W1)",
    component_type: "Component",
    connector_type: "Direct",
    remove: false,
    manufacturer: "GEP",
    connector_part_number: "57M13428",
    gender: "Female"
  },
  {
    id: "HR",
    label: "Headlight relay",
    category: "Relay",
    shape: "rectangle",
    connectors: [
      {
        id: "XK3",
        label: "XK3"
      }
    ],
    engineering_component_name: "Headlight relay",
    harness_name: "MAIN WIRING HARNESS (W1)",
    component_type: "Component",
    connector_type: "Direct",
    remove: false
  }
]
,
  connections: [
    {
      color: "yellow",
      from: {
        componentId: "S9",
        connectorId: "XS9",
        cavity: "B",
        gender: "female"
      },
      to: {
        componentId: "SPL_450",
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
        gender:"female"
      },
      to: {
        componentId: "S9",
        connectorId: "XS9",
        cavity: "D",
        gender:"female"
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
      color: "pink",
      from: {
        componentId: "ICC",
        connectorId: "XJ1",
        cavity: "12",
        gender:"female"
      },
      to: {
        componentId: "S9",
        connectorId: "XS9",
        cavity: "C",
        gender:"female"
      },
      label: ""
    },
    {
      color: "green",
      from: {
        componentId: "HR",
        connectorId: "XK3",
        cavity: "19",
        gender:""
      },
      to: {
        componentId: "S9",
        connectorId: "XS9",
        cavity: "1",
        gender:"female"
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
