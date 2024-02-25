import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FlexLayoutModule } from '@ngbracket/ngx-layout';import { RouterModule } from '@angular/router';
import { CoreModule, SearchService, StaticsModule } from 'toco-lib';
import { SharedModule } from '../shared/shared.module';
import { RecordRoutingModule } from './record-routing.module';
import { RecordViewSourceComponent } from './record-view-source/record-view-source.component';
import {
  DialogCatalogSourceInfo,
  RecordViewComponent,
} from './record-view/record-view.component';
import { StaticChipsLinkComponent } from './statics/chips-link/chips-static-link.component';
import { LinkStaticComponent } from './statics/link/link-static.component';
import { StaticTableLinkComponent } from './statics/table-link/table-static-link.component';

@NgModule({
  declarations: [
    RecordViewComponent,
    DialogCatalogSourceInfo,

    LinkStaticComponent,
    StaticTableLinkComponent,
    StaticChipsLinkComponent,
    RecordViewSourceComponent,
  ],

  imports: [
    CommonModule,
    RecordRoutingModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    RouterModule,
    StaticsModule,
  ],
  providers: [SearchService],
})
export class RecordModule {}
