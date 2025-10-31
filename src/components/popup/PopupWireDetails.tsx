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
  if (!popupWire) return null;

  // ---------- Internal CSS Styles ----------
  const containerStyle: React.CSSProperties = {
    position: "absolute",
    top: 0, // start from the top of SVG
    right: 0, // stick to top-right corner
    width: "350px",
    height: "90%", // same height as SVG
    background: "#ffffff",
    borderRadius: "12px 0 0 12px",
    boxShadow: "0px 6px 24px rgba(0,0,0,0.15)",
    padding: "24px",
    zIndex: 1000,
    overflowY: "auto", // scrollable if content too long
    fontFamily: "'Segoe UI', Arial, sans-serif",
    lineHeight: "1.6",
  };

  const headerStyle: React.CSSProperties = {
    borderBottom: "3px solid #007bff",
    paddingBottom: "10px",
    marginBottom: "20px",
    color: "#333",
    fontSize: "20px",
    fontWeight: "bold",
    textAlign: "center",
  };

  const tableStyle: React.CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "24px",
    fontSize: "14px",
  };

  const thStyle: React.CSSProperties = {
    border: "1px solid #ddd",
    padding: "10px",
    fontWeight: 600,
    backgroundColor: "#007bff",
    color: "white",
  };

  const tdLabelStyle: React.CSSProperties = {
    fontWeight: 600,
    padding: "10px 8px",
    backgroundColor: "#f8f9fa",
    color: "#555",
    border: "1px solid #ddd",
  };

  const tdValueStyle: React.CSSProperties = {
    padding: "10px 8px",
    color: "#333",
    border: "1px solid #ddd",
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
      <h3 style={headerStyle}>Wire Details</h3>

      {/* WIRE DETAILS TABLE */}
      <table style={tableStyle}>
        <tbody>
          <tr>
            <td style={tdLabelStyle}>Wire Color</td>
            <td style={tdValueStyle}>
              {popupWire.color ||
                popupWire.wire?.wireDetails?.wireColor ||
                "N/A"}
            </td>
          </tr>

          {popupWire.wire?.wireDetails?.circuitNumber && (
            <tr>
              <td style={tdLabelStyle}>Circuit Number</td>
              <td style={tdValueStyle}>
                {popupWire.wire.wireDetails.circuitNumber}
              </td>
            </tr>
          )}

          {popupWire.wire?.wireDetails?.wireSize && (
            <tr>
              <td style={tdLabelStyle}>Wire Size</td>
              <td style={tdValueStyle}>
                {popupWire.wire.wireDetails.wireSize} mm
              </td>
            </tr>
          )}

          {popupWire.wire?.wireDetails?.wireLength !== undefined &&
            popupWire.wire?.wireDetails?.wireLength !== null &&
            popupWire.wire?.wireDetails?.wireLength !== 0 && (
              <tr>
                <td style={tdLabelStyle}>Wire Length</td>
                <td style={tdValueStyle}>
                  {popupWire.wire.wireDetails.wireLength} mm
                </td>
              </tr>
            )}


          {popupWire.wire?.wireDetails?.wireType && (
            <tr>
              <td style={tdLabelStyle}>Wire Type</td>
              <td style={tdValueStyle}>
                {popupWire.wire.wireDetails.wireType}
              </td>
            </tr>
          )}

          {popupWire.wire?.wireDetails?.twistId && (
            <tr>
              <td style={tdLabelStyle}>Twist ID</td>
              <td style={tdValueStyle}>
                {popupWire.wire.wireDetails.twistId}
              </td>
            </tr>
          )}

          {popupWire.wire?.wireDetails?.shieldId && (
            <tr>
              <td style={tdLabelStyle}>Shield ID</td>
              <td style={tdValueStyle}>
                {popupWire.wire.wireDetails.shieldId}
              </td>
            </tr>
          )}

          {/* Wire Option */}
          {popupWire.wire?.wireDetails?.wireOption && (
            <tr>
              <td style={tdLabelStyle}>Wire Option</td>
              <td style={tdValueStyle}>{popupWire.wire.wireDetails.wireOption}</td>
            </tr>
          )}

          {/* Mark */}
          {popupWire.wire?.wireDetails?.mark && (
            <tr>
              <td style={tdLabelStyle}>Mark</td>
              <td style={tdValueStyle}>{popupWire.wire.wireDetails.mark}</td>
            </tr>
          )}


          {popupWire.fromComponent?.harness_name && (
            <tr>
              <td style={tdLabelStyle}>Harness Name</td>
              <td style={tdValueStyle}>
                {popupWire.fromComponent.harness_name}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* CONNECTION DETAILS */}
      <h3 style={{ ...headerStyle, fontSize: "18px" }}>Connection Details</h3>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Property</th>
            <th style={thStyle}>From</th>
            <th style={thStyle}>To</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdLabelStyle}>Component</td>
            <td style={tdValueStyle}>
              {popupWire.fromComponent?.label ||
                popupWire.wire?.wireDetails?.from?.devName ||
                popupWire.wire?.from?.componentId ||
                "N/A"}
            </td>
            <td style={tdValueStyle}>
              {popupWire.toComponent?.label ||
                popupWire.wire?.wireDetails?.to?.devName ||
                popupWire.wire?.to?.componentId ||
                "N/A"}
            </td>
          </tr>

          <tr>
            <td style={tdLabelStyle}>Connector</td>
            <td style={tdValueStyle}>
              {popupWire.fromConnector?.label ||
                popupWire.wire?.wireDetails?.from?.connectorNumber ||
                popupWire.wire?.from?.connectorId ||
                "N/A"}
            </td>
            <td style={tdValueStyle}>
              {popupWire.toConnector?.label ||
                popupWire.wire?.wireDetails?.to?.connectorNumber ||
                popupWire.wire?.to?.connectorId ||
                "N/A"}
            </td>
          </tr>

          <tr>
            <td style={tdLabelStyle}>Connector Part Number</td>
            <td style={tdValueStyle}>
              {popupWire.wire?.wireDetails?.from?.connPartNumber || "N/A"}
            </td>
            <td style={tdValueStyle}>
              {popupWire.wire?.wireDetails?.to?.connPartNumber || "N/A"}
            </td>
          </tr>

          <tr>
            <td style={tdLabelStyle}>Terminal Part Number</td>
            <td style={tdValueStyle}>
              {popupWire.wire?.wireDetails?.from?.termPartNo || "N/A"}
            </td>
            <td style={tdValueStyle}>
              {popupWire.wire?.wireDetails?.to?.termPartNo || "N/A"}
            </td>
          </tr>

          <tr>
            <td style={tdLabelStyle}>Seal Part Number</td>
            <td style={tdValueStyle}>
              {popupWire.wire?.wireDetails?.from?.sealPartNo || "N/A"}
            </td>
            <td style={tdValueStyle}>
              {popupWire.wire?.wireDetails?.to?.sealPartNo || "N/A"}
            </td>
          </tr>

          <tr>
            <td style={tdLabelStyle}>Gender</td>
            <td style={tdValueStyle}>
              {popupWire.fromConnector?.gender ||
                popupWire.wire?.from?.gender ||
                "N/A"}
            </td>
            <td style={tdValueStyle}>
              {popupWire.toConnector?.gender ||
                popupWire.wire?.to?.gender ||
                "N/A"}
            </td>
          </tr>

          <tr>
            <td style={tdLabelStyle}>Cavity</td>
            <td style={tdValueStyle}>
              {popupWire.wire?.wireDetails?.from?.cavity ||
                popupWire.wire?.from?.cavity ||
                "N/A"}
            </td>
            <td style={tdValueStyle}>
              {popupWire.wire?.wireDetails?.to?.cavity ||
                popupWire.wire?.to?.cavity ||
                "N/A"}
            </td>
          </tr>
        </tbody>
      </table>

      {/* CLOSE BUTTON */}
      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <button
          onClick={onClose}
          style={closeButtonStyle}
          onMouseOver={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.transform =
            "scale(1.05)")
          }
          onMouseOut={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.transform =
            "scale(1)")
          }
        >
          Close
        </button>
      </div>
    </div>
  );
}
