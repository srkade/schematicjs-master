import React from "react";
import { DashboardItem } from "../App";

interface LeftPanelProps {
  activeTab: string;
  data: DashboardItem[];
  onItemSelect: (item: DashboardItem) => void;
  selectedItem: DashboardItem | null;
}

const getItemIcon = (type: string) => {
  const iconMap: { [key: string]: string } = {
    'Sensor': '📡',
    'Switch': '🔘',
    'Transistor': '🔌',
    'Instrument': '🖥️',
    'Splice': '🔗',
  };
  return iconMap[type] || '🔧';
};

export default function LeftPanel({ activeTab, data, onItemSelect, selectedItem }: LeftPanelProps) {
  return (
    <div style={{
      width: "320px",
      background: "white",
      borderRight: "1px solid #e9ecef",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden"
    }}>
      {/* Panel Header */}
      <div style={{
        padding: "20px",
        borderBottom: "1px solid #e9ecef"
      }}>
        <h2 style={{
          margin: "0 0 16px 0",
          color: "#212529",
          fontSize: "18px",
          fontWeight: "600",
          textTransform: "capitalize"
        }}>
          {activeTab.replace(/([A-Z])/g, ' $1').trim()}
        </h2>
        
        <div style={{ position: "relative" }}>
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            style={{
              width: "100%",
              padding: "10px 12px 10px 40px",
              border: "1px solid #ced4da",
              borderRadius: "8px",
              fontSize: "14px",
              background: "#f8f9fa",
              color: "#495057"
            }}
          />
          <span style={{
            position: "absolute",
            left: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#6c757d",
            fontSize: "16px"
          }}>
            🔍
          </span>
        </div>
      </div>

      {/* Items List */}
      <div style={{
        flex: 1,
        overflow: "auto",
        padding: "16px"
      }}>
        {data.map((item) => (
          <div
            key={item.code}
            onClick={() => onItemSelect(item)}
            style={{
              padding: "16px",
              marginBottom: "12px",
              border: `2px solid ${selectedItem?.code === item.code ? '#007bff' : '#e9ecef'}`,
              borderRadius: "12px",
              background: selectedItem?.code === item.code ? '#f0f8ff' : 'white',
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: selectedItem?.code === item.code ? '0 4px 12px rgba(0,123,255,0.15)' : '0 2px 4px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => {
              if (selectedItem?.code !== item.code) {
                (e.currentTarget as HTMLElement).style.borderColor = '#007bff';
                (e.currentTarget as HTMLElement).style.background = '#f8f9fa';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedItem?.code !== item.code) {
                (e.currentTarget as HTMLElement).style.borderColor = '#e9ecef';
                (e.currentTarget as HTMLElement).style.background = 'white';
              }
            }}
          >
            <div style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px"
            }}>
              {/* <div style={{ fontSize: "28px" }}>
                {getItemIcon(item.type)}
              </div> */}
              
              <div style={{ flex: 1 }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "6px"
                }}>
                  <span style={{
                    background: "#e3f2fd",
                    color: "#1565c0",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    fontWeight: "500"
                  }}>
                    {item.code}
                  </span>
                  <span style={{
                    background: "#e8f5e8",
                    color: "#2e7d32",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    fontWeight: "500"
                  }}>
                    {item.status}
                  </span>
                </div>
                
                <h3 style={{
                  margin: "0 0 4px 0",
                  color: "#212529",
                  fontSize: "16px",
                  fontWeight: "600"
                }}>
                  {item.name}
                </h3>
                
                <p style={{
                  margin: "0 0 4px 0",
                  color: "#6c757d",
                  fontSize: "13px"
                }}>
                  {item.type}
                </p>
                
                {item.voltage && (
                  <p style={{
                    margin: "0 0 6px 0",
                    color: "#f57c00",
                    fontSize: "13px",
                    fontWeight: "500"
                  }}>
                    {item.voltage}
                  </p>
                )}
                
                <p style={{
                  margin: 0,
                  color: "#868e96",
                  fontSize: "12px",
                  lineHeight: "1.4"
                }}>
                  
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {data.length === 0 && (
          <div style={{
            padding: "40px 20px",
            textAlign: "center",
            color: "#6c757d"
          }}>
            <p>No {activeTab} available</p>
          </div>
        )}
      </div>
    </div>
  );
}