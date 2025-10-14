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
    onItemSelect(item);
    if(isMobile) setIsPanelOpen(false);
  };
  // Handle checkbox change
  const handleCheckboxChange = (item: DashboardItem) => {
    const code = item.code;
    let newSelectedCodes: string[];
    
    if (selectedCodes.includes(code)) {
      newSelectedCodes = selectedCodes.filter((c) => c !== code);
    } else {
      newSelectedCodes = [...selectedCodes, code];
    }
    
    setSelectedCodes(newSelectedCodes);
    
    // Automatically view schematic with updated selection
    if (newSelectedCodes.length > 0) {
      onViewSchematic(newSelectedCodes);
    }
  };

  return (
    <div
      className="left-panel"
      style={{
        width: "320px",
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

     {/* Clear Selection Button (only show when items are selected) */}
      {selectedCodes.length > 0 && (
        <div
          style={{
            padding: "8px 16px",
            borderBottom: "1px solid #e9ecef",
          }}
        >
          <button
            onClick={() => setSelectedCodes([])}
            style={{
              width: "100%",
              background: "#f1f3f5",
              border: "1px solid #ced4da",
              borderRadius: "6px",
              padding: "8px 12px",
              cursor: "pointer",
              fontSize: "14px",
              color: "#495057",
            }}
          >
            Clear Selection ({selectedCodes.length})
          </button>
        </div>
      )}

      {/* Items List */}
      <div style={{ flex: 1, overflow: "auto", padding: "16px" }}>
        {filteredData.map((item) => {
           const isSelected = selectedItem?.code === item.code;
          const isChecked = selectedCodes.includes(item.code);

          return (
            <div key={item.code}>
               <div
                style={{
                  padding: "16px",
                  marginBottom: "12px",
                  border: `2px solid ${isSelected ? "#007bff" : isChecked ? "#28a745" : "#e9ecef"}`,
                  borderRadius: "12px",
                  background: isSelected ? "#f0f8ff" : isChecked ? "#f0fff4" : "white",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: isSelected
                    ? "0 4px 12px rgba(0,123,255,0.15)"
                    : isChecked
                    ? "0 4px 12px rgba(40,167,69,0.15)"
                    : "0 2px 4px rgba(0,0,0,0.1)",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  if (!isSelected && !isChecked) {
                    (e.currentTarget as HTMLElement).style.borderColor = "#007bff";
                    (e.currentTarget as HTMLElement).style.background = "#f8f9fa";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected && !isChecked) {
                    (e.currentTarget as HTMLElement).style.borderColor = "#e9ecef";
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
                 
                    <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleCheckboxChange(item)}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      width: "16px",
                      height: "16px",
                      cursor: "pointer",
                    }}
                  />
                  

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
