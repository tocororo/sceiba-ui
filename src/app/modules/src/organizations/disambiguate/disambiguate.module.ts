import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MarkdownModule } from 'ngx-markdown';
import { SceibaUiSearchModule } from 'src/app/modules/common/search/search.module';
import { SceibaUiSharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'toco-lib';
import { DisambiguateRoutingModule } from './disambiguate-routing.module';
import { DesambiguateOrganizationSelectDialog, DisambiguateComponent } from './disambiguate.component';
import { DisambiguateAccordChipsFieldComponent } from './disambiguation/disambiguate-accord-chips-field/disambiguate-accord-chips-field.component';
import { DisambiguateCardChipsFieldComponent } from './disambiguation/disambiguate-card-chips-field/disambiguate-card-chips-field.component';
import { DisambiguateCardFieldComponent } from './disambiguation/disambiguate-card-field/disambiguate-card-field.component';
import { DisambiguateRelationshipsComponent } from './disambiguation/disambiguate-relationships/disambiguate-relationships.component';
import { ShowOneRelationshipComponent } from './disambiguation/disambiguate-relationships/show-one-relationship/show-one-relationship.component';
import { DisambiguateTextFieldComponent } from './disambiguation/disambiguate-text-field/disambiguate-text-field.component';
import { DisambiguationComponent, Step3DisambiguateHelp } from './disambiguation/disambiguation.component';


@NgModule({
  declarations: [

    DisambiguateComponent,
    DesambiguateOrganizationSelectDialog,
    Step3DisambiguateHelp,
    DisambiguationComponent,
    DisambiguateTextFieldComponent,
    DisambiguateRelationshipsComponent,
    ShowOneRelationshipComponent,
    DisambiguateCardFieldComponent,
    DisambiguateCardChipsFieldComponent,
    DisambiguateAccordChipsFieldComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    FlexLayoutModule,
    SceibaUiSearchModule,
    SceibaUiSharedModule,
    MarkdownModule.forRoot({
      loader: HttpClient,
    }),
    DisambiguateRoutingModule
  ]
})
export class DisambiguateModule { }
