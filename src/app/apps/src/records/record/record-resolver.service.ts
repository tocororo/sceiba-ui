
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Environment, Record, SearchResponse, SearchService } from 'toco-lib';


@Injectable({
  providedIn: 'root'
})
export class RecordResolverService  {

  private prefix = 'records';

  private http: HttpClient;

  constructor(
    private router: Router,
    private service: SearchService,
    private env: Environment,
    private handler: HttpBackend)
    {

      this.http = new HttpClient(handler);
    }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : SearchResponse<Record> | Observable<SearchResponse<Record>> | Promise<SearchResponse<Record>>
  {
    let uuid = route.paramMap.get('uuid');

		return this.getRecordById(uuid).pipe(
      take(1),
      map(node => {
          if (node)
          {
            console.log('OOOOOOOOOOOOOOOO', node)
            return node;
          }
          else
          {
            this.router.navigate(['/']);
          }
      })
    );
  }

  getRecordById(id: string): Observable<SearchResponse<Record>>
  {
    // TODO: Esta línea es ineficiente, puede ser optimizada.
    const req = this.env.sceibaApi + '/pid/record/' + id;

    return this.http.get<SearchResponse<Record>>(req);
  }


}
