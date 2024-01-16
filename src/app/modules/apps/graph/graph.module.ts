import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphRoutingModule } from './graph-routing.module';
import { RouterModule } from '@angular/router';
import { GraphComponent } from './graph.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DataTransformationComponent } from '../../src/graph/data-transformation/data-transformation.component';
import { ChangeMetadataConfigurationDialogComponent } from '../../src/graph/data-transformation/change-metadata-configuration-dialog/change-metadata-configuration-dialog.component';
import { EditDialogComponent } from '../../src/graph/data-transformation/edit-dialog/edit-dialog.component';
import { EntityPanelComponent } from '../../src/graph/data-transformation/entity-panel/entity-panel.component';
import { TransformRulesComponent } from '../../src/graph/data-transformation/transform-rules/transform-rules.component';
import { UploadWidgetComponent } from '../../src/graph/data-transformation/upload-widget/upload-widget.component';
import { TranslateModule } from '@ngx-translate/core';
import { SceibaUiSharedModule } from 'src/app/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [GraphComponent,
    DataTransformationComponent,
    ChangeMetadataConfigurationDialogComponent,
    EditDialogComponent,
    EntityPanelComponent,
    TransformRulesComponent,
    UploadWidgetComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ScrollingModule,
    SceibaUiSharedModule,
    TranslateModule,
    CommonModule,
    GraphRoutingModule,
    RouterModule,
    FlexLayoutModule
  ]
})
export class GraphModule { }
