import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  NavigationStart,
  Event as NavigationEvent,
} from '@angular/router';
import { isMobile } from '../../is-mobile';

export interface HelpDoc {
  label: string;
  path?: string;
  children?: HelpDoc[];
}

@Component({
  selector: 'sceiba-ui-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
})
export class HelpComponent implements OnInit {
  docsList: HelpDoc[] = [];
  currentPath: string;
  routerEvent;
  mode: "side" | "push" | "over" = "side"

  public constructor(private route: ActivatedRoute, private router: Router) {}

  public ngOnInit(): void {
    console.log(isMobile());
    this.mode = isMobile() ? "over" : "side"

    this.currentPath = this.router.url;
    this.routerEvent = this.router.events.subscribe(
      (event: NavigationEvent) => {
        if (event instanceof NavigationStart) {
          this.currentPath = event.url;
        }
      }
    );

    this.docsList = [
      {
        label: 'Sceiba',
        children: [
          { label: 'FAQ', path: '/help/faq' },
          { label: 'Ayuda', path: '/help/help' },
          { label: 'Acerca de', path: '/help/about' },
          { label: 'Equipo y contactos', path: '/help/contact' },
          { label: 'Política de Privacidad', path: '/help/policy' },
          { label: 'Términos de uso', path: '/help/terms' },
        ],
      },
      {
        label: 'Organizaciones',
        children: [
          { label: 'FAQ', path: '/help/organizations/faq' },
          { label: 'Ayuda', path: '/help/organizations/help' },
          { label: 'Acerca de', path: '/help/organizations/about' },
          { label: 'Equipo y contactos', path: '/help/organizations/contact' },
          {
            label: '¿Nueva Organización?',
            path: '/help/organizations/inclussion',
          },
        ],
      },

      {
        label: 'Revistas Mes',
        children: [
          { label: 'FAQ', path: '/help/revistasmes/faq' },
          { label: 'Ayuda', path: '/help/revistasmes/help' },
          { label: 'Acerca de', path: '/help/revistasmes/about' },
          { label: 'Equipo y contactos', path: '/help/revistasmes/contact' },
        ],
      },
      {
        label: 'Catálogo',
        children: [
          { label: 'FAQ', path: '/help/catalog/faq' },
          { label: 'Ayuda', path: '/help/catalog/help' },
          { label: 'Acerca de', path: '/help/catalog/about' },
          { label: 'Equipo y contactos', path: '/help/catalog/contact' },
        ],
      },
    ];
  }

  ngOnDestroy() {
    this.routerEvent.unsubscribe();
  }
}
