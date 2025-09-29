// import React from "react";
// import Schematic from "./Schematic";

// const B3 = {
//   components: [
//     {
//       id: "B3",
//       label: "Coolant Temperature sensor",
//       category: "Sensor",
//       shape: "rectangle",
//       connectors: [
//         {
//           id: "XB3",
//           label: "XB3",
//         },
//       ],
//     },
//     {
//       id: "ICC",
//       label: "Instrument Cluster Controller",
//       category: "Transistor",
//       shape: "rectangle",
//       connectors: [
//         {
//           id: "XJ1",
//           label: "XJ1",
//         },
//       ],
//     },
//   ],
//   connections: [
//     {
//       color: "orange",
//       from: {
//         componentId: "B3",
//         connectorId: "XB3",
//         cavity: "1",
//       },
//       to: {
//         componentId: "ICC",
//         connectorId: "XJ1",
//         cavity: "16",
//       },
//       label: "",
//     },
//   ],
// };

// const S4 = {
//   components: [
//     {
//       id: "S4",
//       label: "Seat Switch",
//       category: "Switch",
//       shape: "rectangle",
//       connectors: [
//         {
//           id: "XS4",
//           label: "XS4",
//         },
//       ],
//     },
//     {
//       id: "SPL1",
//       label: "Splice",
//       category: "Splice",
//       shape: "circle",
//       connectors: [
//         {
//           id: "XSP_500",
//           label: "XSP_500",
//         },
//       ],
//     },
//     {
//       id: "ICC",
//       label: "Instrument Cluster Controller",
//       category: "Instrument",
//       shape: "rectangle",
//       connectors: [
//         {
//           id: "XJ2",
//           label: "XJ2",
//         },
//       ],
//     },
//   ],
//   connections: [
//     {
//       color: "yellow",
//       from: {
//         componentId: "S4",
//         connectorId: "XS4",
//         cavity: "2",
//       },
//       to: {
//         componentId: "SPL1",
//         connectorId: "XSP_500",
//         cavity: "L",
//       },
//       label: "",
//     },
//     {
//       color: "pink",
//       from: {
//         componentId: "ICC",
//         connectorId: "XJ2",
//         cavity: "3",
//       },
//       to: {
//         componentId: "S4",
//         connectorId: "XS4",
//         cavity: "4",
//       },
//       label: "",
//     },
//   ],
// };

// const S9 = {
//   components: [
//     {
//       id: "S9",
//       label: "Light switch",
//       category: "Switch",
//       shape: "rectangle",
//       connectors: [
//         {
//           id: "XS9",
//           label: "XS9",
//         },
//       ],
//     },
//     {
//       id: "SPL1",
//       label: "Splice",
//       category: "Splice",
//       shape: "circle",
//       connectors: [
//         {
//           id: "XSP_450",
//           label: "XSP_450",
//         },
//       ],
//     },
//     {
//       id: "ICC",
//       label: "Instrument Cluster Controller",
//       category: "Instrument",
//       shape: "rectangle",
//       connectors: [
//         {
//           id: "XJ1",
//           label: "XJ1",
//         },
//       ],
//     },
//     {
//       id: "LC",
//       label: "Load Center",
//       category: "Instrument",
//       shape: "rectangle",
//       connectors: [
//         {
//           id: "X90",
//           label: "X90",
//         },
//       ],
//     },
//     {
//       id: "HR",
//       label: "Headlight relay",
//       category: "Instrument",
//       shape: "rectangle",
//       connectors: [
//         {
//           id: "XK3",
//           label: "XK3",
//         },
//       ],
//     },
//   ],
//   connections: [
//     {
//       color: "yellow",
//       from: {
//         componentId: "S9",
//         connectorId: "XS9",
//         cavity: "B",
//       },
//       to: {
//         componentId: "SPL1",
//         connectorId: "XSP_450",
//         cavity: "L",
//       },
//       label: "",
//     },
//     {
//       color: "pink",
//       from: {
//         componentId: "ICC",
//         connectorId: "XJ1",
//         cavity: "12",
//       },
//       to: {
//         componentId: "S9",
//         connectorId: "XS9",
//         cavity: "C",
//       },
//       label: "",
//     },
//     {
//       color: "yellow",
//       from: {
//         componentId: "LC",
//         connectorId: "X90",
//         cavity: "47",
//       },
//       to: {
//         componentId: "S9",
//         connectorId: "XS9",
//         cavity: "D",
//       },
//       label: "",
//     },
//     {
//       color: "green",
//       from: {
//         componentId: "HR",
//         connectorId: "XK3",
//         cavity: "19",
//       },
//       to: {
//         componentId: "S9",
//         connectorId: "XS9",
//         cavity: "1",
//       },
//       label: "",
//     },
//   ],
// };

