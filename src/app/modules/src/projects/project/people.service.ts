import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {
  HttpBackend,
  HttpClient,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { OAuthStorage } from "angular-oauth2-oidc";

import {
  cloneValue,
  Environment,
  Hit,
  Organization,
  SearchResponse,
} from "toco-lib";

import { Project } from "./person.entity";

/**
 * Represents the service that communicates with the backend for all issues
 * that refer to work with people.
 */
@Injectable({
  providedIn: "root",
})
export class ProjectService {
  private readonly _prefix = "projects";

  // _http: HttpClient;

  public constructor(
    private _env: Environment,
    private handler: HttpBackend,
    private oAuthStorage: OAuthStorage,
    private _http: HttpClient
  ) {
    {
      this._http = new HttpClient(this.handler);
    }
  }

  /**
   * Constructs a `GET` request that interprets the body as a JSON object and returns
   * the response body in the `SearchResponse<Person>` type.
   * Returns a people group that follows a search criteria.
   * E.g.: lang=es&size=15&page=0&q=pinar%20del%20rio&country=Cuba&status=active
   * @param currentLang Language currently used as string.
   * The Spanish language is: 'es'.
   * The English language is: 'en'.
   * @return An `Observable` of the `HTTPResponse`, with a response body in the `SearchResponse<Person>` type.
   */
  public getProjects(params: HttpParams): Observable<SearchResponse<Project>> {
    const options = {
      params: params,
    };
    const req = this._env.sceibaApi + "search/projects/";
    // console.log(req);
    return this._http.get<SearchResponse<Project>>(req, { params });
  }

  public getProjectById(uuid: string): Observable<any> {
    const req = this._env.sceibaApi + "pid/projects/" + uuid;
    return this._http.get<SearchResponse<Project>>(req);
  }

  saveImport(file: File) {
    let token = this.oAuthStorage.getItem("access_token");
    const formData = new FormData();
    formData.append("file", file);
    console.log(file);
    const req = this._env.sceibaApi + "projects/import/";
    // const headers = new HttpHeaders({
    //   enctype: "multipart/form-data",
    //   "Content-Type": "multipart/form-data",
    //   "Accept": "*/*",
    //   // Authorization: "Bearer " + token,
    //   "Access-Control-Allow-Origin": "*",
    // });
    return this._http.post(req, formData);
  }

  createProject(data) {
    let token = this.oAuthStorage.getItem("access_token");
    const req = this._env.sceibaApi + "projects/new";
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "*/*",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    });
    return this._http.post(req, data, { headers });
  }

  updateProject(id, data) {
    let token = this.oAuthStorage.getItem("access_token");
    const req = this._env.sceibaApi + "projects/" + id;
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "*/*",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    });
    return this._http.patch(req, data, { headers });
  }

  deleteProject(id): Observable<any> {
    let token = this.oAuthStorage.getItem("access_token");
    const req = this._env.sceibaApi + "projects/" + id;
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "*/*",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    });
    return this._http.delete(req, { headers });
  }
}
