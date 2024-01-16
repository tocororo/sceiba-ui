export interface Configuration {
    name: string;
    description: string;
    created: string;
    last_updated: string;
    order_for_mapping: string[];
    entities: Entity[];
  }
  export interface Entity {
    name: string;
    description: string;
    mapping: Mapping;
  }
  export interface Mapping {
    _class: string;
    required: string[];
    properties: { [key: string]: string |string[] | NestedMapping | NestedMappings };
    relationship: { [key: string]: Relationship };
    valuesOf: { [key: string]: { [key: string]: string } };
  }
  /**
   * NestedMapping  y  NestedMappings  se utilizan para mapear 
   * las propiedades con estructuras anidadas dentro del JSON. 
   */
  export interface NestedMapping {
    code: string;
    name: string;
  }
  
  export  interface NestedMappings {
    [key: string]: string[];
  }
  export interface Relationship {
    description?: string;
    type: string;
    relation: string;
    identifier?: string;
  }

  export interface Rule{
    key:string;
    value:string[];
  }