// const S8 = {
//   components: [
//     {
//       id: "S8",
//       label: "Brake switch",
//       category: "Switch",
//       shape: "rectangle",
//       connectors: [
//         {
//           id: "XS8",
//           label: "XS8",
//         },
//       ],
//     },
//     {
//       id: "SPL1",
//       label: "Splice",
//       category: "Splice",
//       shape: "circle",
//       connectors: [
//         {
//           id: "XSP_500",
//           label: "XSP_500",
//         },
//         {
//           id: "XSP_767",
//           label: "XSP_767",
//         },
//       ],
//     },
//     {
//       id: "ICC",
//       label: "Instrument Cluster Controller",
//       category: "Instrument",
//       shape: "rectangle",
//       connectors: [
//         {
//           id: "XJ2",
//           label: "XJ2",
//         },
//       ],
//     },
//   ],
//   connections: [
//     {
//       color: "yellow",
//       from: {
//         componentId: "S8",
//         connectorId: "XS8",
//         cavity: "5",
//       },
//       to: {
//         componentId: "SPL1",
//         connectorId: "XSP_500",
//         cavity: "L",
//       },
//       label: "",
//     },
//     {
//       color: "violet",
//       from: {
//         componentId: "S8",
//         connectorId: "XS8",
//         cavity: "1",
//       },
//       to: {
//         componentId: "SPL1",
//         connectorId: "XSP_767",
//         cavity: "L",
//       },
//       label: "",
//     },
//     {
//       color: "violet",
//       from: {
//         componentId: "ICC",
//         connectorId: "XJ2",
//         cavity: "3",
//       },
//       to: {
//         componentId: "S8",
//         connectorId: "XS8",
//         cavity: "1",
//       },
//       label: "",
//     },
//   ],
// };

import React, { useState } from "react";
import NavigationTabs from "./components/NavigationTabs";
import LeftPanel from "./components/LeftPanel";
import MainPanel from "./components/MainPanel";
import { SchematicData } from "./types/SchematicTypes";

// Your existing schematic data
const B3: SchematicData = {
  components: [
    {
      id: "B3",
      label: "Coolant Temperature sensor",
      category: "Sensor",
      shape: "rectangle",
      connectors: [{ id: "XB3", label: "XB3" }],
    },
    {
      id: "ICC",
      label: "Instrument Cluster Controller",
      category: "Transistor", 
      shape: "rectangle",
      connectors: [{ id: "XJ1", label: "XJ1" }],
    },
  ],
  connections: [
    {
      color: "orange",
      from: { componentId: "B3", connectorId: "XB3", cavity: "1" },
      to: { componentId: "ICC", connectorId: "XJ1", cavity: "16" },
      label: "",
    },
  ],
};

const S4: SchematicData = {
  components: [
    {
      id: "S4",
      label: "Seat Switch",
      category: "Switch",
      shape: "rectangle",
      connectors: [{ id: "XS4", label: "XS4" }],
    },
    {
      id: "SPL1",
      label: "Splice",
      category: "Splice",
      shape: "circle",
      connectors: [{ id: "XSP_500", label: "XSP_500" }],
    },
    {
      id: "ICC",
      label: "Instrument Cluster Controller",
      category: "Instrument",
      shape: "rectangle",
      connectors: [{ id: "XJ2", label: "XJ2" }],
    },
  ],
  connections: [
    {
      color: "yellow",
      from: { componentId: "S4", connectorId: "XS4", cavity: "2" },
      to: { componentId: "SPL1", connectorId: "XSP_500", cavity: "L" },
      label: "",
    },
    {
      color: "pink",
      from: { componentId: "ICC", connectorId: "XJ2", cavity: "3" },
      to: { componentId: "S4", connectorId: "XS4", cavity: "4" },
      label: "",
    },
  ],
};

