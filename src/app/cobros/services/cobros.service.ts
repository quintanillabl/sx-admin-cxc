import { throwError as observableOf, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import * as _ from 'lodash';

import { ConfigService } from '../../utils/config.service';
import { Cobro } from '../models/cobro';
import { catchError } from 'rxjs/operators';
import { Cliente } from '../../clientes/models';
import { CuentaPorCobrar } from '../models';

@Injectable()
export class CobrosService {
  private apiUrl: string;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.apiUrl = config.buildApiUrl('cxc/cobro');
  }

  get(id: string): Observable<Cobro> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Cobro>(url);
  }

  list(filtro: {} = {}): Observable<Cobro[]> {
    let params = new HttpParams();
    _.forIn(filtro, (value, key) => {
      params = params.set(key, value);
    });
    return this.http
      .get<Cobro[]>(this.apiUrl, { params: params })
      .pipe(catchError(err => observableOf(err)));
  }

  disponibles(filtro: {} = {}): Observable<Cobro[]> {
    let params = new HttpParams();
    _.forIn(filtro, (value, key) => {
      params = params.set(key, value);
    });
    const url = `${this.apiUrl}/disponibles`;
    return this.http
      .get<Cobro[]>(url, { params: params })
      .pipe(catchError(err => observableOf(err)));
  }

  cobrosMonetarios(filtro: any = {}) {
    let params = new HttpParams();
    _.forIn(filtro, (value, key) => {
      params = params.set(key, value);
    });
    const url = `${this.apiUrl}/cobrosMonetarios`;
    return this.http
      .get<Cobro[]>(url, { params: params })
      .pipe(catchError(err => observableOf(err)));
  }

  reporteDeComisionesTarjeta(sucursal, fecha: Date) {
    const params = new HttpParams()
      .set('sucursal', sucursal)
      .set('fecha', fecha.toISOString());
    const headers = new HttpHeaders().set('Content-type', 'application/pdf');
    const url = `${this.apiUrl}/reporteDeComisionesTarjeta`;
    return this.http.get(url, {
      headers: headers,
      params: params,
      responseType: 'blob'
    });
  }

  save(com: Cobro): Observable<Cobro> {
    return this.http.post<Cobro>(this.apiUrl, com);
  }

  update(com: Cobro): Observable<Cobro> {
    const url = `${this.apiUrl}/${com.id}`;
    return this.http.put<Cobro>(url, com);
  }

  delete(id: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  saldar(com: Cobro): Observable<Cobro> {
    const url = `${this.apiUrl}/saldar/${com.id}`;
    return this.http.put<Cobro>(url, {});
  }

  sucursales(): Observable<any> {
    const params = new HttpParams().set('activas', 'activas');
    const url = this.config.buildApiUrl('sucursales');
    return this.http.get<Observable<any>>(url, { params: params });
  }

  cuentasPorCobrar(
    cliente: { id: string; nombre: string },
    cartera
  ): Observable<any> {
    const params = new HttpParams().set('cartera', cartera);
    const url = this.config.buildApiUrl(
      `cuentasPorCobrar/pendientes/${cliente.id}`
    );
    return this.http.get<Observable<any>>(url, { params: params });
  }

  aplicarCobro(cobro: Cobro, cxc: any) {
    const params = new HttpParams().set('cxc', cxc.id);
    const url = `${this.apiUrl}/aplicar/${cobro.id}`;
    return this.http
      .put(url, {}, { params: params })
      .pipe(catchError(err => observableOf(err)));
  }

  registrarAcplicaciones(
    cobro: Cobro,
    cuentas: CuentaPorCobrar[],
    fecha: Date
  ): Observable<Cobro> {
    const url = `${this.apiUrl}/aplicar/${cobro.id}`;
    const cxcs = cuentas.map(item => {
      return { id: item.id };
    });
    const command = {
      cobro: cobro.id,
      cuentas: cxcs,
      fecha: fecha.toISOString()
    };
    return this.http
      .put<Cobro>(url, command)
      .pipe(catchError(err => observableOf(err)));
  }

  generarRecibo(cobro: Cobro): Observable<Cobro> {
    const url = `${this.apiUrl}/timbrar/${cobro.id}`;
    return this.http
      .put<Cobro>(url, {}, {})
      .pipe(catchError(err => observableOf(err)));
  }

  reporteDeCobranza(fecha: Date, cartera: string) {
    const url = `${this.apiUrl}/reporteDeCobranza`;
    const params = new HttpParams()
      .set('fecha', fecha.toISOString())
      .set('cartera', cartera);
    const headers = new HttpHeaders().set('Content-type', 'application/pdf');
    return this.http.get(url, {
      headers: headers,
      params: params,
      responseType: 'blob'
    });
  }

  imprimirRecibo(cobro: Cobro) {
    const url = `${this.apiUrl}/imprimirRecibo/${cobro.id}`;
    const headers = new HttpHeaders().set('Content-type', 'application/pdf');
    return this.http
      .get(url, {
        headers: headers,
        responseType: 'blob'
      })
      .subscribe(
        res => {
          const blob = new Blob([res], {
            type: 'application/pdf'
          });
          const fileURL = window.URL.createObjectURL(blob);
          window.open(fileURL, '_blank');
        },
        error => console.log('Error ', error)
      );
  }
}
