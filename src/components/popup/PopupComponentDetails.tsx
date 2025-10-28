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
        background: "white",
        border: "1px solid black",
        padding: "8px",
        borderRadius: "6px",
        zIndex: 1000,
      }}
    >
      <h4>{popupComponent.label}</h4>
      <p>
        Category: {popupComponent.category}
        <br />
        Connectors:{" "}
        {popupComponent.connectors.map((c) => c.label).join(", ")}
      </p>
      <button
        onClick={onClose}
        style={{
          marginTop: "8px",
          background: "#007bff",
          color: "#fff",
          border: "none",
          padding: "6px 12px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Close
      </button>
    </div>
  );
}
