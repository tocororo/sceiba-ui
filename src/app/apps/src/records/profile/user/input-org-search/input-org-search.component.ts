import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AbstractControl, UntypedFormControl, ValidationErrors, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { ExtraValidators, HitList, InputControl, Organization, OrganizationServiceNoAuth } from 'toco-lib';

@Component({
  selector: 'toco-org-search',
  templateUrl: './input-org-search.component.html',
  styleUrls: ['./input-org-search.component.scss'],
  host: {
    '[style.minWidth]': 'content.minWidth',
    '[style.width]': 'content.width'
}
})
export class InputOrgSearchComponent extends InputControl implements OnInit {

  filteredOrg = new HitList<Organization>();

  params = new HttpParams();

  /**
   * Input `orgFilter` is a dict with `type` and `value` to filter the organizations,
   * @Example { type: 'country' , value: 'Cuba" }
   */
  @Input()
  orgFilter: { type: string, value: string };

  @Input()
  placeholder: string = "Escriba al menos 3 letras";

  @Input()
  label: string = "Busque una organización";

  @Input()
  appearance: string = "outline";

  /**
   * Input `cleaning` is a boolen, if true then clean the search
   */
  @Input()
  cleaning: boolean = false;

  @Output()
  selectedOrg: EventEmitter<Organization> = new EventEmitter<Organization>();

  toSearch = 0;
  constructor(private _orgService: OrganizationServiceNoAuth) {
    super()
  }

  ngOnInit() {
    /** SUPER IMPORTANTE PONER */
    this.init('', '', false, true);

    this.params = this.params.set('size', '10');
    this.params = this.params.set('page', '1');
    if (this.orgFilter != undefined) {
      this.params = this.params.set(this.orgFilter.type, this.orgFilter.value);
    }

    this.content.formControl.valueChanges
      .subscribe({
        next: (orgValueChanges) => {
          this.toSearch++;
          // this condition check if the param is a `string` an if at least write 3 letters
          if (this.toSearch > 3 && typeof orgValueChanges === 'string') {
            this.toSearch = 0;
            this.params = this.params.set('q', orgValueChanges)
            this._orgService.getOrganizations(this.params).subscribe({
              next: (response) => {
                this.filteredOrg = response.hits
              }
            });
          } else if (typeof orgValueChanges === 'object') {
            console.log(orgValueChanges, orgValueChanges instanceof Organization);

            this.toSearch = 0;
            // this.content.formControl.setValue(orgValueChanges);
            this.selectedOrg.emit(orgValueChanges);
            if (this.cleaning) {
              this.content.formControl.setValue('');
            }
          }
        }
      })
  }
  /* This function return the organization name
   * @param org the Organization object
   */
  displayFn(org?: Organization): string | undefined {
    return org ? org.name : undefined;
  }

  public static getFormControlByDefault(): UntypedFormControl {
    return new UntypedFormControl('', this.isOrganization);
  }

  private static isOrganization(control: AbstractControl): ValidationErrors | null{
    if ( typeof control.value === 'object'){
      return null
    }
    return {"organizationValidator": 'El valor no es una organización'};
  }

}
