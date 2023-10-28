import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthenticationModule } from 'toco-lib';
import { SharedModule } from '../shared/shared.module';
import { SceibaUiFooterComponent } from './footer/footer.component';
import { SceibaUIHeaderComponent } from './header/header.component';
import { SceibaUiMenuItemElementComponent } from './header/menu-item-element/menu-item-element.component';
import { SceibaUiMenuItemComponent } from './header/menu-item/menu-item.component';
import { MenuSecondaryItemComponent } from './header/menu-secondary/menu-secondary-item.component';
import { MenuSecondaryComponent } from './header/menu-secondary/menu-secondary.component';
import { SceibaUiMenuComponent } from './header/menu/menu.component';
import { SceibaMenuAppsComponent } from './header/sceiba-ui-menu-apps/menu-apps.component';
import { SceibaUiPageNotFoundComponent } from './sceiba-ui-page-not-found/sceiba-ui-page-not-found.component';


export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
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
    SceibaUiPageNotFoundComponent
  ],exports: [
    SceibaUIHeaderComponent,
    SceibaUiMenuComponent,
    SceibaUiMenuItemComponent,
    SceibaUiFooterComponent,
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
export class SceibaUiCoreModule {}
