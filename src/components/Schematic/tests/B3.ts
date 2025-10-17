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
      // Extra wire details for popup when clicking XB3
      wireDetails310A: {
        circuitNumber: "310A",
        wireSize: 0.8,
        wireColor: "OG",
        wireLength: 960,
        wireType: "Regular",
        twistId: "",        // No value given above, so empty string
        shieldId: "",       // No value given above, so empty string
        wireOption: "",
        mark: "",
        from: {
          connectorNumber: "XB3",
          devName: "Coolant Temperature Sensor",
          connPartNumber: "57M10968",
          termPartNo: "57M10968",
          sealPartNo: "",
          cavity: "1"
        },
        to: {
          connectorNumber: "XJ1",
          devName: "Instrument Cluster Controller",
          connPartNumber: "57M12666",
          termPartNo: "57M11448",
          sealPartNo: "",
          cavity: "16"
        }
      }
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
      // Extra wire details for popup when clicking XJ1 side of this wire
      wireDetails310A: {
        circuitNumber: "310A",
        wireSize: 0.8,
        wireColor: "OG",
        wireLength: 960,
        wireType: "Regular",
        twistId: "",
        shieldId: "",
        wireOption: "",
        mark: "",
        from: {
          connectorNumber: "XB3",
          devName: "Coolant Temperature Sensor",
          connPartNumber: "57M10968",
          termPartNo: "57M10968",
          sealPartNo: "",
          cavity: "1"
        },
        to: {
          connectorNumber: "XJ1",
          devName: "Instrument Cluster Controller",
          connPartNumber: "57M12666",
          termPartNo: "57M11448",
          sealPartNo: "",
          cavity: "16"
        }
      }
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
      // Extra wire data if you want at connection level instead:
      wireDetails: {
        circuitNumber: "310A",
        wireSize: 0.8,
        wireColor: "OG",
        wireLength: 960,
        wireType: "Regular",
        twistId: "",
        shieldId: "",
        wireOption: "",
        mark: "",
        from: {
          connectorNumber: "XB3",
          devName: "Coolant Temperature Sensor",
          connPartNumber: "57M10968",
          termPartNo: "57M10968",
          sealPartNo: "",
          cavity: "1"
        },
        to: {
          connectorNumber: "XJ1",
          devName: "Instrument Cluster Controller",
          connPartNumber: "57M12666",
          termPartNo: "57M11448",
          sealPartNo: "",
          cavity: "16"
        }
      }
    },
  ],
};

export default B3;
