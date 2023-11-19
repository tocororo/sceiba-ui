import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

import { StaticPagesComponent } from '../../common/help/static-pages/static-pages.component';
import { HelpComponent } from './help.component';

const childrenRoutes = [

  {
    path: '',
    component: StaticPagesComponent,
    data: { src: 'assets/markdown/sceiba/help', title: 'Ayuda' },
  },
  {
    path: 'faq',
    component: StaticPagesComponent,
    data: { src: 'assets/markdown/sceiba/faq', title: 'FAQ' },
  },
  {
    path: 'about',
    component: StaticPagesComponent,
    data: { src: 'assets/markdown/sceiba/about', title: 'Sobre Nosotros' },
  },
  {
    path: 'contact',
    component: StaticPagesComponent,
    data: { src: 'assets/markdown/sceiba/contact', title: 'Contacto' },
  },
  {
    path: 'policy',
    component: StaticPagesComponent,
    data: {
      src: 'assets/markdown/sceiba/policy',
      title: 'Política de Privacidad',
    },
  },
  {
    path: 'terms',
    component: StaticPagesComponent,
    data: {
      src: '/assets/markdown/organizaciones/terms',
      title: 'Términos de uso',
    },
  },
  {
    path: 'organizations',
    children: [
      {
        path: 'faq',
        component: StaticPagesComponent,
        data: { src: '/assets/markdown/organizaciones/faq', title: 'FAQ' },
      },
      {
        path: 'privacy',
        component: StaticPagesComponent,
        data: {
          src: '/assets/markdown/organizaciones/privacy.',
          title: 'Políticas de privacidad',
        },
      },
      {
        path: 'about',
        component: StaticPagesComponent,
        data: {
          src: '/assets/markdown/organizaciones/about',
          title: 'Sobre Nosotros',
        },
      },
      {
        path: 'help',
        component: StaticPagesComponent,
        data: {
          src: '/assets/markdown/organizaciones/help.',
          title: 'Ayuda',
        },
      },
      {
        path: 'contact',
        component: StaticPagesComponent,
        data: {
          src: '/assets/markdown/organizaciones/contact.',
          title: 'Contacto',
        },
      },
      {
        path: 'inclussion',
        component: StaticPagesComponent,
        data: {
          src: 'assets/markdown/organizaciones/inclussion.',
          title: '¿Nueva Organización?',
        },
      },
    ],
  },
  {
    path: 'revistasmes',
    children: [
      {
        path: 'faq',
        component: StaticPagesComponent,
        data: {
          src: 'assets/markdown/revistasmes/revistasmes/faq',
          title: 'FAQ',
        },
      },
      {
        path: 'about',
        component: StaticPagesComponent,
        data: {
          src: 'assets/markdown/revistasmes/about',
          title: 'Sobre Nosotros',
        },
      },
      {
        path: 'help',
        component: StaticPagesComponent,
        data: { src: 'assets/markdown/revistasmes/help', title: 'Ayuda' },
      },
      {
        path: 'contact',
        component: StaticPagesComponent,
        data: {
          src: 'assets/markdown/revistasmes/contact',
          title: 'Contacto',
        },
      },
    ],
  },
  {
    path: 'catalog',
    children: [
      {
        path: 'faq',
        component: StaticPagesComponent,
        data: { src: 'assets/markdown/catalog/faq', title: 'FAQ' },
      },
      {
        path: 'about',
        component: StaticPagesComponent,
        data: {
          src: 'assets/markdown/catalog/about',
          title: 'Sobre Nosotros',
        },
      },
      {
        path: 'help',
        component: StaticPagesComponent,
        data: { src: 'assets/markdown/catalog/help', title: 'Ayuda' },
      },
      {
        path: 'contact',
        component: StaticPagesComponent,
        data: { src: 'assets/markdown/catalog/contact', title: 'Contacto' },
      },
    ],
  },
];

const routes: Routes = [
  {
    path: '',
    component: HelpComponent,
    children: childrenRoutes,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MarkdownModule.forRoot({ loader: HttpClient }),
  ],
  exports: [RouterModule, MarkdownModule],
})
export class HelpRoutingModule {}
