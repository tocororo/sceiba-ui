import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraphComponent } from './graph.component';
import { DataTransformationComponent } from '../../src/graph/data-transformation/data-transformation.component';
import { QueryViewComponent } from '../../src/graph/query-view/query-view.component';

const routes: Routes = [
  {path:"",
  component:GraphComponent,
  children:[{
   path: '',
   component: DataTransformationComponent,
      
   
  },{
    path:"query",
    component:QueryViewComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class GraphRoutingModule {
 
   

 }
