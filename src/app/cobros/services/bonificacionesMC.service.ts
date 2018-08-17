
import {throwError as observableThrowError, of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { ConfigService } from '../../utils/config.service';
import { catchError } from 'rxjs/operators';
import { BonificacionMC } from '../models/bonificacionMC';

@Injectable()
export class BonificacionesMCService {
  private apiUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = configService.buildApiUrl('bonificacionesMC');
  }

  list(ejercicio: number, mes: number): Observable<BonificacionMC[]> {
    const url = `${this.apiUrl}/${ejercicio}/${mes}`;
    return this.http
      .get<any[]>(url)
      .pipe(catchError(err => observableOf(err)));
  }

  generar(ejercicio: number, mes: number): Observable<BonificacionMC[]> {
    const url = `${this.apiUrl}/generar/${ejercicio}/${mes}`;
    return this.http
      .get<any[]>(url)
      .pipe(catchError(err => observableOf(err)));
  }

  autorizar(bonificacionId: string): Observable<BonificacionMC> {
    const url = `${this.apiUrl}/autorizar/${bonificacionId}`;
    return this.http
      .get<BonificacionMC>(url)
      .pipe(catchError(err => observableOf(err)));
  }

  autorizacionBatch(
    ejercicio: number,
    mes: number
  ): Observable<BonificacionMC[]> {
    const url = `${this.apiUrl}/autorizarBatch/${ejercicio}/${mes}`;
    return this.http
      .get<any[]>(url)
      .pipe(catchError(err => observableOf(err)));
  }

  suspender(
    bonificacionId: string,
    comentario: string
  ): Observable<BonificacionMC> {
    const params = new HttpParams().set('comentario', comentario);
    const url = `${this.apiUrl}/suspender/${bonificacionId}`;
    return this.http
      .get<BonificacionMC>(url, { params: params })
      .pipe(catchError(err => observableOf(err)));
  }

  reporte(ejercicio: number, mes: number): Observable<any> {
    const url = `${this.apiUrl}/reporte`;
    const params = new HttpParams()
      .set('EJERCICIO', ejercicio.toString())
      .set('MES', mes.toString());
    const headers = new HttpHeaders().set('Content-type', 'application/pdf');
    return this.http
      .get(url, { headers: headers, responseType: 'blob', params: params })
      .pipe(catchError(error => observableThrowError(error)));
  }
}
