import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MarkdownModule } from 'ngx-markdown';
import { SceibaUiSharedModule } from 'src/app/shared/shared.module';
import { StaticPagesComponent } from '../../common/help/static-pages/static-pages.component';
import { HelpRoutingModule } from './help-routing.module';
import { HelpComponent } from './help.component';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    HelpComponent,
    StaticPagesComponent
  ],
  imports: [
    CommonModule,
    // HttpClientModule,
    SceibaUiSharedModule,
    FlexLayoutModule,
    MarkdownModule.forRoot({
      loader: HttpClient,
    }),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    HelpRoutingModule,
  ],
  // bootstrap: [HelpComponent],
})
export class HelpModule {}
