import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import {throwError as observableThrowError,  Observable } from 'rxjs';

import { Cobrador } from '../models/cobrador';
import { ConfigService } from 'app/utils/config.service';

@Injectable()
export class CobradoresService {
  apiUrl: string;
  constructor(private http: HttpClient, private config: ConfigService) {
    this.apiUrl = config.buildApiUrl('cobradores');
  }

  list(): Observable<Cobrador[]> {
    return this.http
      .get<Cobrador[]>(this.apiUrl)
      .pipe(catchError(error => observableThrowError(error)));
  }

  save(cobrador: Cobrador): Observable<Cobrador> {
    return this.http
      .post<Cobrador>(this.apiUrl, cobrador)
      .pipe(catchError(error => observableThrowError(error)));
  }

  update(cobrador: Cobrador): Observable<Cobrador> {
    const url = `${this.apiUrl}/${cobrador.id}`;
    return this.http
      .put<Cobrador>(url, cobrador)
      .pipe(catchError(error => observableThrowError(error)));
  }

  delete(cobrador: Cobrador) {
    const url = `${this.apiUrl}/${cobrador.id}`;
    return this.http
      .delete(url)
      .pipe(catchError(error => observableThrowError(error)));
  }
}
