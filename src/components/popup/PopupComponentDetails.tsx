// src/components/Schematic/PopupComponentDetails.tsx
import React from "react";
import { ComponentType } from "../Schematic/SchematicTypes";

interface PopupComponentDetailsProps {
  popupComponent: ComponentType | null;
  onClose: () => void;
}

export default function PopupComponentDetails({
  popupComponent,
  onClose,
}: PopupComponentDetailsProps) {
  if (!popupComponent) return null; // render nothing if no component selected

  return (
    <div
      style={{
        position: "fixed",
        top: "30%",
        right: "20px",
        transform: "translate(0%, -30%)",
        width: "480px",
        maxHeight: "700px",
        background: "#ffffff",
        border: "1px solid #ddd",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0px 6px 24px rgba(0,0,0,0.15)",
        zIndex: 1000,
        overflowY: "auto",
        fontFamily: "'Segoe UI', Arial, sans-serif",
      }}
    >
      {/* HEADER */}
      <h3
        style={{
          textAlign: "center",
          color: "#333",
          borderBottom: "3px solid #007bff",
          paddingBottom: "10px",
          marginBottom: "16px",
          fontSize: "20px",
        }}
      >
        Component Details
      </h3>

      {/* COMPONENT DETAILS TABLE */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "14px",
          marginBottom: "10px",
        }}
      >
        <tbody>
          {/* ID */}
          {popupComponent.id && (
            <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
              <td
                style={{
                  fontWeight: "600",
                  padding: "10px 8px",
                  width: "45%",
                  backgroundColor: "#f8f9fa",
                  color: "#555",
                }}
              >
                ID
              </td>
              <td style={{ padding: "10px 8px", color: "#333" }}>
                {popupComponent.id}
              </td>
            </tr>
          )}

          {/* Engineering Component Name */}
          {popupComponent.engineering_component_name && (
            <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
              <td
                style={{
                  fontWeight: "600",
                  padding: "10px 8px",
                  backgroundColor: "#f8f9fa",
                  color: "#555",
                }}
              >
                Engineering Component Name
              </td>
              <td style={{ padding: "10px 8px", color: "#333" }}>
                {popupComponent.engineering_component_name}
              </td>
            </tr>
          )}

          {/* Category */}
          {popupComponent.category && (
            <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
              <td
                style={{
                  fontWeight: "600",
                  padding: "10px 8px",
                  backgroundColor: "#f8f9fa",
                  color: "#555",
                }}
              >
                Category
              </td>
              <td style={{ padding: "10px 8px", color: "#333" }}>
                {popupComponent.category}
              </td>
            </tr>
          )}

          {/* Shape */}
          {popupComponent.shape && (
            <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
              <td
                style={{
                  fontWeight: "600",
                  padding: "10px 8px",
                  backgroundColor: "#f8f9fa",
                  color: "#555",
                }}
              >
                Shape
              </td>
              <td
                style={{
                  padding: "10px 8px",
                  color: "#333",
                  textTransform: "capitalize",
                }}
              >
                {popupComponent.shape}
              </td>
            </tr>
          )}

          {/* Engineering Manufacturer */}
          {popupComponent.engineering_manufacturer && (
            <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
              <td
                style={{
                  fontWeight: "600",
                  padding: "10px 8px",
                  backgroundColor: "#f8f9fa",
                  color: "#555",
                }}
              >
                Engineering Manufacturer
              </td>
              <td style={{ padding: "10px 8px", color: "#333" }}>
                {popupComponent.engineering_manufacturer}
              </td>
            </tr>
          )}

          {/* Manufacturer */}
          {popupComponent.manufacturer && (
            <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
              <td
                style={{
                  fontWeight: "600",
                  padding: "10px 8px",
                  backgroundColor: "#f8f9fa",
                  color: "#555",
                }}
              >
                Manufacturer
              </td>
              <td style={{ padding: "10px 8px", color: "#333" }}>
                {popupComponent.manufacturer}
              </td>
            </tr>
          )}

          {/* Primary Part Number */}
          {popupComponent.primary_part_number && (
            <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
              <td
                style={{
                  fontWeight: "600",
                  padding: "10px 8px",
                  backgroundColor: "#f8f9fa",
                  color: "#555",
                }}
              >
                Primary Part Number
              </td>
              <td style={{ padding: "10px 8px", color: "#333" }}>
                {popupComponent.primary_part_number}
              </td>
            </tr>
          )}

          {/* Connector Part Number */}
          {popupComponent.connector_part_number && (
            <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
              <td
                style={{
                  fontWeight: "600",
                  padding: "10px 8px",
                  backgroundColor: "#f8f9fa",
                  color: "#555",
                }}
              >
                Connector Part Number
              </td>
              <td style={{ padding: "10px 8px", color: "#333" }}>
                {popupComponent.connector_part_number}
              </td>
            </tr>
          )}

          {/* Harness Name */}
          {popupComponent.harness_name && (
            <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
              <td
                style={{
                  fontWeight: "600",
                  padding: "10px 8px",
                  backgroundColor: "#f8f9fa",
                  color: "#555",
                }}
              >
                Harness Name
              </td>
              <td style={{ padding: "10px 8px", color: "#333" }}>
                {popupComponent.harness_name}
              </td>
            </tr>
          )}

          {/* Component Type */}
          {popupComponent.component_type && (
            <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
              <td
                style={{
                  fontWeight: "600",
                  padding: "10px 8px",
                  backgroundColor: "#f8f9fa",
                  color: "#555",
                }}
              >
                Component Type
              </td>
              <td style={{ padding: "10px 8px", color: "#333" }}>
                {popupComponent.component_type}
              </td>
            </tr>
          )}

          {/* Connector Type */}
          {popupComponent.connector_type && (
            <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
              <td
                style={{
                  fontWeight: "600",
                  padding: "10px 8px",
                  backgroundColor: "#f8f9fa",
                  color: "#555",
                }}
              >
                Connector Type
              </td>
              <td style={{ padding: "10px 8px", color: "#333" }}>
                {popupComponent.connector_type}
              </td>
            </tr>
          )}

          {/* Gender */}
          {popupComponent.gender && (
            <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
              <td
                style={{
                  fontWeight: "600",
                  padding: "10px 8px",
                  backgroundColor: "#f8f9fa",
                  color: "#555",
                }}
              >
                Gender
              </td>
              <td style={{ padding: "10px 8px", color: "#333" }}>
                {popupComponent.gender}
              </td>
            </tr>
          )}

          {/* Remove Status */}
          {popupComponent.remove !== undefined && (
            <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
              <td
                style={{
                  fontWeight: "600",
                  padding: "10px 8px",
                  backgroundColor: "#f8f9fa",
                  color: "#555",
                }}
              >
                Remove Status
              </td>
              <td style={{ padding: "10px 8px", color: "#333" }}>
                {popupComponent.remove ? "Yes" : "No"}
              </td>
            </tr>
          )}

          {/* Connectors */}
          {popupComponent.connectors && popupComponent.connectors.length > 0 && (
            <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
              <td
                style={{
                  fontWeight: "600",
                  padding: "10px 8px",
                  backgroundColor: "#f8f9fa",
                  color: "#555",
                }}
              >
                Connectors
              </td>
              <td style={{ padding: "10px 8px", color: "#333" }}>
                {popupComponent.connectors.map((c) => c.label).join(", ")}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* CLOSE BUTTON */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={onClose}
          style={{
            background: "linear-gradient(135deg, #007bff 0%, #0056b3 100%)",
            color: "white",
            border: "none",
            padding: "10px 24px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            boxShadow: "0px 3px 8px rgba(0,123,255,0.3)",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)")
          }
          onMouseOut={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1)")
          }
        >
          Close
        </button>
      </div>
    </div>
  );
}


