interface Connector {
  id: string;
  label: string;
}

interface Component {
  id: string;
  label: string;
  category: string;
  shape: string;
  connectors: Connector[];
}

interface Connection {
  color: string;
  from: {
    componentId: string;
    connectorId: string;
    cavity: string;
  };
  to: {
    componentId: string;
    connectorId: string;
    cavity: string;
  };
  label: string;
}

interface SchematicConfig {
  components: Component[];
  connections: Connection[];
}

interface MergedResult {
  components: Component[];
  connections: Connection[];
}

export function mergeSchematicConfigs(...configs: SchematicConfig[]): MergedResult {
  const mergedComponents: Component[] = [];
  const mergedConnections: Connection[] = [];
  
  // Create a map to track components by ID
  const componentMap = new Map<string, Component>();
  
  // Process components from all configs
  const allComponents = configs.flatMap(config => config.components);
  
  for (const component of allComponents) {
    if (componentMap.has(component.id)) {
      // Component already exists, merge connectors
      const existingComponent = componentMap.get(component.id)!;
      
      // Merge connectors, avoiding duplicates
      const existingConnectorIds = new Set(existingComponent.connectors.map(c => c.id));
      const newConnectors = component.connectors.filter(c => !existingConnectorIds.has(c.id));
      
      existingComponent.connectors.push(...newConnectors);
      
      // Update category if different (prioritize more specific categories)
      if (existingComponent.category !== component.category) {
        // You can customize this logic based on your preference
        // For now, we'll keep the first category encountered
        console.warn(`Category mismatch for component ${component.id}: ${existingComponent.category} vs ${component.category}`);
      }
    } else {
      // New component, add to map
      componentMap.set(component.id, {
        ...component,
        connectors: [...component.connectors] // Create a copy of connectors array
      });
    }
  }
  
  // Convert map back to array
  mergedComponents.push(...Array.from(componentMap.values()));
  
  // Merge all connections from all configs
  const allConnections = configs.flatMap(config => config.connections);
  mergedConnections.push(...allConnections);
  
  return {
    components: mergedComponents,
    connections: mergedConnections
  };
}

// Example usage function
export function mergeB3AndS4Configs() {
  // Import the configs (you'll need to adjust the import paths as needed)
  const B3 = require('../components/Schematic/tests/B3.ts').default;
  const S4 = require('../components/Schematic/tests/S4.ts').default;
  
  return mergeSchematicConfigs(B3, S4);
}