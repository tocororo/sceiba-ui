import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "eval",
    loadChildren: () =>
      import("./evaluation/app.module").then((mod) => mod.AppModule),
  },
  {
    path: "",
    loadChildren: () =>
      import("./home/app.module").then((mod) => mod.AppModule),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
