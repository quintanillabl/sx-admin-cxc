
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { Operador } from '../models/operador';
import { ConfigService } from 'app/utils/config.service';

@Injectable()
export class OperadoresService {
  apiUrl: string;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.apiUrl = config.buildApiUrl('cxc/operadores');
  }

  list(): Observable<Operador[]> {
    return this.http
      .get<Operador[]>(this.apiUrl)
      .pipe(catchError(error => observableThrowError(error)));
  }

  save(operador: Operador): Observable<Operador> {
    return this.http
      .post<Operador>(this.apiUrl, operador)
      .pipe(catchError(error => observableThrowError(error)));
  }

  update(operador: Operador): Observable<Operador> {
    const url = `${this.apiUrl}/${operador.id}`;
    return this.http
      .put<Operador>(url, operador)
      .pipe(catchError(error => observableThrowError(error)));
  }

  delete(operador: Operador) {
    const url = `${this.apiUrl}/${operador.id}`;
    return this.http
      .delete(url)
      .pipe(catchError(error => observableThrowError(error)));
  }
}
