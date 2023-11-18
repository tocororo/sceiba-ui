import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisambiguateComponent } from './disambiguate.component';

const routes: Routes = [
  {
    path: '',
    component: DisambiguateComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisambiguateRoutingModule { }
