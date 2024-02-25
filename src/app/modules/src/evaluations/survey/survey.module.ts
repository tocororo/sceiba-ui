import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";


import { CoreModule, TocoFormsModule } from "toco-lib";

import { SharedModule } from "../shared/shared.module";
import { SurveyJournalDataComponent } from "./survey-journal-data/survey-journal-data.component";
import { SurveyQuestionsComponent } from "./survey-questions/survey-questions.component";
import { SurveyResultAndRecomsComponent } from "./survey-result-and-recoms/survey-result-and-recoms.component";
import { SurveyRoutingModule } from "./survey-routing.module";
import { SurveyViewComponent } from "./survey-view/survey-view.component";
import { SurveyComponent } from "./survey/survey.component";
import { StaticViewerCardComponent } from "./viewer-card/static-viewer-card/static-viewer-card.component";
import { ViewerCardComponent } from "./viewer-card/viewer-card/viewer-card.component";

@NgModule({
  declarations: [
    SurveyComponent,
    SurveyViewComponent,
    SurveyQuestionsComponent,
    SurveyResultAndRecomsComponent,
    SurveyJournalDataComponent,
    StaticViewerCardComponent,
    ViewerCardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    TranslateModule,
    CoreModule,
    TocoFormsModule,
    SurveyRoutingModule,
  ],
})
export class SurveyModule {}
