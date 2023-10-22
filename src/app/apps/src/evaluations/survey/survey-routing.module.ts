
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActionText } from 'toco-lib';

import { SurveyQuestionsComponent } from './survey-questions/survey-questions.component';
import { SurveyResolverService } from './survey-resolver.service';
import { SurveyComponent } from './survey/survey.component';

const surveyRoutes: Routes = [
	{
		path: '',
		component: SurveyComponent,
        resolve: {
            /**
             * This resolver is used on all views.
             * In the case of viewing view, it needs to resolve an object from the backend.
             * In the case of adding view, it needs to resolve an object with all its values set to empty.
             * In the case of editing view, it needs to resolve an object from the backend.
             */
            'evaluation': SurveyResolverService
        },
		children: [
            {
                path: ActionText.edit,
                component: SurveyQuestionsComponent
            },
            {
                path: ActionText.add,
                component: SurveyQuestionsComponent

            },
            {
                path: '',
                redirectTo: '/survey/' + ActionText.add,
                pathMatch: 'full'
            }
        ]
	}
];

@NgModule({
	imports: [RouterModule.forChild(surveyRoutes)],

	exports: [RouterModule]
})
export class SurveyRoutingModule
{ }
