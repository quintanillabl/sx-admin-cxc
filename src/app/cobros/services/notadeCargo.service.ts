
import {shareReplay} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import { ConfigService } from '../../utils/config.service';
import { NotaDeCargo } from '../models/notaDeCargo';

@Injectable()
export class NotadecargoService {
  private apiUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = configService.buildApiUrl('cxc/notasDeCargo');
  }

  get(id: string): Observable<NotaDeCargo> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<NotaDeCargo>(url);
  }

  list(filtro?): Observable<NotaDeCargo[]> {
    let params = new HttpParams();
    _.forIn(filtro, (value, key) => {
      params = params.set(key, value);
    });
    return this.http
      .get<NotaDeCargo[]>(this.apiUrl, { params: params }).pipe(
      shareReplay());
  }

  buscarCuentasPorCobrar(filtro?): Observable<any> {
    let params = new HttpParams();
    _.forIn(filtro, (value, key) => {
      params = params.set(key, value);
    });
    const url = this.apiUrl + '/buscarCuentasPorCobrar';
    return this.http.get<any>(url, { params: params });
  }

  timbrar(nota) {
    const url = `${this.apiUrl}/timbrar/${nota.id}`;
    return this.http.post(url, {});
  }

  save(nota) {
    return this.http.post(this.apiUrl, nota);
  }

  update(nota): Observable<NotaDeCargo> {
    const url = `${this.apiUrl}/${nota.id}`;
    return this.http.put<NotaDeCargo>(url, nota);
  }

  print(nota) {
    const url = `${this.apiUrl}/print/${nota.id}`;
    const headers = new HttpHeaders().set('Content-type', 'application/pdf');
    return this.http.get(url, {
      headers: headers,
      responseType: 'blob'
    });
  }

  mostrarXml(nota): Observable<any> {
    const endpoint = `cfdis/mostrarXml/${nota.cfdi.id}`;
    const url = this.configService.buildApiUrl(endpoint);
    const headers = new HttpHeaders().set('Content-type', 'text/xml');
    return this.http.get(url, {
      headers: headers,
      responseType: 'blob'
    });
  }

  enviarPorEmail(cfdi, target: string): Observable<any> {
    const endpoint = `cfdis/enviarEmail/${cfdi.id}`;
    const params = new HttpParams().set('target', target);
    const url = this.configService.buildApiUrl(endpoint);
    return this.http.put(url, {}, { params: params });
  }

  delete(id: string) {
    return this.http.delete(this.apiUrl + '/' + id);
  }

  reporteDeNotasDeCargo(fechaInicial: Date, fechaFinal: Date, origen: string) {
    const params = new HttpParams()
      .set('fechaInicial', fechaInicial.toISOString())
      .set('fechaFinal', fechaFinal.toISOString())
      .set('ORIGEN', origen);
    const headers = new HttpHeaders().set('Content-type', 'application/pdf');
    const url = `${this.apiUrl}/reporteDeNotasDeCargo`;
    return this.http.get(url, {
      headers: headers,
      params: params,
      responseType: 'blob'
    });
  }
}
