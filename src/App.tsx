import React, { Component, useState, useEffect } from "react";
import NavigationTabs from "./components/NavigationTabs";
import LeftPanel from "./components/LeftPanel";
import MainPanel from "./components/MainPanel";
import { SchematicData } from "./types/SchematicTypes";
import Schematic from "./components/Schematic/Schematic";
import {
  ICC,
  S4,
  S9,
  S8,
  B3,
  CrankingSystem,
} from "./components/Schematic/tests";
import {  DTC_StarterCoolDown } from "./components/Schematic/tests/DTCs"
import LoginPage from "./components/LoginPage";
import { mergeSchematicConfigs } from './utils/mergeSchematicConfigs';


const wrapSchematic = (schematic: any): any => ({
  masterComponents: [], // add this line
  ...schematic
});
// Create dashboard items from schematics
const allSchematics = {
  ICC: wrapSchematic(ICC),
  B3: wrapSchematic(B3),
  S4: wrapSchematic(S4),
  S8: wrapSchematic(S8),
  S9: wrapSchematic(S9),
  CrankingSystem: wrapSchematic(CrankingSystem),
  
  DTC_StarterCoolDown: wrapSchematic(DTC_StarterCoolDown),
};
const SYSTEM_KEYS = ["CrankingSystem"];

// Create dashboardItems mapping (DO NOT place any hook or selection logic here)
const dashboardItems = Object.entries(allSchematics).map(([key, schematic]) => {
  const isSystem = SYSTEM_KEYS.includes(key);
  const label =
    schematic.components[0]?.label || (isSystem ? key : "Unknown Component");
  return {
    code: key,
    name: label,
    type: isSystem ? "System" : schematic.components[0]?.category || "Unknown",
    status: "Active" as const,
    voltage: isSystem
      ? "12V"
      : key === "B3"
        ? "12V"
        : key === "S4"
          ? "5V"
          : "12V",
    description: isSystem
      ? `System schematic: ${label}`
      : `Schematic for ${label}`,
    schematicData: schematic,
  };
});

export type DashboardItem = {
  code: string;
  name: string;
  type: string;
  status: "Active" | "Inactive";
  voltage?: string;
  description: string;
  schematicData: SchematicData;
};

// ===============================
// Place ALL React state and logic BELOW this line in the main function
// ===============================
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false); // track login state
  const [activeTab, setActiveTab] = useState<string>("components");
  const [selectedItem, setSelectedItem] = useState<DashboardItem | null>(null);


  // Multi-select additions:
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);
  const [mergedSchematic, setMergedSchematic] = useState<SchematicData | null>(
    null
  );

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const nowMobile = window.innerWidth <= 768;
      setIsMobile(nowMobile);
    };

    window.addEventListener("resize", handleResize);

    // Run once when component mounts (to ensure correct initial size)
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleViewSchematic(codes: string[]) {
    const selectedItems = dashboardItems.filter((it) =>
      codes.includes(it.code)
    );
    // Extract schematic data from dashboard items
    const schematicConfigs = selectedItems.map(item => item.schematicData);
    const merged = mergeSchematicConfigs(...schematicConfigs);
    setMergedSchematic(merged);
    setSelectedItem(null); // Optionally deselect single
  }

  // Filter items by category based on active tab
  const filteredItems = dashboardItems.filter((item) => {
    switch (activeTab) {
      case "components":
        return ["Sensor", "Switch"].includes(item.type);
      case "controllers":
        return ["Transistor", "Instrument"].includes(item.type);
      case "systems":
        return ["System"].includes(item.type);
      case "dtcs":
        return ["Horn","Switch"].includes(item.type);
      default:
        return false;
    }
  });

  if (!loggedIn) {
    return <LoginPage onLoginSuccess={() => setLoggedIn(true)} />;
  }

  return (
    <div
      style={{
        height: "100vh",
        background: "#f8f9fa",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "white",
          borderBottom: "1px solid #e9ecef",
          padding: "1x 2px",
          paddingLeft: "24px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <h1
            style={{
              margin: 0,
              color: "#212529",
              fontSize: "28px",
              fontWeight: "700",
            }}
          >
            ASDM
          </h1>
        </div>
      </div>

      {/* Navigation Tabs */}
      <NavigationTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={() => setLoggedIn(false)}
      />

      {/* Main Content */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Left Panel */}
        <LeftPanel
          activeTab={activeTab}
          data={filteredItems}
          onItemSelect={(item) => {
            setSelectedItem(item);
            setMergedSchematic(null); // Reset merge if new single selected
          }}
          selectedItem={selectedItem}
          selectedCodes={selectedCodes}
          setSelectedCodes={setSelectedCodes}
          onViewSchematic={handleViewSchematic}
          isMobile={isMobile}
        />
        {!isMobile && selectedItem?.schematicData && (
          <Schematic data={selectedItem.schematicData} />
        )}

        {/* Main Panel */}
        <MainPanel
          // If merged schematic is present, show that; otherwise single selection
          selectedItem={
            mergedSchematic
              ? {
                code: "MERGED",
                name: "Merged Schematic",
                type: "Merged",
                status: "Active",
                voltage: "12V",
                description: "Merged view of selected schematics",
                schematicData: mergedSchematic,
              }
              : selectedItem
          }
          activeTab={activeTab}
          isMultipleComponents={!!mergedSchematic}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
}
