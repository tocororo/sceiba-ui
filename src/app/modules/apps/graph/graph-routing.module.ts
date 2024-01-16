import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraphComponent } from './graph.component';
import { DataTransformationComponent } from '../../src/graph/data-transformation/data-transformation.component';

const routes: Routes = [
  {path:"",
  component:DataTransformationComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class GraphRoutingModule {
 
   

 }
