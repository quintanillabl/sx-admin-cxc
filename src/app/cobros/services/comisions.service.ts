
import {throwError as observableThrowError, of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { ConfigService } from '../../utils/config.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ComisionesService {
  private apiUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = configService.buildApiUrl('cxc/comisiones');
  }

  list(filtro: any): Observable<any[]> {
    const url = `${this.apiUrl}`;
    const params = new HttpParams()
      .set('fechaInicial', filtro.fechaInicial)
      .set('fechaFinal', filtro.fechaFinal);
    return this.http
      .get<any[]>(url, { params: params })
      .pipe(catchError(err => observableOf(err)));
  }

  generar(command: any): Observable<any[]> {
    const url = `${this.apiUrl}/generarComisiones`;
    const params = new HttpParams()
      .set('fechaInicial', command.fechaInicial)
      .set('fechaFinal', command.fechaFinal)
      .set('tipo', command.tipo);
    return this.http
      .get<any[]>(url, { params: params })
      .pipe(catchError(err => observableOf(err)));
  }

  reporte(command: any): Observable<any> {
    const url = `${this.apiUrl}/reporteDeComisiones`;
    const params = new HttpParams()
      .set('fechaInicial', command.fechaInicial)
      .set('fechaFinal', command.fechaFinal)
      .set('comisionista', command.comisionista)
      .set('tipo', command.tipo);
    const headers = new HttpHeaders().set('Content-type', 'application/pdf');
    return this.http
      .get(url, { headers: headers, responseType: 'blob', params: params })
      .pipe(catchError(error => observableThrowError(error)));
  }
}
