
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

import { HelpComponent } from './help/help.component';
import { StaticPagesComponent } from './static-pages/static-pages.component';

const helpRoutes: Routes = [
	{
		path: '',
		component: HelpComponent,
		children: [
			{
				path: 'faq',
				component: StaticPagesComponent,
				data: { src: 'assets/markdown/sceiba/faq', title: 'FAQ' }
			  },
			  {
				path: 'about',
				component: StaticPagesComponent,
				data: { src: 'assets/markdown/sceiba/about', title: 'Sobre Nosotros' }
			  },
			  {
				path: 'help',
				component: StaticPagesComponent,
				data: { src: 'assets/markdown/sceiba/help', title: 'Ayuda' }
			  },
			  {
				path: 'contact',
				component: StaticPagesComponent,
				data: { src: 'assets/markdown/sceiba/contact', title: 'Contacto' }
			  },
			  {
				path: 'policy',
				component: StaticPagesComponent,
				data: { src: 'assets/markdown/sceiba/policy', title: 'Política de Privacidad' }
			  }
		]
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(helpRoutes),
		MarkdownModule.forRoot({ loader: HttpClient })
	],

	exports: [RouterModule, MarkdownModule]
})
export class HelpRoutingModule
{ }
