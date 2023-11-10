import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { MarkdownModule } from 'ngx-markdown';
import { allowedURLS } from 'src/environments/environment';
import { AuthenticationModule } from 'toco-lib';
import { SceibaUiSharedModule } from '../shared/shared.module';
import { SceibaUiFooterComponent } from './footer/footer.component';
import { HeaderService } from './header.service';
import { SceibaUIHeaderComponent } from './header/header.component';
import { SceibaUiMenuItemElementComponent } from './header/menu-item-element/menu-item-element.component';
import { SceibaUiMenuItemComponent } from './header/menu-item/menu-item.component';
import { MenuSecondaryItemComponent } from './header/menu-secondary/menu-secondary-item.component';
import { MenuSecondaryComponent } from './header/menu-secondary/menu-secondary.component';
import { SceibaUiMenuComponent } from './header/menu/menu.component';
import { SceibaMenuAppsComponent } from './header/sceiba-ui-menu-apps/menu-apps.component';
import { SceibaUiHomeComponent } from './home/home.component';
import { SceibaUiBreadcrumbsComponent } from './sceiba-ui-breadcrumbs/sceiba-ui-breadcrumbs.component';
import { SceibaUiPageNotFoundComponent } from './sceiba-ui-page-not-found/sceiba-ui-page-not-found.component';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


export function storageFactory(): OAuthStorage {
  console.log("storageFactory in  sceiba ui core module!!!!!!");

  return localStorage;
}


@NgModule({
  declarations: [
    SceibaUIHeaderComponent,
    SceibaUiMenuComponent,
    SceibaUiMenuItemComponent,
    SceibaUiFooterComponent,
    SceibaMenuAppsComponent,
    MenuSecondaryComponent,
    MenuSecondaryItemComponent,
    SceibaUiMenuItemElementComponent,
    SceibaUiPageNotFoundComponent,
    SceibaUiBreadcrumbsComponent,
    SceibaUiHomeComponent
  ],
  exports: [
    SceibaUIHeaderComponent,
    SceibaUiMenuComponent,
    SceibaUiMenuItemComponent,
    SceibaUiFooterComponent,
    SceibaUiHomeComponent
  ],
  imports: [
    CommonModule,
    SceibaUiSharedModule,
    FlexLayoutModule,
    TranslateModule,
    AuthenticationModule,
    RouterModule.forChild([]),
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: allowedURLS,
        sendAccessToken: true,
      },
    }),
    MarkdownModule.forRoot({
      loader: HttpClient
    }),
  ],
  providers: [
    { provide: OAuthStorage, useFactory: storageFactory },
  ]
})
export class SceibaUiCoreModule {
  constructor(@Optional() @SkipSelf() parentModule?: SceibaUiCoreModule) {
    if (parentModule) {
      throw new Error(
        'SceibaUiCoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders<SceibaUiCoreModule> {
    return {
      ngModule: SceibaUiCoreModule,
      providers: [
        HeaderService,
      ]
    };
  }
}
