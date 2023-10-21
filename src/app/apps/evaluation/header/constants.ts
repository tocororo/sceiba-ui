import { Environment } from 'toco-lib';
import { MenuElement } from './header.component';

export const ME: MenuElement[] = [
  {
    nameTranslate : "INICIO",
    href : "/",
    target :"_blank",
    useRouterLink : true
  },
  {
    nameTranslate : "ORGANIZACIONES",
    href : "https://organizaciones.sceiba.cu",
    target :"_blank",
    useRouterLink : false
  },
  {
    nameTranslate : "PERSONAS",
    href : "https://personas.sceiba.cu",
    target :"_blank",
    useRouterLink : false
  },
  {
    nameTranslate : "CATALOGO",
    href : "https://catalogo.sceiba.cu",
    target :"_blank",
    useRouterLink : false
  },
  {
    nameTranslate : "REVISTAS_MES",
    href : "https://revistasmes.sceiba.cu",
    target :"_blank",
    useRouterLink : false
  },
  {
    nameTranslate : "EVALUACION",
    href : "https://evaluaciones.sceiba.cu",
    target :"_blank",
    useRouterLink : false
  },
  {
    nameTranslate : "VOCABULARIO",
    href : "https://vocabularios.sceiba.cu/es",
    target :"_blank",
    useRouterLink : false
  }
];

export const menuHelp: MenuElement[] = [
  {
    nameTranslate : "ACERCA_DE",
    href : "/help/about",
    useRouterLink : true,
    icon: "info"
  },
  {
    nameTranslate : "PRIVACIDAD",
    href : "/help/policy",
    useRouterLink : true,
    icon: "security"
  },
  {
    nameTranslate : "CONTACTOS",
    href : "/help/contact",
    useRouterLink : true,
    icon: "contacts"
  }
];
