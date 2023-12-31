import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// testing charts organizations
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { OAuthStorage } from 'angular-oauth2-oidc';
import { MarkdownModule } from 'ngx-markdown';
import { SceibaUiSharedModule } from 'src/app/shared/shared.module';
import { environment } from 'src/environments/environment';
import {
  CoreModule,
  Environment,
  OrganizationServiceNoAuth,
  OrganizationsModule,
  SearchModule,
  SearchService,
  StaticsModule,
  TocoFormsModule,
  storageFactory,
} from 'toco-lib';
import { SceibaUiSearchModule } from '../../common/search/search.module';
import { OrgService } from '../../src/organizations/_services/org.service';
import { AggregationsComponent } from '../../src/organizations/aggregations/aggregations.component';
import { BarVerticalComponent } from '../../src/organizations/charts/bar-vertical/bar-vertical.component';
import { ChartsComponent } from '../../src/organizations/charts/charts.component';
import { GaugeChartComponent } from '../../src/organizations/charts/gauge-chart/gauge-chart.component';
import { PieGridComponent } from '../../src/organizations/charts/pie-grid/pie-grid.component';
import { PolarChartComponent } from '../../src/organizations/charts/polar-chart/polar-chart.component';
import { DatepickerYearComponent } from '../../src/organizations/datepicker-year/datepicker-year.component';
import { ErrorPageComponent } from '../../src/organizations/error-page/error-page.component';
import { Error404Component } from '../../src/organizations/error404/error404.component';
import { CardItemInfoComponent } from '../../src/organizations/home/card-item-info/card-item-info.component';
import { CardSvgComponent } from '../../src/organizations/home/card-svg/card-svg.component';
import { CardsSliderComponent } from '../../src/organizations/home/cards-slider/cards-slider.component';
import { HomeComponent } from '../../src/organizations/home/home.component';
import { ImportComponent } from '../../src/organizations/import/import.component';
import { InputFileComponent } from '../../src/organizations/import/input-file/input-file.component';
import { NotificationsComponent } from '../../src/organizations/notifications/notifications.component';
import { EditAddressComponent } from '../../src/organizations/org-edit/edit-address/edit-address.component';
import {
  OrgEditFormComponent,
  OrganizationDialogDeleteConfirm,
  OrganizationDialogInfoConfirm,
  OrganizationDialogRelasionship,
  OrganizationDialogorgEditAddress,
} from '../../src/organizations/org-edit/org-edit-form/org-edit-form.component';
import { OrgEditComponent } from '../../src/organizations/org-edit/org-edit.component';
import { OrgGetComponent } from '../../src/organizations/org-get/org-get.component';
import {
  CommentDialogComponent,
  OrgReviewerComponent,
} from '../../src/organizations/org-reviewer/org-reviewer.component';
import { OrgViewerComponent } from '../../src/organizations/org-viewer/org-viewer.component';
import { OrgsMapComponent } from '../../src/organizations/orgs-map/orgs-map.component';
import {
  PdfDialogComponent,
  PdfExcelComponent,
} from '../../src/organizations/pdf-excel/pdf-excel.component';
import { RequestChangesListComponent } from '../../src/organizations/request-changes-list/request-changes-list.component';
import { SearchListComponent } from '../../src/organizations/search-list/search-list.component';
import { OrganizationSearchComponent } from '../../src/organizations/search/search.component';

