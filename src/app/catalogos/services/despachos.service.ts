import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { throwError as observableThrowError, Observable } from 'rxjs';

import { ConfigService } from '../../utils/config.service';
import { catchError } from 'rxjs/operators';

import { Despacho } from '../models/despacho';

@Injectable()
export class DespachosService {
  private apiUrl: string;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.apiUrl = config.buildApiUrl('cxc/despachos');
  }

  list(): Observable<Despacho[]> {
    return this.http
      .get<Despacho[]>(this.apiUrl)
      .pipe(catchError(error => observableThrowError(error)));
  }

  save(despacho: Despacho): Observable<Despacho> {
    return this.http
      .post<Despacho>(this.apiUrl, despacho)
      .pipe(catchError(error => observableThrowError(error)));
  }

  update(despacho: Despacho): Observable<Despacho> {
    const url = `${this.apiUrl}/${despacho.id}`;
    return this.http
      .put<Despacho>(url, despacho)
      .pipe(catchError(error => observableThrowError(error)));
  }

  delete(despacho: Despacho) {
    const url = `${this.apiUrl}/${despacho.id}`;
    return this.http
      .delete<Despacho>(url)
      .pipe(catchError(error => observableThrowError(error)));
  }
}
