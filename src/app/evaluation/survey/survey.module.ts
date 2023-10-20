
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CoreModule, TocoFormsModule } from 'toco-lib';

import { MatListModule } from '@angular/material/list';
import { SurveyJournalDataComponent } from './survey-journal-data/survey-journal-data.component';
import { SurveyQuestionsComponent } from './survey-questions/survey-questions.component';
import { SurveyResultAndRecomsComponent } from './survey-result-and-recoms/survey-result-and-recoms.component';
import { SurveyRoutingModule } from './survey-routing.module';
import { SurveyViewComponent } from './survey-view/survey-view.component';
import { SurveyComponent } from './survey/survey.component';
import { StaticViewerCardComponent } from './viewer-card/static-viewer-card/static-viewer-card.component';
import { ViewerCardComponent } from './viewer-card/viewer-card/viewer-card.component';

@NgModule({
	declarations: [
		SurveyComponent,
		SurveyViewComponent,
        SurveyQuestionsComponent,
		SurveyResultAndRecomsComponent,
		SurveyJournalDataComponent,
		StaticViewerCardComponent,
		ViewerCardComponent
	],
	imports: [
		CommonModule,
		HttpClientModule,
    	ReactiveFormsModule,
		FlexLayoutModule,
		TranslateModule,

        MatTooltipModule,
        MatIconModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatSelectModule,
        MatButtonModule,
		MatExpansionModule,
		MatMenuModule,
		MatStepperModule,
		MatDividerModule,
    MatListModule,
		CoreModule,
		TocoFormsModule,
		SurveyRoutingModule
	]
})
export class SurveyModule
{ }
