import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ContainerPanelComponent, FormFieldType, HintPosition, HintValue, InputEmailComponent, InputTextComponent, Organization, OrganizationServiceNoAuth, PanelActionContent, TextInputAppearance, UserProfile, UserProfileService } from 'toco-lib';

import { InputFileAvatarComponent } from '../input-file-avatar/input-file-avatar.component';
import { InputOrgSearchComponent } from '../input-org-search/input-org-search.component';


@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.scss']
})
export class UserProfileEditComponent implements OnInit {

  public userProfileFormGroup: UntypedFormGroup;

  userProfilePanel: PanelActionContent = null;

  userprofile: UserProfile;

 constructor(private formBuilder: UntypedFormBuilder, private userProfileService: UserProfileService) { }

  ngOnInit() {
    // TODO: resolver de userprofile para cargar los datos del usuario
    this.userprofile = new UserProfile();
    this.initEditUserProfile()
    console.log(this.userProfilePanel);
    
  }
  initEditUserProfile() {
    this.userProfileFormGroup = this.formBuilder.group({});

    this.userProfilePanel = {
      name: 'userProfilePanel',
      label: '',//'Editar Perfil de Usuario',
      controlType: ContainerPanelComponent,
      description: '',
      iconName: '',
      width: "100%",
      formSection: this.userProfileFormGroup,
      formSectionContent: [
        {
          formControl: InputFileAvatarComponent.getFormControlByDefault(),
          name: 'avatar',
          label: 'Foto de perfil',
          type: FormFieldType.text,
          controlType: InputFileAvatarComponent,
          required: false,
          startHint: new HintValue(HintPosition.start, ''),
          width: '100%',
          value: this.userprofile.avatar? this.userprofile.avatar : null,
          appearance: TextInputAppearance.outline,
        },
        {
          formControl: InputTextComponent.getFormControlByDefault(),
          name: 'username',
          label: 'Nombre de usuario',
          type: FormFieldType.text,
          controlType: InputTextComponent,
          required: true,
          startHint: new HintValue(HintPosition.start, ''),
          width: '30%',
          value: this.userprofile.username? this.userprofile.username : null,
          appearance: TextInputAppearance.outline,
        },
        {
          formControl: InputTextComponent.getFormControlByDefault(),
          name: 'full_name',
          label: 'Nombre completo',
          type: FormFieldType.text,
          controlType: InputTextComponent,
          required: true,
          startHint: new HintValue(HintPosition.start, 'Nombre y Apellidos'),
          width: '30%',
          value: this.userprofile.full_name? this.userprofile.full_name : null,
          appearance: TextInputAppearance.outline,
        },
        {
          formControl: InputEmailComponent.getFormControlByDefault(),
          name: 'email',
          label: 'Correo electrónico',
          type: FormFieldType.text,
          controlType: InputEmailComponent,
          required: true,
          startHint: new HintValue(HintPosition.start, 'ejemplo@dominio.com'),
          width: '30%',
          value: this.userprofile.email? this.userprofile.email : null,
          appearance: TextInputAppearance.outline,
        },
        {
          formControl: InputTextComponent.getFormControlByDefault(),
          name: 'biography',
          label: 'Bibliografía',
          type: FormFieldType.textarea,
          controlType: InputTextComponent,
          required: false,
          startHint: new HintValue(HintPosition.start, ''),
          width: '100%',
          value: this.userprofile.biography? this.userprofile.biography : null,
          appearance: TextInputAppearance.outline,
        },
        {
          formControl: InputOrgSearchComponent.getFormControlByDefault(),
          name: 'institution',
          label: 'Nombre de la institución',
          type: Organization,
          controlType: InputOrgSearchComponent,
          required: true,
          startHint: new HintValue(HintPosition.start, ''),
          width: '100%',
          minWidth: "20em",
          value: this.userprofile.institution? this.userprofile.institution : null,
          appearance: TextInputAppearance.outline,
        },
        {
          formControl: InputTextComponent.getFormControlByDefault(),
          name: 'institution_rol',
          label: 'Rol en la institución',
          type: FormFieldType.text,
          controlType: InputTextComponent,
          required: true,
          startHint: new HintValue(HintPosition.start, ''),
          width: '100%',
          value: this.userprofile.institution_rol? this.userprofile.institution_rol : null,
          appearance: TextInputAppearance.outline,
        }
      ],
      actionLabel: 'Editar',
      action: {
        doit(_){
          console.log("EDITAR", this.userProfileFormGroup);
          if (this.userProfileFormGroup.valid) {
            console.log("Valid");
            this.userProfileService.getUserInfo().subscribe({
              next: response => {
                console.log(response);
              },
              error: err => {
                console.log("err", err);
              }
            })
          } else {
            console.log("form not valid ");
          }
        }
      },
    };
  }

}
