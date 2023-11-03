import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthenticationModule } from 'toco-lib';
import { SharedModule } from '../shared/shared.module';
import { SceibaUiAuthenticationComponent } from './authentication/authentication.component';
import { OauthAuthenticationService } from './authentication/authentication.service';
import { SceibaUiFooterComponent } from './footer/footer.component';
import { HeaderService } from './header.service';
import { SceibaUIHeaderComponent } from './header/header.component';
import { SceibaUiMenuItemElementComponent } from './header/menu-item-element/menu-item-element.component';
import { SceibaUiMenuItemComponent } from './header/menu-item/menu-item.component';
import { MenuSecondaryItemComponent } from './header/menu-secondary/menu-secondary-item.component';
import { MenuSecondaryComponent } from './header/menu-secondary/menu-secondary.component';
import { SceibaUiMenuComponent } from './header/menu/menu.component';
import { SceibaMenuAppsComponent } from './header/sceiba-ui-menu-apps/menu-apps.component';
import { SceibaUiBreadcrumbsComponent } from './sceiba-ui-breadcrumbs/sceiba-ui-breadcrumbs.component';
import { SceibaUiPageNotFoundComponent } from './sceiba-ui-page-not-found/sceiba-ui-page-not-found.component';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
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
    SceibaUiAuthenticationComponent,
  ],
  exports: [
    SceibaUIHeaderComponent,
    SceibaUiMenuComponent,
    SceibaUiMenuItemComponent,
    SceibaUiFooterComponent,
    SceibaUiAuthenticationComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FlexLayoutModule,
    TranslateModule,
    AuthenticationModule,
    RouterModule.forChild([]),
  ],
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
        OauthAuthenticationService
      ]
    };
  }
}