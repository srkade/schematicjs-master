/**
 * SchematicExport.ts - CORRECTED VERSION
 * Module for capturing and exporting schematic diagrams as PDF
 * Includes high-resolution image capture, component details, and JSON data integration
 * 
 * FIXES APPLIED:
 * 1. SVGSVGElement → HTMLElement type casting for html2canvas
 * 2. Optional chaining with nullish coalescing for undefined properties
 * 3. Import jsPDF with autoTable plugin
 * 4. Type-safe data extraction with fallbacks
 */

import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";
import { SchematicData, ComponentType, ConnectionType, ConnectorType, WireDetailsType } from "./SchematicTypes";

export interface ExportOptions {
  filename?: string;
  includeJSON?: boolean;
  resolution?: number;
  zoom?: number;
}

export interface SchematicExportData {
  projectTitle: string;
  schematicImage: string;
  components: ExportedComponentDetail[];
  wires: ExportedWireDetail[];
  connectors: ExportedConnectorDetail[];
  jsonData: any;
  metadata: ExportMetadata;
}

export interface ExportedComponentDetail {
  id: string;
  label: string;
  category: string;
  engineeringName: string;
  manufacturer: string;
  partNumber: string;
  harnessName: string;
  connectorPartNumber: string;
  gender: string;
  connectors: ConnectorMapping[];
}

export interface ExportedWireDetail {
  circuitNumber: string;
  wireColor: string;
  wireSize: number;
  wireLength: number;
  wireType: string;
  from: {
    component: string;
    connector: string;
    cavity: string;
    partNumber: string;
  };
  to: {
    component: string;
    connector: string;
    cavity: string;
    partNumber: string;
  };
  twistId: string;
  shieldId: string;
  mark: string;
}

export interface ExportedConnectorDetail {
  componentCode: string;
  connectorCode: string;
  label: string;
  harnessName: string;
  partNumber: string;
  gender: string;
  cavityCount: number;
  color: string;
  connectorType: string;
  manufacturer: string;
  terminalPartNumber: string;
  sealPartNumber: string;
}

export interface ConnectorMapping {
  id: string;
  label: string;
  connectionCount: number;
}

export interface ExportMetadata {
  exportDate: string;
  exportTime: string;
  zoomLevel: number;
  totalComponents: number;
  totalWires: number;
  totalConnectors: number;
}

