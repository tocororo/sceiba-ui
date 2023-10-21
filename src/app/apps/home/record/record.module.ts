
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoreModule, StaticsModule } from 'toco-lib';
import { SharedModule } from '../shared/shared.module';
import { RecordRoutingModule } from './record-routing.module';
import { DialogCatalogSourceInfo, RecordViewComponent } from './record-view/record-view.component';
import { SourcerecordViewComponent } from './record-view/sourcerecord-view/sourcerecord-view.component';
import { StaticChipsLinkComponent } from './statics/chips-link/chips-static-link.component';
import { LinkStaticComponent } from './statics/link/link-static.component';
import { StaticTableLinkComponent } from './statics/table-link/table-static-link.component';

@NgModule({
	declarations: [
		RecordViewComponent,
		DialogCatalogSourceInfo,
		SourcerecordViewComponent,

    LinkStaticComponent,
    StaticTableLinkComponent,
    StaticChipsLinkComponent,
	],

	imports: [
		CommonModule,
		RecordRoutingModule,
    CoreModule,
    SharedModule,

    StaticsModule,
	]
})
export class RecordModule
{ }
