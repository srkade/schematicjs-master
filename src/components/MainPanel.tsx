import React from "react";
import Schematic from "./Schematic/Schematic";
import {ICC, S4, S9,S8 , B3} from "./Schematic/tests";
import { DashboardItem } from "../App";

interface MainPanelProps {
  selectedItem: DashboardItem | null;
  activeTab: string;
  isMultipleComponents?: boolean;  // <- new optional prop
}


export default function MainPanel({ selectedItem, activeTab }: MainPanelProps) {
  if (!selectedItem) {
    return (
      <div style={{
        flex: 1,
        background: "#f8f9fa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "40px"
      }}>
        <div style={{
          textAlign: "center",
          maxWidth: "400px"
        }}>
          <div style={{
            fontSize: "64px",
            marginBottom: "24px",
            opacity: 0.3
          }}>
            🔧
          </div>
          <h2 style={{
            color: "#495057",
            fontSize: "24px",
            fontWeight: "600",
            marginBottom: "12px"
          }}>
            Select a Component
          </h2>
          <p style={{
            color: "#6c757d",
            fontSize: "16px",
            lineHeight: "1.5"
          }}>
            Choose a component from the left panel to view its schematic diagram with interactive controls.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      flex: 1,
      background: "#f8f9fa",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden"
    }}>
      {/* Header */}
      

      {/* Schematic Viewer */}
      <div style={{
        flex: 1,
        padding: "5px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column"
      }}>
        <div style={{
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          flex: 1,
          display: "flex",
          flexDirection: "column"
        }}>
          <div style={{
            background: "#f8f9fa",
            borderBottom: "1px solid #e9ecef",
            padding: "3px 5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <h3 style={{
              margin: 0,
              color: "#495057",
              fontSize: "16px",
              fontWeight: "600"
            }}>
              Schematic Viewer
            </h3>
          </div>
          
          <div style={{
            flex: 1,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Schematic data={selectedItem.schematicData} />
          </div>
        </div>
      </div>
    </div>
  );
}