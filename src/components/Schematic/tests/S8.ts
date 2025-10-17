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
      // Extra wire details for popup actions using XS8
      wireDetails500D: {
        circuitNumber: "500D",
        wireSize: 0.8,
        wireColor: "YE",
        wireLength: 1079,
        wireType: "Regular",
        twistId: "",
        shieldId: "",
        wireOption: "",
        mark: "",
        from: {
          connectorNumber: "XS8",
          devName: "Brake switch",
          connPartNumber: "57M14183",
          termPartNo: "",
          sealPartNo: "",
          cavity: "5",
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
      wireDetails767G: {
        circuitNumber: "767G",
        wireSize: 1,
        wireColor: "VT",
        wireLength: "",
        wireType: "Regular",
        twistId: "",
        shieldId: "",
        wireOption: "",
        mark: "",
        from: {
          connectorNumber: "XS8",
          devName: "Brake Switch",
          connPartNumber: "",
          termPartNo: "",
          sealPartNo: "",
          cavity: "1"
        },
        to: {
          connectorNumber: "XSP_767",
          devName: "Splice",
          connPartNumber: "",
          termPartNo: "",
          sealPartNo: "",
          cavity: "L"
        }
      },
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
      wireDetails500D: {
        circuitNumber: "500D",
        wireSize: 0.8,
        wireColor: "YE",
        wireLength: 1079,
        wireType: "Regular",
        twistId: "",
        shieldId: "",
        wireOption: "",
        mark: "",
        from: {
          connectorNumber: "XS8",
          devName: "Brake switch",
          connPartNumber: "57M14183",
          termPartNo: "",
          sealPartNo: "",
          cavity: "5",
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
      wireDetails767G: {
        circuitNumber: "767G",
        wireSize: 1,
        wireColor: "VT",
        wireLength: "",
        wireType: "Regular",
        twistId: "",
        shieldId: "",
        wireOption: "",
        mark: "",
        from: {
          connectorNumber: "XS8",
          devName: "Brake Switch",
          connPartNumber: "",
          termPartNo: "",
          sealPartNo: "",
          cavity: "1"
        },
        to: {
          connectorNumber: "XSP_767",
          devName: "Splice",
          connPartNumber: "",
          termPartNo: "",
          sealPartNo: "",
          cavity: "L"
        }
      },
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
      wireDetails767A: {
        circuitNumber: "767A",
        wireSize: 0.8,
        wireColor: "VT",
        wireLength: 1212,
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
          cavity: "5"
        },
        to: {
          connectorNumber: "XS8",
          devName: "Brake switch",
          connPartNumber: "57M14183",
          termPartNo: "57M11448",
          sealPartNo: "",
          cavity: "1"
        }
      },
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
      wireDetails: {
        circuitNumber: "500D",
        wireSize: 0.8,
        wireColor: "YE",
        wireLength: 1079,
        wireType: "Regular",
        twistId: "",
        shieldId: "",
        wireOption: "",
        mark: "",
        from: {
          connectorNumber: "XS8",
          devName: "Brake switch",
          connPartNumber: "57M14183",
          termPartNo: "",
          sealPartNo: "",
          cavity: "5",
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
      wireDetails: {
        circuitNumber: "767G",
        wireSize: 1,
        wireColor: "VT",
        wireLength: "",
        wireType: "Regular",
        twistId: "",
        shieldId: "",
        wireOption: "",
        mark: "",
        from: {
          connectorNumber: "XS8",
          devName: "Brake Switch",
          connPartNumber: "",
          termPartNo: "",
          sealPartNo: "",
          cavity: "1"
        },
        to: {
          connectorNumber: "XSP_767",
          devName: "Splice",
          connPartNumber: "",
          termPartNo: "",
          sealPartNo: "",
          cavity: "L"
        }
      },
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
      wireDetails: {
        circuitNumber: "767A",
        wireSize: 0.8,
        wireColor: "VT",
        wireLength: 1212,
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
          cavity: "5"
        },
        to: {
          connectorNumber: "XS8",
          devName: "Brake switch",
          connPartNumber: "57M14183",
          termPartNo: "57M11448",
          sealPartNo: "",
          cavity: "1"
        }
      },
    },
  ],
};
export default S8;
