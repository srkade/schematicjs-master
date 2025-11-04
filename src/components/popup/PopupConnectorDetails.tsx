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
  if (!popupConnector) return null;

  // ---------- Internal CSS Styles ----------
  const containerStyle: React.CSSProperties = {
    position: "absolute",
    top: 0, // starts from top of SVG
    right: 0, // sticks to top-right
    width: "350px",
    height: "65%", // same height as SVG container
    background: "#ffffff",
    borderRadius: "12px 0 0 12px",
    boxShadow: "0px 6px 24px rgba(0,0,0,0.15)",
    padding: "24px",
    zIndex: 1000,
    overflowY: "auto", // scrollable content
    fontFamily: "'Segoe UI', Arial, sans-serif",
    lineHeight: "1.6",
  };

  const headerContainerStyle: React.CSSProperties = {
    position: "sticky",
    top: 0,
    background: "#fff",
    zIndex: 2,
    padding: "16px 16px 10px 16px",
    borderBottom: "3px solid #007bff", // Full-width blue line
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexShrink: 0,
  };
  const headerTitleStyle: React.CSSProperties = {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
    margin: 0,
  };
  const headerStyle: React.CSSProperties = {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
    margin: 0,
    borderBottom: "3px solid #007bff", // Blue line only below text
    paddingBottom: "6px",
    flexGrow: 1,
  };

  const closeIconStyle: React.CSSProperties = {
  //  backgroundColor: "red",
    color: "black",
    border: "none",
    width: "30px",
    height: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "transform 0.2s ease",
  };
  const tableStyle: React.CSSProperties = {
    width: "100%",
    fontSize: "14px",
    borderCollapse: "collapse",
  };

  const labelCell: React.CSSProperties = {
    fontWeight: 600,
    padding: "10px 8px",
    backgroundColor: "#f8f9fa",
    color: "#555",
    borderBottom: "1px solid #e0e0e0",
    width: "45%",
  };

  const valueCell: React.CSSProperties = {
    padding: "10px 8px",
    color: "#333",
    borderBottom: "1px solid #e0e0e0",
  };

  const closeButtonStyle: React.CSSProperties = {
    background: "linear-gradient(135deg, #007bff 0%, #0056b3 100%)",
    color: "#fff",
    border: "none",
    padding: "10px 24px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 600,
    boxShadow: "0px 3px 8px rgba(0,123,255,0.3)",
    transition: "all 0.3s ease",
  };

  // ---------- Component JSX ----------
  return (
    <div style={containerStyle}>

      {/* HEADER */}
      {/* HEADER SECTION */}
      <div style={headerContainerStyle}>
        <h3 style={headerTitleStyle}>Connector Details</h3>
        <button
          onClick={onClose}
          style={closeIconStyle}
          title="Close"
          onMouseOver={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1.2)")
          }
          onMouseOut={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1)")
          }
        >
          ×
        </button>
      </div>


      {/* DETAILS TABLE */}
      <table style={tableStyle}>
        <tbody>
          {popupConnector.componentCode && (
            <tr>
              <td style={labelCell}>Component Code</td>
              <td style={valueCell}>{popupConnector.componentCode}</td>
            </tr>
          )}
          {popupConnector.connectorCode && (
            <tr>
              <td style={labelCell}>Connector Code</td>
              <td style={valueCell}>{popupConnector.connectorCode}</td>
            </tr>
          )}
          {popupConnector.label && (
            <tr>
              <td style={labelCell}>Label</td>
              <td style={valueCell}>{popupConnector.label}</td>
            </tr>
          )}
          {popupConnector.harnessName && (
            <tr>
              <td style={labelCell}>Harness Name</td>
              <td style={valueCell}>{popupConnector.harnessName}</td>
            </tr>
          )}
          {popupConnector.partNumber && (
            <tr>
              <td style={labelCell}>Connector Part Number</td>
              <td style={valueCell}>{popupConnector.partNumber}</td>
            </tr>
          )}
          {popupConnector.gender && (
            <tr>
              <td style={labelCell}>Gender</td>
              <td style={valueCell}>{popupConnector.gender}</td>
            </tr>
          )}
          {popupConnector.cavityCount && (
            <tr>
              <td style={labelCell}>Cavity Count</td>
              <td style={valueCell}>{popupConnector.cavityCount}</td>
            </tr>
          )}
          {popupConnector.color && (
            <tr>
              <td style={labelCell}>Color</td>
              <td style={valueCell}>{popupConnector.color}</td>
            </tr>
          )}
          {popupConnector.connectorType && (
            <tr>
              <td style={labelCell}>Connector Type</td>
              <td style={valueCell}>{popupConnector.connectorType}</td>
            </tr>
          )}
          {popupConnector.manufacturer && (
            <tr>
              <td style={labelCell}>Manufacturer</td>
              <td style={valueCell}>{popupConnector.manufacturer}</td>
            </tr>
          )}
          {popupConnector.termPartNo && (
            <tr>
              <td style={labelCell}>Terminal Part Number</td>
              <td style={valueCell}>{popupConnector.termPartNo}</td>
            </tr>
          )}
          {popupConnector.sealPartNo && (
            <tr>
              <td style={labelCell}>Seal Part Number</td>
              <td style={valueCell}>{popupConnector.sealPartNo}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
