import { EvaluationViewComponent } from '../../src/evaluations/evaluation-view/evaluation-view.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SceibaUiPageNotFoundComponent } from 'src/app/core/sceiba-ui-page-not-found/sceiba-ui-page-not-found.component';
import { HomeComponent } from '../../src/evaluations/home/home.component';
import { MyEvaluationComponent } from '../../src/evaluations/my-evaluation/my-evaluation.component';
import { EvaluationsComponent } from './evaluations.component';

const routes: Routes = [
  {
    path: '',
    component: EvaluationsComponent,
    children: [
      {
        path: 'survey/:uuid',
        loadChildren: () =>
          import('../../src/evaluations/survey/survey.module').then(
            (mod) => mod.SurveyModule
          ),
      },

      {
        path: 'evaluation/:uuid/view',
        component: EvaluationViewComponent,
      },
      {
        path: 'help',
        loadChildren: () =>
          import('../../src/evaluations/help/help.module').then(
            (mod) => mod.HelpModule
          ),
      },
      {
        path: 'evaluations',
        component: MyEvaluationComponent,
      },
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: "**",
        component: SceibaUiPageNotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvaluationsRoutingModule {}