import { DesambiguateOrganizationSelectDialog, DisambiguateComponent } from '../../src/organizations/disambiguate/disambiguate.component';
import { DisambiguateAccordChipsFieldComponent } from '../../src/organizations/disambiguate/disambiguation/disambiguate-accord-chips-field/disambiguate-accord-chips-field.component';
import { DisambiguateCardChipsFieldComponent } from '../../src/organizations/disambiguate/disambiguation/disambiguate-card-chips-field/disambiguate-card-chips-field.component';
import { DisambiguateCardFieldComponent } from '../../src/organizations/disambiguate/disambiguation/disambiguate-card-field/disambiguate-card-field.component';
import { DisambiguateRelationshipsComponent } from '../../src/organizations/disambiguate/disambiguation/disambiguate-relationships/disambiguate-relationships.component';
import { ShowOneRelationshipComponent } from '../../src/organizations/disambiguate/disambiguation/disambiguate-relationships/show-one-relationship/show-one-relationship.component';
import { DisambiguateTextFieldComponent } from '../../src/organizations/disambiguate/disambiguation/disambiguate-text-field/disambiguate-text-field.component';
import { DisambiguationComponent, Step3DisambiguateHelp } from '../../src/organizations/disambiguate/disambiguation/disambiguation.component';
import { OrgViewAccordionComponent } from '../../src/organizations/org-viewer/org-view/org-view-accordion/org-view-accordion.component';
import { OrgViewAddressComponent } from '../../src/organizations/org-viewer/org-view/org-view-address/org-view-address.component';
import { OrgViewGeoNamesCityComponent } from '../../src/organizations/org-viewer/org-view/org-view-geo-names-city/org-view-geo-names-city.component';
import { OrgViewRelationshipComponent } from '../../src/organizations/org-viewer/org-view/org-view-relationship/org-view-relationship.component';
import { OrgViewComponent } from '../../src/organizations/org-viewer/org-view/org-view.component';
import { OrganizationsRoutingModule } from './organizations-routing.module';
import { OrganizationsComponent } from './organizations.component';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    OrganizationsComponent,
    HomeComponent,
    OrganizationSearchComponent,
    SearchListComponent,

    OrgViewerComponent,
    OrgViewComponent,
    OrgViewAccordionComponent,
    OrgViewAddressComponent,
    OrgViewGeoNamesCityComponent,
    OrgViewRelationshipComponent,

    OrgGetComponent,
    OrgEditComponent,
    OrganizationDialogRelasionship,
    DatepickerYearComponent,
    OrganizationDialogDeleteConfirm,
    OrganizationDialogInfoConfirm,
    OrganizationDialogorgEditAddress,
    // testing charts organizations
    ChartsComponent,
    PolarChartComponent,
    BarVerticalComponent,
    PieGridComponent,
    AggregationsComponent,
    GaugeChartComponent,
    // DialogChartComponent
    ImportComponent,
    InputFileComponent,
    CardSvgComponent,
    CardItemInfoComponent,
    CardsSliderComponent,
    EditAddressComponent,

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

    OrgEditFormComponent,
    CommentDialogComponent,

    OrgReviewerComponent,
    OrgsMapComponent,
    Error404Component,
    ErrorPageComponent,
    RequestChangesListComponent,
    NotificationsComponent,

    PdfExcelComponent,
    PdfDialogComponent,
  ],
  imports: [
    NgxChartsModule,
    CommonModule,
    SceibaUiSharedModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    ReactiveFormsModule,
    CoreModule,
    StaticsModule,
    OrganizationsModule,
    TocoFormsModule,
    FormsModule,
    FlexLayoutModule,
    OrganizationsRoutingModule,
    // OAuthModule.forRoot({
    //   resourceServer: {
    //     allowedUrls: allowedURLS,
    //     sendAccessToken: true,
    //   },
    // }),
    SearchModule,
    MarkdownModule.forRoot({
      loader: HttpClient,
    }),
    // MatomoModule.forRoot({
    //   trackers: [
    //     {
    //       trackerUrl: environment.matomoUrl,
    //       siteId: environment.matomoSiteId,
    //     },
    //   ],
    //   routeTracking: {
    //     enable: true,
    //   },
    // }),
    // NotificationModule
    SceibaUiSearchModule,
  ],
  providers: [
    SearchService,
    // EnvServiceProvider,
    OrganizationServiceNoAuth,
    OrgService,
    { provide: Environment, useValue: environment },
    { provide: OAuthStorage, useFactory: storageFactory },
    // { provide: HTTP_INTERCEPTORS, useClass: OauthAuthenticationService, multi: true }
  ],

  bootstrap: [OrganizationsComponent],
})
export class OrganizationsAppModule {}
