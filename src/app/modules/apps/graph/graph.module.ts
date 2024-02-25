import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphRoutingModule } from './graph-routing.module';
import { RouterModule } from '@angular/router';
import { GraphComponent } from './graph.component';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { DataTransformationComponent } from '../../src/graph/data-transformation/data-transformation.component';
import { ChangeMetadataConfigurationDialogComponent } from '../../src/graph/data-transformation/change-metadata-configuration-dialog/change-metadata-configuration-dialog.component';
import { EditDialogComponent } from '../../src/graph/data-transformation/edit-dialog/edit-dialog.component';
import { EntityPanelComponent } from '../../src/graph/data-transformation/entity-panel/entity-panel.component';
import { TransformRulesComponent } from '../../src/graph/data-transformation/transform-rules/transform-rules.component';
import { UploadWidgetComponent } from '../../src/graph/data-transformation/upload-widget/upload-widget.component';
import { TranslateModule } from '@ngx-translate/core';
import { SceibaUiSharedModule } from 'src/app/shared/shared.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { QueryViewComponent } from '../../src/graph/query-view/query-view.component';
import { MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { SparqlInputComponent } from '../../src/graph/query-view/sparql-input/sparql-input.component';
import { QueryResultComponent } from '../../src/graph/query-view/query-result/query-result.component';
import { QueryResultDetailComponent } from '../../src/graph/query-view/query-result-detail/query-result-detail.component';


@NgModule({
  declarations: [GraphComponent,
    DataTransformationComponent,
    ChangeMetadataConfigurationDialogComponent,
    EditDialogComponent,
    EntityPanelComponent,
    TransformRulesComponent,
    UploadWidgetComponent,
    QueryViewComponent,SparqlInputComponent,QueryResultComponent,QueryResultDetailComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ScrollingModule,
    SceibaUiSharedModule,
    TranslateModule,
    CommonModule,
    GraphRoutingModule,
    RouterModule,
    MatIconModule,
    FlexLayoutModule,NgxDropzoneModule,MonacoEditorModule,NgxGraphModule
  ]
})
export class GraphModule { }
