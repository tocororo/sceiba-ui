import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionText, Environment, MessageHandler, StatusCode } from 'toco-lib';

import { MatIconRegistry } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OAuthStorage } from 'angular-oauth2-oidc';
import { EvaluationService } from '../../src/evaluations/_services/evaluationService.service';
import { MenuElement } from '../../src/evaluations/header/header.component';

@Component({
  selector: 'sceiba-ui-evaluations-root',
  templateUrl: './evaluations.component.html',
  styleUrls: ['./evaluations.component.scss'],
})
export class EvaluationsComponent {
  hasTaskInProgress = false;
  public readonly actionText: typeof ActionText;

  public _subMenus: MenuElement[];
  public extraUser: MenuElement[];

  public constructor(
    private environment: Environment,
    private _router: Router,
    protected http: HttpClient,
    public iconRegistry: MatIconRegistry,
    private _snackBar: MatSnackBar,
    private EvaluationService: EvaluationService,
    private oauthStorage: OAuthStorage
  ) {}

  public ngOnInit(): void {
    const evauluaMenu: MenuElement[] = [
      {
        nameTranslate: 'REVISTAS',
        click: () => this.createEvaluation(),
        svgIcon: 'journals',
      },
      {
        nameTranslate: 'EDITORIALES',
        svgIcon: 'publishing',
        click: () => {},
        disabled: true,
      },
      {
        nameTranslate: 'PUBLICACIONES',
        svgIcon: 'publication',
        click: () => {},
        disabled: true,
      },
      {
        nameTranslate: 'ORGANIZACIONES',
        svgIcon: 'organizaciones',
        click: () => {},
        disabled: true,
      },
      {
        nameTranslate: 'PERSONAS',
        svgIcon: 'persons',
        click: () => {},
        disabled: true,
      },
    ];

    this._subMenus = [
      {
        nameTranslate: 'HOME',
        useRouterLink: true,
        href: this.environment.evaluations,
      },
      {
        nameTranslate: 'EVALUA',
        childrenMenu: evauluaMenu,
      },
      {
        nameTranslate: 'OTRAS_HERRAMIENTAS',
        disabled: true,
      },
      {
        nameTranslate: 'LECTURAS_RECOMENDADAS',
        useRouterLink: false,
        disabled: true,
      },
      {
        nameTranslate: 'MIS_EVALUACIONES',
        useRouterLink: true,
        href: this.environment.evaluations + '/evaluations',
        disabled: this.notAuthenticated,
      },
    ];
    this.extraUser = [
      {
        nameTranslate: 'MIS_EVALUACIONES',
        useRouterLink: true,
        href: this.environment.evaluations + '/evaluations',
        disabled: this.notAuthenticated,
      },
    ]
  }

  public get notAuthenticated() : boolean {
    let request = JSON.parse(this.oauthStorage.getItem('user'));
    return request == (null || undefined);
  }
  ngOnDestroy(): void {}

  public createEvaluation() {
    this.hasTaskInProgress = true;
    this.EvaluationService.createEvaluation().subscribe({
      next: (result: any) => {
        this.hasTaskInProgress = false;
        const uuid = result.data.evaluation.uuid;
        this._router.navigate(['survey', uuid, this.actionText.add]);
      },
      error: (err: any) => {
        const m = new MessageHandler(this._snackBar);
        m.showMessage(StatusCode.OK, err.message);
      },
    });
  }
}
