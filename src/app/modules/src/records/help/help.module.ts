
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpRoutingModule } from './help-routing.module';
import { HelpComponent } from './help/help.component';
import { StaticPagesComponent } from './static-pages/static-pages.component';

@NgModule({
	declarations: [
		HelpComponent,
		StaticPagesComponent
	],

	imports: [
		CommonModule,
		HelpRoutingModule
	]
})
export class HelpModule
{ }
