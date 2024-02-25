import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';import { MarkdownModule } from 'ngx-markdown';
import { SceibaUiSearchModule } from 'src/app/modules/common/search/search.module';
import { SceibaUiSharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'toco-lib';
import { DisambiguateRoutingModule } from './disambiguate-routing.module';


@NgModule({
  declarations: [

    // DisambiguateComponent,
    // DesambiguateOrganizationSelectDialog,
    // Step3DisambiguateHelp,
    // DisambiguationComponent,
    // DisambiguateTextFieldComponent,
    // DisambiguateRelationshipsComponent,
    // ShowOneRelationshipComponent,
    // DisambiguateCardFieldComponent,
    // DisambiguateCardChipsFieldComponent,
    // DisambiguateAccordChipsFieldComponent,
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
