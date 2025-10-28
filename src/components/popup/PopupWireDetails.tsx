// src/components/Schematic/PopupWireDetails.tsx
import React from "react";
import { WirePopupType } from "../Schematic/SchematicTypes";

interface PopupWireDetailsProps {
  popupWire: WirePopupType | null;
  onClose: (e: React.MouseEvent) => void;
}

export default function PopupWireDetails({
  popupWire,
  onClose,
}: PopupWireDetailsProps) {
  if (!popupWire) return null; // Don't render anything if no wire is selected

  return (
    <div
      style={{
        position: "fixed",
        top: "51%",
        right: "20px",
        transform: "translateY(-50%)",
        width: "420px",
        height: "600px",
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
          borderBottom: "2px solid #ccc",
          paddingBottom: "8px",
          marginBottom: "12px",
        }}
      >
        Wire Details
      </h3>

      {/* FIRST TABLE: WIRE DETAILS */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "20px",
          fontSize: "14px",
        }}
      >
        <tbody>
          <tr>
            <td style={{ fontWeight: "bold", padding: "6px", width: "45%" }}>
              Harness Name
            </td>
            <td style={{ padding: "6px" }}>
              {popupWire.fromComponent?.harness_name || "N/A"}
            </td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold", padding: "6px" }}>
              Harness Part Number
            </td>
            <td style={{ padding: "6px" }}>
              {popupWire.fromComponent?.harnessPartNumber || "N/A"}
            </td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold", padding: "6px" }}>Color</td>
            <td style={{ padding: "6px" }}>
              {popupWire.connections?.[0]?.color ||
                popupWire.wire?.color ||
                "-"}
            </td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold", padding: "6px" }}>Size</td>
            <td style={{ padding: "6px" }}>
              {popupWire.wire?.wireDetails?.wireSize || "N/A"}
            </td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold", padding: "6px" }}>Length</td>
            <td style={{ padding: "6px" }}>
              {popupWire.wire?.wireDetails?.wireLength || "N/A"}
            </td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold", padding: "6px" }}>Signal Name</td>
            <td style={{ padding: "6px" }}>
              {/* {popupWire.wire?.signalName ||
                popupWire.wire?.wireDetails?.devName ||
                "N/A"} */}
            </td>
          </tr>
        </tbody>
      </table>

      {/* SECOND TABLE: CONNECTION DETAILS */}
      <h3
        style={{
          borderBottom: "2px solid #ccc",
          paddingBottom: "8px",
          marginBottom: "10px",
        }}
      >
        Connects To
      </h3>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "14px",
          textAlign: "center",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f7f7f7" }}>
            <th style={{ border: "1px solid #ccc", padding: "6px" }}></th>
            <th style={{ border: "1px solid #ccc", padding: "6px" }}>From</th>
            <th style={{ border: "1px solid #ccc", padding: "6px" }}>To</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              style={{
                border: "1px solid #ccc",
                padding: "6px",
                fontWeight: "bold",
              }}
            >
              Component
            </td>
            <td style={{ border: "1px solid #ccc", padding: "6px" }}>
              {popupWire.fromComponent?.label ||
                popupWire.wire?.from?.componentId}
            </td>
            <td style={{ border: "1px solid #ccc", padding: "6px" }}>
              {popupWire.toComponent?.label ||
                popupWire.wire?.to?.componentId}
            </td>
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid #ccc",
                padding: "6px",
                fontWeight: "bold",
              }}
            >
              Connector
            </td>
            <td style={{ border: "1px solid #ccc", padding: "6px" }}>
              {popupWire.fromConnector?.label ||
                popupWire.wire?.from?.connectorId}
            </td>
            <td style={{ border: "1px solid #ccc", padding: "6px" }}>
              {popupWire.toConnector?.label ||
                popupWire.wire?.to?.connectorId}
            </td>
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid #ccc",
                padding: "6px",
                fontWeight: "bold",
              }}
            >
              Gender
            </td>
            <td style={{ border: "1px solid #ccc", padding: "6px" }}>
              {popupWire.fromConnector?.gender ||
                popupWire.wire?.from?.gender ||
                "-"}
            </td>
            <td style={{ border: "1px solid #ccc", padding: "6px" }}>
              {popupWire.toConnector?.gender ||
                popupWire.wire?.to?.gender ||
                "-"}
            </td>
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid #ccc",
                padding: "6px",
                fontWeight: "bold",
              }}
            >
              Cavity
            </td>
            <td style={{ border: "1px solid #ccc", padding: "6px" }}>
              {popupWire.wire?.from?.cavity}
            </td>
            <td style={{ border: "1px solid #ccc", padding: "6px" }}>
              {popupWire.wire?.to?.cavity}
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
            color: "white",
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
