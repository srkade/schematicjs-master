// src/components/Schematic/PopupConnectorDetails.tsx
import React from "react";
import { PopupConnectorType } from "../Schematic/SchematicTypes";

interface PopupConnectorDetailsProps {
  popupConnector: PopupConnectorType | null;
  onClose: (e: React.MouseEvent) => void;
}

export default function PopupConnectorDetails({
  popupConnector,
  onClose,
}: PopupConnectorDetailsProps) {
  if (!popupConnector) return null; // Don't render anything if no connector selected

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        right: "20px",
        transform: "translateY(-50%)",
        width: "400px",
        height: "auto",
        maxHeight: "600px",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0px 4px 20px rgba(0,0,0,0.25)",
        padding: "20px",
        zIndex: 1000,
        overflowY: "auto",
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
      }}
    >
      {/* HEADER */}
      <h3
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          marginBottom: "16px",
        }}
      >
        Connector Details
      </h3>

      {/* DETAILS TABLE */}
      <table style={{ width: "100%", fontSize: "14px" }}>
        <tbody>
          <tr>
            <td
              style={{
                fontWeight: "bold",
                padding: "6px 8px",
                width: "40%",
              }}
            >
              Component Code
            </td>
            <td style={{ padding: "6px 8px" }}>
              {popupConnector.componentCode || "-"}
            </td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold", padding: "6px 8px" }}>
              Connector Code
            </td>
            <td style={{ padding: "6px 8px" }}>
              {popupConnector.connectorCode || "-"}
            </td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold", padding: "6px 8px" }}>
              Harness Name
            </td>
            <td style={{ padding: "6px 8px" }}>
              {popupConnector.harnessName || "-"}
            </td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold", padding: "6px 8px" }}>
              Connector Part Number
            </td>
            <td style={{ padding: "6px 8px" }}>
              {popupConnector.partNumber || "-"}
            </td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold", padding: "6px 8px" }}>Gender</td>
            <td style={{ padding: "6px 8px" }}>
              {popupConnector.gender || "-"}
            </td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold", padding: "6px 8px" }}>
              Cavity Count
            </td>
            <td style={{ padding: "6px 8px" }}>
              {popupConnector.cavityCount || "-"}
            </td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold", padding: "6px 8px" }}>Color</td>
            <td style={{ padding: "6px 8px" }}>
              {popupConnector.color || "-"}
            </td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold", padding: "6px 8px" }}>
              Connector Type
            </td>
            <td style={{ padding: "6px 8px" }}>
              {popupConnector.connectorType || "-"}
            </td>
          </tr>
        </tbody>
      </table>

      {/* CLOSE BUTTON */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={onClose}
          style={{
            background: "#007bff",
            color: "#fff",
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
