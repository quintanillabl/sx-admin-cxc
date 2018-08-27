
import {of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { ConfigService } from '../../utils/config.service';
import { catchError } from 'rxjs/operators';

import { CuentaPorCobrar } from '../models/cuentaPorCobrar';

import * as _ from 'lodash';

@Injectable()
export class FacturasService {
  private apiUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = configService.buildApiUrl('cuentasPorCobrar');
  }

  list(filtro: {}): Observable<CuentaPorCobrar[]> {
    let params = new HttpParams();
    _.forIn(filtro, (value, key) => {
      params = params.set(key, value);
    });
    const url = `${this.apiUrl}/search`;
    return this.http
      .get<CuentaPorCobrar[]>(url, { params: params })
      .pipe(catchError(err => observableOf(err)));
  }

  imprimirCfdi(cfdi: any) {
    const endpoint = `cfdis/print/${cfdi.id}`;
    const url = this.configService.buildApiUrl(endpoint);
    const headers = new HttpHeaders().set('Content-type', 'application/pdf');
    return this.http.get(url, {
      headers: headers,
      responseType: 'blob'
    });
  }

  descargarXml(cfdi: any) {
    const endpoint = `cfdis/descargarXml/${cfdi.id}`;
    const url = this.configService.buildApiUrl(endpoint);
    const headers = new HttpHeaders().set('Content-type', 'text/xml');
    return this.http.get(url, {
      headers: headers,
      responseType: 'blob'
    });
  }

  envioBatch(cliente: any, facturas, target: string): Observable<any> {
    const endpoint = `cfdis/envioBatch`;
    const url = this.configService.buildApiUrl(endpoint);
    const command = {
      target,
      facturas: facturas.map(item => item.cfdi.id),
      cliente: cliente.id
    };
    return this.http
      .put<any>(url, command)
      .pipe(catchError(err => observableOf(err)));
  }

  saldarCxc(cxcId: string) {
    const url = `${this.apiUrl}/saldar/${cxcId}`;
    return this.http.put(url, {}).pipe(catchError(err => observableOf(err)));
  }
}
