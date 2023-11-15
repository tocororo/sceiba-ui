import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MarkdownModule } from 'ngx-markdown';
import { HelpComponent } from '../../common/help/help/help.component';
import { StaticPagesComponent } from '../../common/help/static-pages/static-pages.component';
import { HelpRoutingModule } from './help-routing.module';

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
    // SceibaUiSharedModule,
    // FlexLayoutModule,
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
