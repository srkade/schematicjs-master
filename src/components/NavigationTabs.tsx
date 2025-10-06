import React from "react";

interface NavigationTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

const tabs = [
  { id: "components", label: "Components", icon: "🔧" },
  { id: "controllers", label: "Controllers", icon: "⚙️" },
  { id: "systems", label: "Systems", icon: "🔗" },
  { id: "voltage", label: "Voltage Supply", icon: "⚡" },
  { id: "dtc", label: "DTC", icon: "⚠️" },
  { id: "signals", label: "Signals", icon: "📶" },
  { id: "harnesses", label: "Harnesses", icon: "🔌" },
];

export default function NavigationTabs({ activeTab, onTabChange,onLogout }: NavigationTabsProps) {
  return (
    <nav style={{
      background: "white",
      borderBottom: "1px solid #e9ecef",
      padding: "0 24px",
      display: "flex",
      gap: "2px"
    }}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 16px",
            border: "none",
            background: activeTab === tab.id ? "#f8f9fa" : "transparent",
            color: activeTab === tab.id ? "#495057" : "#6c757d",
            borderBottom: activeTab === tab.id ? "3px solid #007bff" : "3px solid transparent",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            borderRadius: "8px 8px 0 0",
            transition: "all 0.2s ease"
          }}
          onMouseEnter={(e) => {
            if (activeTab !== tab.id) {
              (e.target as HTMLElement).style.background = "#f8f9fa";
              (e.target as HTMLElement).style.color = "#495057";
            }
          }}
          onMouseLeave={(e) => {
            if (activeTab !== tab.id) {
              (e.target as HTMLElement).style.background = "transparent";
              (e.target as HTMLElement).style.color = "#6c757d";
            }
          }}
        >
          <span>{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
      <button
        onClick={onLogout}
        style={{
        background: "#dc3545",
        color: "white",
        border: "none",
        padding: "8px 16px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "14px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        marginLeft: "auto",
      }}
       >
        Logout
       </button>
    </nav>
  );
}