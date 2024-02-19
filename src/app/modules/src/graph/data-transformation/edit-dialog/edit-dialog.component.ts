import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, NgFor } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { ConfigurationJsonService } from '../../_services/configuration-json.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],

})
export class EditDialogComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  entityCtrl = new FormControl('');
  filteredEntities: Observable<string[]>;
  entities: string[] = [];
  allentities: string[] = [];
   persisten_entities:string[]=[]

  @ViewChild('entityInput') entityInput: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);

  constructor(private configurationService: ConfigurationJsonService) {
    this.filteredEntities = this.entityCtrl.valueChanges.pipe(
      startWith(null),
      map((entity: string | null) => (entity ? this._filter(entity) : this.allentities.slice())),
    );
  }
  ngOnInit(): void {
    

    this.configurationService.getConfigurationJson().subscribe((configuration) => {
      if (this.entities) {
        this.entities = configuration.order_for_mapping
this.allentities=this.entities
  this.entities.forEach(item=>{
    if (item) {
      this.persisten_entities.push(item)

    }
  })
  
  



      }
    })


  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    console.log("this.entities.indexOf(value) ===-1",this.entities.indexOf(value) ===-1);
    

    // Add our entity
    if (this.entities.indexOf(value) ===-1) {
      console.log("no esta en las entidades");
     
    } else {
      console.log(" esta en las entidades");


    }

    // Clear the input value
    event.chipInput!.clear();

    this.entityCtrl.setValue(null);
  }

  remove(entity: string): void {

    
    const index = this.entities.indexOf(entity);
    if (index >= 0) {
      this.entities.splice(index, 1);
      this.announcer.announce(`Removed ${entity}`);
      this.allentities=this.persisten_entities
    }
 

  
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (this.entities.indexOf(event.option.viewValue)===-1) {
      this.entities.push(event.option.viewValue);
      this.allentities=this.persisten_entities

    }
    this.entityInput.nativeElement.value = '';
    this.entityCtrl.setValue(null);
    
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allentities.filter(entity => entity.toLowerCase().includes(filterValue));
  }

  onSaveEntityOrder() {
    let configuration
    let entitiesarray = this.entities
    this.configurationService.getConfigurationJson().subscribe((config) => {
      config.order_for_mapping = this.entities
      this.allentities = this.entities
      configuration = config

    })
    this.configurationService.setConfigurationJson(configuration)
  }
}


