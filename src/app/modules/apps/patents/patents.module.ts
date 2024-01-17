import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatentsRoutingModule } from './patents-routing.module';
import { PatentsComponent } from './patents.component';


@NgModule({
  declarations: [
    PatentsComponent
  ],
  imports: [
    CommonModule,
    PatentsRoutingModule
  ]
})
export class PatentsModule { }