class SchematicExportManager {
  /**
   * Capture SVG element as high-resolution canvas image
   */
  private async captureSVGAsImage(
    svgElement: SVGSVGElement,
    options: ExportOptions = {}
  ): Promise<string> {
    const { resolution = 300, zoom = 1 } = options;

    try {
      // Create a container for rendering
      const container = document.createElement("div");
      container.style.position = "absolute";
      container.style.left = "-9999px";
      container.style.top = "-9999px";

      // Clone the SVG for manipulation
      const svgClone = svgElement.cloneNode(true) as SVGSVGElement;

      // Calculate dimensions based on resolution
      const bbox = svgElement.getBBox();
      const scale = resolution / 96; // 96 DPI to resolution conversion
      const width = bbox.width * scale * zoom;
      const height = bbox.height * scale * zoom;

      svgClone.setAttribute("width", width.toString());
      svgClone.setAttribute("height", height.toString());

      container.appendChild(svgClone);
      document.body.appendChild(container);

      // Convert to canvas with higher resolution
      // Cast SVGElement to HTMLElement for html2canvas compatibility
      const canvas = await html2canvas(svgClone as unknown as HTMLElement, {
        scale: scale * zoom,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      // Convert canvas to base64 PNG
      const imageData = canvas.toDataURL("image/png");

      // Cleanup
      document.body.removeChild(container);

      return imageData;
    } catch (error) {
      console.error("Error capturing SVG as image:", error);
      throw new Error("Failed to capture schematic image");
    }
  }

  /**
   * Extract component details for export
   */
  private extractComponentDetails(
    data: SchematicData,
    connectorConnectionCount: { [id: string]: number }
  ): ExportedComponentDetail[] {
    return data.components.map((comp) => ({
      id: comp.id ?? "",
      label: comp.label ?? "",
      category: comp.category ?? "",
      engineeringName: comp.engineering_component_name ?? "N/A",
      manufacturer: comp.manufacturer ?? "N/A",
      partNumber: comp.primary_part_number ?? "N/A",
      harnessName: comp.harness_name ?? "N/A",
      connectorPartNumber: comp.connector_part_number ?? "N/A",
      gender: comp.gender ?? "N/A",
      connectors: (comp.connectors ?? []).map((conn) => ({
        id: conn.id ?? "",
        label: conn.label ?? "",
        connectionCount: connectorConnectionCount[conn.id] ?? 0,
      })),
    }));
  }

  /**
   * Extract wire details for export
   */
  private extractWireDetails(data: SchematicData): ExportedWireDetail[] {
    return (data.connections ?? []).map((wire) => {
      const wireDetails = wire.wireDetails ?? {};
      const from = (wireDetails as any)?.from ?? {};
      const to = (wireDetails as any)?.to ?? {};

      return {
        circuitNumber: (wireDetails as any)?.circuitNumber ?? "",
        wireColor: (wireDetails as any)?.wireColor ?? wire.color ?? "",
        wireSize: (wireDetails as any)?.wireSize ?? 0,
        wireLength: (wireDetails as any)?.wireLength ?? 0,
        wireType: (wireDetails as any)?.wireType ?? "",
        from: {
          component: from.devName ?? wire.from?.componentId ?? "",
          connector: from.connectorNumber ?? wire.from?.connectorId ?? "",
          cavity: from.cavity ?? wire.from?.cavity ?? "",
          partNumber: from.connPartNumber ?? "",
        },
        to: {
          component: to.devName ?? wire.to?.componentId ?? "",
          connector: to.connectorNumber ?? wire.to?.connectorId ?? "",
          cavity: to.cavity ?? wire.to?.cavity ?? "",
          partNumber: to.connPartNumber ?? "",
        },
        twistId: (wireDetails as any)?.twistId ?? "",
        shieldId: (wireDetails as any)?.shieldId ?? "",
        mark: (wireDetails as any)?.mark ?? "",
      };
    });
  }

  /**
   * Extract connector details for export
   */
  private extractConnectorDetails(data: SchematicData): ExportedConnectorDetail[] {
    const connectorDetails: ExportedConnectorDetail[] = [];
    const processedConnectors = new Set<string>();

    (data.components ?? []).forEach((comp) => {
      (comp.connectors ?? []).forEach((conn) => {
        const connKey = `${comp.id}-${conn.id}`;
        if (!processedConnectors.has(connKey)) {
          connectorDetails.push({
            componentCode: comp.label ?? comp.id ?? "",
            connectorCode: conn.label ?? conn.id ?? "",
            label: conn.label ?? "",
            harnessName: comp.harness_name ?? "N/A",
            partNumber: comp.connector_part_number ?? "N/A",
            gender: (conn as any)?.gender ?? comp.gender ?? "N/A",
            cavityCount: this.calculateCavityCount(conn, data),
            color: (conn as any)?.color ?? "",
            connectorType: comp.connector_type ?? "N/A",
            manufacturer: comp.manufacturer ?? "N/A",
            terminalPartNumber: (conn as any)?.terminal_part_number ?? "",
            sealPartNumber: (conn as any)?.seal_part_number ?? "",
          });
          processedConnectors.add(connKey);
        }
      });
    });

    return connectorDetails;
  }

  /**
   * Calculate cavity count for connector
   */
  private calculateCavityCount(
    connector: ConnectorType,
    data: SchematicData
  ): number {
    const connections = (data.connections ?? []).filter(
      (conn) =>
        conn.from?.connectorId === connector.id ||
        conn.to?.connectorId === connector.id
    );
    return connections.length;
  }

  /**
   * Generate PDF from schematic data
   */
  public async generatePDF(
    svgElement: SVGSVGElement,
    data: SchematicData,
    connectorConnectionCount: { [id: string]: number },
    options: ExportOptions = {}
  ): Promise<void> {
    const {
      filename = "schematic-export.pdf",
      includeJSON = true,
      resolution = 300,
      zoom = 1,
    } = options;

    try {
      // Capture schematic image
      const schematicImage = await this.captureSVGAsImage(svgElement, {
        resolution,
        zoom,
      });

      // Extract all data
      const components = this.extractComponentDetails(
        data,
        connectorConnectionCount
      );
      const wires = this.extractWireDetails(data);
      const connectors = this.extractConnectorDetails(data);

      const metadata: ExportMetadata = {
        exportDate: new Date().toLocaleDateString(),
        exportTime: new Date().toLocaleTimeString(),
        zoomLevel: zoom,
        totalComponents: components.length,
        totalWires: wires.length,
        totalConnectors: connectors.length,
      };

      // Create PDF - Type assertion for autoTable
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      }) as any;

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;

      let yPosition = margin;

      // Title
      pdf.setFontSize(20);
      pdf.text("ELECTRICAL SCHEMATIC DIAGRAM", margin, yPosition);
      yPosition += 10;

      // Metadata
      pdf.setFontSize(10);
      pdf.text(
        `Export Date: ${metadata.exportDate} | Time: ${metadata.exportTime}`,
        margin,
        yPosition
      );
      yPosition += 5;
      pdf.text(
        `Components: ${metadata.totalComponents} | Wires: ${metadata.totalWires} | Connectors: ${metadata.totalConnectors}`,
        margin,
        yPosition
      );
      yPosition += 10;

      // Add schematic image
      const imgWidth = pageWidth - 2 * margin;
      const imgHeight = (imgWidth / 16) * 9; // 16:9 aspect ratio

      pdf.addImage(
        schematicImage,
        "PNG",
        margin,
        yPosition,
        imgWidth,
        imgHeight
      );

      // Add new page for tables
      pdf.addPage();
      yPosition = margin;

      // Components Table
      pdf.setFontSize(14);
      pdf.text("COMPONENT DETAILS", margin, yPosition);
      yPosition += 8;

      const componentRows = components.map((comp) => [
        comp.id,
        comp.label,
        comp.category,
        comp.manufacturer,
        comp.partNumber,
        comp.harnessName,
        comp.connectors.map((c) => c.label).join(", "),
      ]);

      pdf.autoTable({
        startY: yPosition,
        head: [
          [
            "ID",
            "Label",
            "Category",
            "Manufacturer",
            "Part #",
            "Harness",
            "Connectors",
          ],
        ],
        body: componentRows,
        margin: margin,
        fontSize: 8,
        theme: "grid",
        styles: { cellPadding: 2 },
        headStyles: { fillColor: [0, 123, 255], textColor: [255, 255, 255] },
      });

      yPosition = pdf.lastAutoTable.finalY + 10;

      // Wires Table (on new page if needed)
      if (yPosition > pageHeight - 50) {
        pdf.addPage();
        yPosition = margin;
      }

      pdf.setFontSize(14);
      pdf.text("WIRE CONNECTIONS", margin, yPosition);
      yPosition += 8;

      const wireRows = wires.map((wire) => [
        wire.circuitNumber,
        wire.wireColor,
        wire.wireSize.toString(),
        wire.wireLength.toString(),
        wire.from.component,
        wire.to.component,
        wire.from.cavity,
        wire.to.cavity,
        wire.wireType,
      ]);

      pdf.autoTable({
        startY: yPosition,
        head: [
          [
            "Circuit",
            "Color",
            "Size",
            "Length",
            "From",
            "To",
            "From Cavity",
            "To Cavity",
            "Type",
          ],
        ],
        body: wireRows,
        margin: margin,
        fontSize: 8,
        theme: "grid",
        styles: { cellPadding: 2 },
        headStyles: { fillColor: [40, 167, 69], textColor: [255, 255, 255] },
      });

      yPosition = pdf.lastAutoTable.finalY + 10;

      // Connectors Table (on new page if needed)
      if (yPosition > pageHeight - 50) {
        pdf.addPage();
        yPosition = margin;
      }

      pdf.setFontSize(14);
      pdf.text("CONNECTOR DETAILS", margin, yPosition);
      yPosition += 8;

      const connectorRows = connectors.map((conn) => [
        conn.componentCode,
        conn.connectorCode,
        conn.partNumber,
        conn.gender,
        conn.cavityCount.toString(),
        conn.manufacturer,
        conn.harnessName,
      ]);

      pdf.autoTable({
        startY: yPosition,
        head: [
          [
            "Component",
            "Connector",
            "Part #",
            "Gender",
            "Cavities",
            "Manufacturer",
            "Harness",
          ],
        ],
        body: connectorRows,
        margin: margin,
        fontSize: 8,
        theme: "grid",
        styles: { cellPadding: 2 },
        headStyles: { fillColor: [255, 193, 7], textColor: [0, 0, 0] },
      });

      // Add JSON data if requested
      if (includeJSON) {
        pdf.addPage();
        yPosition = margin;

        pdf.setFontSize(14);
        pdf.text("JSON DATA EXPORT", margin, yPosition);
        yPosition += 8;

        pdf.setFontSize(9);
        const jsonText = JSON.stringify(data, null, 2);
        const splitText = pdf.splitTextToSize(jsonText, pageWidth - 2 * margin);
        pdf.text(splitText, margin, yPosition, { maxWidth: pageWidth - 2 * margin });
      }

      // Save PDF
      pdf.save(filename);
      console.log(`PDF exported successfully: ${filename}`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      throw error;
    }
  }

  /**
   * Export schematic as high-resolution PNG image
   */
  public async exportAsImage(
    svgElement: SVGSVGElement,
    options: ExportOptions = {}
  ): Promise<void> {
    const { filename = "schematic-export.png", resolution = 300 } = options;

    try {
      const imageData = await this.captureSVGAsImage(svgElement, { resolution });

      // Create download link
      const link = document.createElement("a");
      link.href = imageData;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log(`Image exported successfully: ${filename}`);
    } catch (error) {
      console.error("Error exporting image:", error);
      throw error;
    }
  }

  /**
   * Export data as JSON file
   */
  public exportAsJSON(
    data: SchematicData,
    connectorConnectionCount: { [id: string]: number },
    filename: string = "schematic-data.json"
  ): void {
    try {
      const components = this.extractComponentDetails(
        data,
        connectorConnectionCount
      );
      const wires = this.extractWireDetails(data);
      const connectors = this.extractConnectorDetails(data);

      const exportData = {
        metadata: {
          exportDate: new Date().toISOString(),
          totalComponents: components.length,
          totalWires: wires.length,
          totalConnectors: connectors.length,
        },
        components,
        wires,
        connectors,
        rawData: data,
      };

      const json = JSON.stringify(exportData, null, 2);
      const blob = new Blob([json], { type: "application/json" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);

      console.log(`JSON exported successfully: ${filename}`);
    } catch (error) {
      console.error("Error exporting JSON:", error);
      throw error;
    }
  }
}

// Export singleton instance
export const schematicExportManager = new SchematicExportManager();