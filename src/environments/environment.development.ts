import { Environment } from 'toco-lib';

class EnvironmentImpl implements Environment {
  production = false;
  sceibaHost = 'https://sceiba.reduniv.edu.cu/';
  cuorHost = 'https://sceiba.reduniv.edu.cu/';
  sceibaApi = 'https://sceiba.reduniv.edu.cu/api/';
  cuorApi = 'https://sceiba.reduniv.edu.cu/api/';

  appHost = 'https://localhost:4200';
  appName = 'Organizaciones - Sceiba';

  websiteUsername_Twitter = '@SceibaCuba';
  websiteUsername_Facebook = '@sceiba';

  oauthRedirectUri = 'https://localhost:4200/';
  oauthClientId = 'vvi64JKH9LxtFs6RbBFI3ERrfxcYWYd0QltCPXnK';
  oauthScope = 'user:email';
  topOrganizationPID = 'orgaid.223';
  cachableUrls = [];

  matomoUrl = 'https://crai-stats.upr.edu.cu/';
  matomoSiteId = 7;

  sceiba = '/';
  discover = '/search';
  catalog = '/sources';
  revistasmes = '/revistasmes';
  organizations = '/orgs';
  persons = '/persons';
  vocabularies = 'https://vocabularios.sceiba.cu/';
  moodle = 'https://courses.sceiba.org/';
  evaluations = '/eval';


  oauthInfo = {
    serverHost: this.sceibaHost,
    loginUrl: this.sceibaHost + 'oauth/internal/authorize',
    tokenEndpoint: this.sceibaHost + 'oauth/token',
    userInfoEndpoint: this.sceibaApi + 'me',
    appHost: this.appHost,
    appName: this.appName,
    oauthRedirectUri: this.oauthRedirectUri,
    oauthClientId: this.oauthClientId,
    oauthScope: this.oauthScope,
  }

}

export const environment = new EnvironmentImpl();

export const allowedURLS = ['https://sceiba.reduniv.edu.cu/api/'];
