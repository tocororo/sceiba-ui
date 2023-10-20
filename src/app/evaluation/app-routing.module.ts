import { EvaluationViewComponent } from "./evaluation-view/evaluation-view.component";

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { MyEvaluationComponent } from "./my-evaluation/my-evaluation.component";
import { PageNotFoundEvaluationComponent } from "./page-not-found-evaluation/page-not-found-evaluation.component";

const routes: Routes = [
  {
    path: "survey/:uuid",
    loadChildren: () =>
      import("./survey/survey.module").then((mod) => mod.SurveyModule),
  },

  {
    path: "evaluation/:uuid/view",
    component: EvaluationViewComponent,
  },
  {
    path: "help",
    loadChildren: () =>
      import("./help/help.module").then((mod) => mod.HelpModule),
  },
  {
    path: "evaluations",
    component: MyEvaluationComponent,
  },
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "**",
    component: PageNotFoundEvaluationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
