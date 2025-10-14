import React, { useState } from "react";
import { DashboardItem } from "../App";
import "../Styles/LeftPanel.css";
import Schematic from "./Schematic/Schematic";

interface LeftPanelProps {
  activeTab: string;
  data: DashboardItem[];
  onItemSelect: (item: DashboardItem) => void;
  selectedItem: DashboardItem | null;
  selectedCodes: string[];
  setSelectedCodes: React.Dispatch<React.SetStateAction<string[]>>;
  onViewSchematic: (selectedCodes: string[]) => void;
  isMobile: boolean;
}

export default function LeftPanel({
  activeTab,
  data,
  onItemSelect,
  selectedItem,
  selectedCodes,
  setSelectedCodes,
  onViewSchematic,
  isMobile,
}: LeftPanelProps) {
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPanelOpen, setIsPanelOpen] = useState(false); // CHANGE: Mobile toggle state

  // Filter and sort data
  const filteredData = data
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.type.toLowerCase().includes(searchTerm.toLowerCase())
    )
    // Sort: selected components first
    .sort((a, b) => {
      const aSelected = selectedCodes.includes(a.code);
      const bSelected = selectedCodes.includes(b.code);
      if (aSelected && !bSelected) return -1;
      if (!aSelected && bSelected) return 1;
      return 0;
    });

  // Handle item click
  const handleItemClick = (item: DashboardItem) => {
    const code = item.code;

    if (isMultiSelectMode) {
      setSelectedCodes((prev) =>
        prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
      );
    } else {
      onItemSelect(item);
      if(isMobile) setIsPanelOpen(false);
    }
  };
  

  return (
    <div
      className="left_panel"
      style={{
        width: "320px",
        minWidth:"320px",
        background: "white",
        borderRight: "1px solid #e9ecef",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div style={{ padding: "20px", borderBottom: "1px solid #e9ecef" }}>
        <h2
          style={{
            margin: "0 0 16px 0",
            color: "#212529",
            fontSize: "18px",
            fontWeight: "600",
            textTransform: "capitalize",
          }}
        >
          {activeTab.replace(/([A-Z])/g, " $1").trim()}
        </h2>

        <div style={{ position: "relative" }}>
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px 10px 40px",
              border: "1px solid #ced4da",
              borderRadius: "8px",
              fontSize: "14px",
              background: "#f8f9fa",
              color: "#495057",
            }}
          />
          <span
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#6c757d",
              fontSize: "16px",
            }}
          >
            🔍
          </span>
        </div>
      </div>

      {/* Multi-Select Toggle */}
      <div style={{ padding: "8px 16px", borderBottom: "1px solid #e9ecef" }}>
        <label style={{ fontSize: "14px", color: "#212529" }}>
          <input
            type="checkbox"
            checked={isMultiSelectMode}
            onChange={(e) => {
              setIsMultiSelectMode(e.target.checked);
              if (!e.target.checked) setSelectedCodes([]);
            }}
            style={{ marginRight: "8px" }}
          />
          Multi-Select Mode
        </label>
      </div>

      {/* Buttons when multi-select active */}
      {isMultiSelectMode && selectedCodes.length > 0 && (
        <div
          style={{
            padding: "8px 16px",
            display: "flex",
            gap: 8,
            borderBottom: "1px solid #e9ecef",
          }}
        >
          <button
            onClick={() => onViewSchematic(selectedCodes)}
            style={{
              background: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "6px",
              padding: "6px 12px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            View Schematic
          </button>
          <button
            onClick={() => setSelectedCodes([])}
            style={{
              background: "#f1f3f5",
              border: "1px solid #ced4da",
              borderRadius: "6px",
              padding: "6px 12px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Clear Selection
          </button>
        </div>
      )}

      {/* Items List */}
      <div style={{ flex: 1, overflow: "auto", padding: "16px" }}>
        {filteredData.map((item) => {
          const isSelected = isMultiSelectMode
            ? selectedCodes.includes(item.code)
            : selectedItem?.code === item.code;

          return (
            <div key={item.code}>
              <div
                onClick={() => handleItemClick(item)}
                style={{
                  padding: "16px",
                  marginBottom: "12px",
                  border: `2px solid ${isSelected ? "#007bff" : "#e9ecef"}`,
                  borderRadius: "12px",
                  background: isSelected ? "#f0f8ff" : "white",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: isSelected
                    ? "0 4px 12px rgba(0,123,255,0.15)"
                    : "0 2px 4px rgba(0,0,0,0.1)",
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "#007bff";
                    (e.currentTarget as HTMLElement).style.background =
                      "#f8f9fa";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "#e9ecef";
                    (e.currentTarget as HTMLElement).style.background = "white";
                  }
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                  }}
                >
                  {isMultiSelectMode && (
                    <input
                      type="checkbox"
                      checked={selectedCodes.includes(item.code)}
                      onChange={(e) => {
                        e.stopPropagation();
                        const code = item.code;
                        setSelectedCodes((prev) =>
                          e.target.checked
                            ? [...prev, code]
                            : prev.filter((c) => c !== code)
                        );
                      }}
                      style={{ marginTop: "4px" }}
                    />
                  )}

                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "6px",
                      }}
                    >
                      <span
                        style={{
                          background: "#e3f2fd",
                          color: "#1565c0",
                          padding: "2px 8px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          fontWeight: "500",
                        }}
                      >
                        {item.code}
                      </span>
                    </div>

                    <h3
                      style={{
                        margin: "0 0 4px 0",
                        color: "#212529",
                        fontSize: "16px",
                        fontWeight: "600",
                      }}
                    >
                      {item.name}
                    </h3>
                  </div>
                </div>
              </div>

              {/* FIX: Wrapped schematic block correctly (moved inside div, fixed brackets) */}
              {/* {selectedItem?.code === item.code &&
                selectedItem?.schematicData && (
                  <div className="mobile-only" style={{ marginBottom: "12px" }}>
                    <Schematic data={selectedItem.schematicData} scale={0.6} />
                  </div>
                )} */}
              {isMobile && selectedItem?.code === item.code && selectedItem?.schematicData && (
                <div style={{ marginBottom: "12px" }}>
                  <Schematic data={selectedItem.schematicData} scale={0.6} />
                </div>
              )}


              {/* FIX END */}
            </div>
          );
        })}

        {filteredData.length === 0 && (
          <div
            style={{
              padding: "40px 20px",
              textAlign: "center",
              color: "#6c757d",
            }}
          >
            <p>No {activeTab} found</p>
          </div>
        )}
      </div>
    </div>
  );
}
