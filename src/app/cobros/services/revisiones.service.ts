import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { ConfigService } from '../../utils/config.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class RevisionesService {
  private apiUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = configService.buildApiUrl('cxc/ventaCredito');
  }

  get(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  list(filtro?): Observable<any> {
    let params = new HttpParams();
    _.forIn(filtro, (value, key) => {
      params = params.set(key, value);
    });
    return this.http
      .get<any>(this.apiUrl, { params: params })
      .pipe(catchError(err => Observable.of(err)))
      .shareReplay();
  }

  actualizar(): Observable<Array<any>> {
    const url = `${this.apiUrl}/actualizar`;
    return this.http.get<Array<any>>(url);
  }

  delete(id: string) {
    return this.http.delete(this.apiUrl + '/' + id);
  }

  generar(): Observable<any> {
    const url = `${this.apiUrl}/generar`;
    return this.http.post(url, {}).pipe(catchError(err => Observable.of(err)));
  }

  recalcular(): Observable<any> {
    const url = `${this.apiUrl}/recalcular`;
    return this.http.post(url, {}).pipe(catchError(err => Observable.of(err)));
  }
}