const S9: SchematicData = {
  components: [
    {
      id: "S9",
      label: "Light switch",
      category: "Switch",
      shape: "rectangle",
      connectors: [{ id: "XS9", label: "XS9" }],
    },
    {
      id: "SPL1",
      label: "Splice",
      category: "Splice",
      shape: "circle",
      connectors: [{ id: "XSP_450", label: "XSP_450" }],
    },
    {
      id: "ICC",
      label: "Instrument Cluster Controller",
      category: "Instrument",
      shape: "rectangle",
      connectors: [{ id: "XJ1", label: "XJ1" }],
    },
    {
      id: "LC",
      label: "Load Center",
      category: "Instrument",
      shape: "rectangle",
      connectors: [{ id: "X90", label: "X90" }],
    },
    {
      id: "HR",
      label: "Headlight relay",
      category: "Instrument",
      shape: "rectangle",
      connectors: [{ id: "XK3", label: "XK3" }],
    },
  ],
  connections: [
    {
      color: "yellow",
      from: { componentId: "S9", connectorId: "XS9", cavity: "B" },
      to: { componentId: "SPL1", connectorId: "XSP_450", cavity: "L" },
      label: "",
    },
    {
      color: "pink",
      from: { componentId: "ICC", connectorId: "XJ1", cavity: "12" },
      to: { componentId: "S9", connectorId: "XS9", cavity: "C" },
      label: "",
    },
    {
      color: "yellow",
      from: { componentId: "LC", connectorId: "X90", cavity: "47" },
      to: { componentId: "S9", connectorId: "XS9", cavity: "D" },
      label: "",
    },
    {
      color: "green",
      from: { componentId: "HR", connectorId: "XK3", cavity: "19" },
      to: { componentId: "S9", connectorId: "XS9", cavity: "1" },
      label: "",
    },
  ],
};

const S8: SchematicData = {
  components: [
    {
      id: "S8",
      label: "Brake switch",
      category: "Switch",
      shape: "rectangle",
      connectors: [{ id: "XS8", label: "XS8" }],
    },
    {
      id: "SPL1",
      label: "Splice",
      category: "Splice",
      shape: "circle",
      connectors: [
        { id: "XSP_500", label: "XSP_500" },
        { id: "XSP_767", label: "XSP_767" },
      ],
    },
    {
      id: "ICC",
      label: "Instrument Cluster Controller",
      category: "Instrument",
      shape: "rectangle",
      connectors: [{ id: "XJ2", label: "XJ2" }],
    },
  ],
  connections: [
    {
      color: "yellow",
      from: { componentId: "S8", connectorId: "XS8", cavity: "5" },
      to: { componentId: "SPL1", connectorId: "XSP_500", cavity: "L" },
      label: "",
    },
    {
      color: "violet",
      from: { componentId: "S8", connectorId: "XS8", cavity: "1" },
      to: { componentId: "SPL1", connectorId: "XSP_767", cavity: "L" },
      label: "",
    },
    {
      color: "violet",
      from: { componentId: "ICC", connectorId: "XJ2", cavity: "3" },
      to: { componentId: "S8", connectorId: "XS8", cavity: "1" },
      label: "",
    },
  ],
};

// Create dashboard items from schematics
const allSchematics = { B3, S4, S9, S8 };
const dashboardItems = Object.entries(allSchematics).map(([key, schematic]) => ({
  code: key,
  name: schematic.components[0]?.label || "Unknown Component",
  type: schematic.components[0]?.category || "Unknown",
  status: "Active" as const,
  voltage: key === "B3" ? "12V" : key === "S4" ? "5V" : "12V",
  description: `Schematic for ${schematic.components[0]?.label}`,
  schematicData: schematic,
}));

export type DashboardItem = {
  code: string;
  name: string;
  type: string;
  status: "Active" | "Inactive";
  voltage?: string;
  description: string;
  schematicData: SchematicData;
};

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("components");
  const [selectedItem, setSelectedItem] = useState<DashboardItem | null>(null);

  // Filter items by category based on active tab
  const filteredItems = dashboardItems.filter(item => {
    switch (activeTab) {
      case "components":
        return ["Sensor", "Switch"].includes(item.type);
      case "controllers":
        return ["Transistor", "Instrument"].includes(item.type);
      case "systems":
        return ["Splice"].includes(item.type);
      default:
        return true;
    }
  });

  return (
    <div style={{ height: "100vh", background: "#f8f9fa", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ 
        background: "white", 
        borderBottom: "1px solid #e9ecef",
        padding: "16px 24px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: 48,
            height: 48,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "24px",
            fontWeight: "bold"
          }}>
            ⚡
          </div>
          <div>
            <h1 style={{ margin: 0, color: "#212529", fontSize: "28px", fontWeight: "700" }}>
              ASDM
            </h1>
            <p style={{ margin: 0, color: "#6c757d", fontSize: "14px" }}>
              Automobile Engineering Harness Dashboard
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Left Panel */}
        <LeftPanel
          activeTab={activeTab}
          data={filteredItems}
          onItemSelect={setSelectedItem}
          selectedItem={selectedItem}
        />

        {/* Main Panel */}
        <MainPanel
          selectedItem={selectedItem}
          activeTab={activeTab}
        />
      </div>
    </div>
  );
}
