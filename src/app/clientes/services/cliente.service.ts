import { of as observableOf, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import * as _ from 'lodash';

import { ConfigService } from 'app/utils/config.service';
import { Cliente } from '../models';
import { CuentaPorCobrar } from '../../cobros/models/cuentaPorCobrar';

@Injectable()
export class ClienteService {
  private apiUrl: string;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.apiUrl = config.buildApiUrl('clientes');
  }

  get(id: string): Observable<Cliente> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Cliente>(url);
  }

  list(filtro?: any): Observable<Cliente[]> {
    let params = new HttpParams();
    _.forIn(filtro, (value, key) => {
      params = params.set(key, value);
    });
    return this.http
      .get<Cliente[]>(this.apiUrl, { params: params })
      .pipe(catchError(error => observableOf(error)));
  }

  save(cliente: Cliente): Observable<Cliente> {
    return this.http
      .post<Cliente>(this.apiUrl, cliente)
      .pipe(catchError(error => observableOf(error)));
  }

  update(cliente: Cliente): Observable<Cliente> {
    const url = `${this.apiUrl}/${cliente.id}`;
    // console.log('Uodate on server: ', cliente, url);
    return this.http
      .put<Cliente>(url, cliente)
      .pipe(catchError(error => observableOf(error)));
  }

  delete(cliente: Cliente) {
    const url = `${this.apiUrl}/${cliente.id}`;
    return this.http.delete(url).pipe(catchError(error => observableOf(error)));
  }

  facturas(cliente: Cliente, filtro?: any): Observable<Cliente[]> {
    let params = new HttpParams();
    _.forIn(filtro, (value, key) => {
      params = params.set(key, value);
    });
    const url = `${this.apiUrl}/${cliente.id}/facturas`;
    return this.http.get<Cliente[]>(url, { params: params });
  }

  cxc(cliente: Cliente, filtro?: any): Observable<CuentaPorCobrar[]> {
    let params = new HttpParams();
    _.forIn(filtro, (value, key) => {
      params = params.set(key, value);
    });
    const url = `${this.apiUrl}/${cliente.id}/cxc`;
    return this.http.get<CuentaPorCobrar[]>(url, { params: params });
  }

  saldarCxc(cxcId) {
    const url = this.config.buildApiUrl(`cuentasPorCobrar/saldar/${cxcId}`);
    return this.http.put(url, {}).pipe(catchError(err => observableOf(err)));
  }

  notas(cliente: Cliente, filtro?: any): Observable<any[]> {
    let params = new HttpParams();
    _.forIn(filtro, (value, key) => {
      params = params.set(key, value);
    });
    const url = `${this.apiUrl}/${cliente.id}/notas`;
    return this.http.get<any[]>(url, { params: params });
  }

  socios(cliente: Cliente): Observable<any[]> {
    const url = `${this.apiUrl}/${cliente.id}/socios`;
    return this.http.get<any[]>(url);
  }

  updateSocio(clienteId: string, socio: any) {
    const url = `${this.apiUrl}/${clienteId}/socios/${socio.id}`;
    return this.http.put(url, socio);
  }

  cobros(cliente: Cliente, filtro?: any): Observable<Cliente[]> {
    let params = new HttpParams();
    _.forIn(filtro, (value, key) => {
      params = params.set(key, value);
    });
    const url = `${this.apiUrl}/${cliente.id}/cobros`;
    return this.http.get<Cliente[]>(url, { params: params });
  }

  estadoDeCuenta(cliente: Cliente, fecha: Date, cartera: string) {
    const url = `${this.apiUrl}/estadoDeCuenta`;
    const params = new HttpParams()
      .set('fecha', fecha.toISOString())
      .set('cartera', cartera)
      .set('cliente', cliente.id);
    const headers = new HttpHeaders().set('Content-type', 'application/pdf');
    return this.http.get(url, {
      headers: headers,
      params: params,
      responseType: 'blob'
    });
  }
}
