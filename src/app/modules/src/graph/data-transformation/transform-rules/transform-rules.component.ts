import { Component, ElementRef, ViewChild } from "@angular/core";
import { Configuration, Entity, Rule } from "../../models/configuration.interface";
import { ConfigurationJsonService } from "../../_services/configuration-json.service";



@Component({
  selector: 'app-transform-rules',
  templateUrl: './transform-rules.component.html',
  styleUrls: ['./transform-rules.component.scss'],



})
export class TransformRulesComponent {
  panelOpenState = false;
  items: any
  entity_label: string
  entities: Entity[] = []
  subproperties: any[] = []
  inputValue: string = ""
  @ViewChild('inputField', { static: false }) inputFieldinJSON: ElementRef;



  checked: boolean = true
  constructor(private configurationService: ConfigurationJsonService) { }
  ngOnInit(): void {

    this.chargeEntitiesbyConfiguration()
    this.getRulesbyEntityName()

  }
  chargeEntitiesbyConfiguration() {
    this.configurationService.getConfigurationJson().subscribe((configuration: Configuration) => {
      if (configuration) {
        this.entities = configuration.entities


      } else {
        this.items = []
      }
    })

  }
  /** 
  * Retrieves the rules based on the entity name obtained from the configuration service. 
  * It subscribes to the observable returned by the  getRulesPropertiesLabel()  method of the configuration service. 
  * If a valid label is received, it sets the  entity_label  property and proceeds to search for the corresponding entity in the  entities  array. 
  * It logs the entity name and the obtained label for debugging purposes. 
  * If a matching entity is found, it sets the  items  property to the properties of the entity's mapping. 
  * If no label is received, it logs a message indicating that the label is null. 
  */
  getRulesbyEntityName() {
    this.configurationService.getRulesPropertiesLabel().subscribe((label: string) => {
      try {

        if (label) {
          const rules: any[] = []

          this.entity_label = label
          this.entities.map((entity) => {
            if (entity.name === this.entity_label) {
              console.log("es la q busco", entity.mapping.properties);
              const properties = entity.mapping.properties;
              Object.entries(properties).forEach(([key, value]) => {
                rules.push({ key, value });
              }
              );
              this.items = rules
            }
          })
          this.updatePropertiesSectionConfig()
        }
      } catch (error) {
        console.error(error);
      }
    })
  }
  /**
   * stop the event propagation of the click in the checkbox and add the rule to the rulesarray
   * @param event the click event
   * @param item the rule to add
   */
  public toAddRule(event, item) {
    event.stopPropagation()


  }
  /**
 * Adds a value to the value array of an item or converts it to an array if it's not already.
 * 
 * @param key The key to identify the item.
 * @param subkey
 * @param inputValue
 */
  toAddValue(key, subkey?: string, inputValue?: string) {
    console.log("inputID", this.inputValue);



    if (subkey) {

      // Iterate through the items array
      this.items.map((item) => {
        if (item.key === key) {
          // Get the subkeys of the item value object

          const subkeys = this.getObjectKeys(item.value)
          // Iterate through the subkeys

          subkeys.map((key) => {
            if (key === subkey) {
              // Check if the value corresponding to the subkey is an array

              if (this.isAnArrayofValues(item.value[subkey])) {
                item.value[subkey].push(inputValue)

              } else {
                const temp = item.value[subkey]
                item.value[subkey] = []
                item.value[subkey].push(temp)

                item.value[subkey].push(inputValue)
              }
            }
          })
        }
      })


    }
    else {
      const inputElement = this.inputFieldinJSON.nativeElement;

      // Find the item with the matching key
      this.items.map((obj: Rule) => {
        // Check if the value is already an array
        if (obj.key === key) {
          if (this.isAnArrayofValues(obj.value)) {
            obj.value.push(inputElement.value)

          } else {
            const tem_array = []
            tem_array.push(obj.value)


            tem_array.push(inputElement.value)
            obj.value = tem_array
            console.log("obj.valueobj.value", obj.value);

            inputElement.value = ""


          }

        }
      })



    }


    this.inputValue = ""
    this.updatePropertiesSectionConfig()

  }

  /**
   * 
   * @param value
   * @returns
   */
  /** 
 * Checks if the given value is an array. 
 *  
 * @param value The value to be checked. 
 * @returns True if the value is an array, false otherwise. 
 */
  isAnArrayofValues(value): boolean {

    return Array.isArray(value);
  }

  isJSONObject(value): boolean {

    this.subproperties = []
    try {
      if (typeof value === 'object' && value !== null) {
        for (const subkey in value) {
          if (value.hasOwnProperty(subkey)) {
            return true;
          }

        }


      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return false;
    }
  }
  isString(valor: any): boolean {

    return typeof valor === 'string';
  }
  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  /**
   * Deletes a rule from the items array.
   * @param value - The value to delete.
   * @param key - (Optional) The key to match.
   * @param subkey - (Optional) The subkey to match.
   */
  ToDeleteRule(value: string, key?: string, subkey?: string) {
    // If a subkey is provided, log it to the console
    if (subkey) {
      // Iterate through the items array
      this.items.map((item) => {
        // Check if the item key matches the provided key
        if (item.key === key) {
          // Get the subkeys of the item value object

          const subkeys = this.getObjectKeys(item.value)
          // Iterate through the subkeys

          subkeys.map((key) => {
            // Check if the subkey matches the provided subkey

            if (key === subkey) {
              // Check if the value corresponding to the subkey is an array

              if (this.isAnArrayofValues(item.value[subkey])) {
                // Filter out the value from the array

                item.value[subkey] = item.value[subkey].filter(item => item !== value);
              } else {
                // If the value is not an array, assign an empty array to it

                item.value[subkey] = []
              }


            }
          })
        }
      })

    } else {
      if (key) {
        // If only a key is provided, iterate through the items array

        this.items.map((item) => {
          // Check if the item key matches the provided key

          if (item.key === key) {
            // Check if the value is an array

            if (this.isAnArrayofValues(item.value)) {
              // Filter out the value from the array

              item.value = item.value.filter(item => item !== value);


            } else {
              // If the value is not an array, assign an empty array to it

              item.value = []
            }

          }
        })
      }
    }
    this.updatePropertiesSectionConfig()

  }
  updatePropertiesSectionConfig() {
    try {
      let new_configuration: Configuration;
      this.configurationService.getConfigurationJson().subscribe((configuration: Configuration) => {
        configuration.entities.map((entity) => {
          if (entity.name === this.entity_label) {
            console.log("son iguales", entity.name, this.entity_label);
            this.items.map((item: Rule) => {
              entity.mapping.properties[item.key] = item.value;
            });
          }
        });
        new_configuration = configuration;
      });

      if (new_configuration) {
        this.configurationService.setConfigurationJson(new_configuration);
      }
    } catch (error) {
      console.error('Error updating properties section configuration:', error);
    }
  }
}

