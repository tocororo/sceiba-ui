import { Component } from '@angular/core';
import { MenuElement } from 'src/app/core/header/header.component';
import { Environment } from 'toco-lib';

@Component({
  selector: 'sceiba-ui-sources-root',
  templateUrl: './sources.component.html',
  styleUrls: ['./sources.component.scss'],
})
export class SourcesComponent {
  public _subMenus: MenuElement[];

  constructor(private environment: Environment) {}
  ngOnInit(): void {
    this._subMenus = [
      {
        nameTranslate: 'HOME',
        useRouterLink: true,
        href: this.environment.catalog,
      },
      {
        nameTranslate: 'SCEIBA_CATALOGO',
        useRouterLink: true,
        href: this.environment.catalog + '/sources',
      },
      {
        nameTranslate: 'REPORTS_STATISTICS',
        useRouterLink: true,
        href: this.environment.catalog + '/statistics',
      },
    ];
  }

  ngOnDestroy(): void {}
}
