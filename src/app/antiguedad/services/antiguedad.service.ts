
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { ConfigService } from 'app/utils/config.service';
import { AntiguedadDeSaldo } from '../models/antiguedadDeSaldo';
import { Cliente } from '../../clientes/models';

@Injectable()
export class AntiguedadService {
  constructor(private http: HttpClient, private config: ConfigService) {}

  list(): Observable<AntiguedadDeSaldo[]> {
    return this.http
      .get<AntiguedadDeSaldo[]>(
        this.config.buildApiUrl('cuentasPorCobrar/antiguedad')
      )
      .pipe(catchError(error => observableThrowError(error)));
  }

  cxc(clienteId: string): Observable<Cliente[]> {
    const clieUrl = this.config.buildApiUrl('clientes');
    const url = `${clieUrl}/${clienteId}/cxc`;
    return this.http
      .get<Cliente[]>(url)
      .pipe(catchError(error => observableThrowError(error)));
  }

  print(command: {
    fecha: string;
    sort: string;
    order: string;
  }): Observable<any> {
    const params = new HttpParams()
      .set('fecha', command.fecha)
      .set('sort', command.sort)
      .set('order', command.order);
    const url = this.config.buildApiUrl('cuentasPorCobrar/antiguedad/print');
    const headers = new HttpHeaders().set('Content-type', 'application/pdf');
    return this.http
      .get(url, { headers: headers, params: params, responseType: 'blob' })
      .pipe(catchError(error => observableThrowError(error)));
  }

  antiguedadPorCliente(cliente, fecha): Observable<any> {
    const params = new HttpParams().set('cliente', cliente).set('fecha', fecha);
    const url = this.config.buildApiUrl(
      'cuentasPorCobrar/antiguedad/antiguedadPorCliente'
    );
    const headers = new HttpHeaders().set('Content-type', 'application/pdf');
    return this.http
      .get(url, { headers: headers, responseType: 'blob', params: params })
      .pipe(catchError(error => observableThrowError(error)));
  }

  reporteDeCobranzaCOD(sucursal, fecha): Observable<any> {
    const url = this.config.buildApiUrl(
      'cuentasPorCobrar/antiguedad/reporteDeCobranzaCOD'
    );
    const params = new HttpParams()
      .set('sucursal', sucursal)
      .set('fecha', fecha);
    const headers = new HttpHeaders().set('Content-type', 'application/pdf');
    return this.http
      .get(url, { headers: headers, responseType: 'blob', params: params })
      .pipe(catchError(error => observableThrowError(error)));
  }

  clientesSuspendidosCre(): Observable<any> {
    const url = this.config.buildApiUrl(
      'cuentasPorCobrar/antiguedad/clientesSuspendidosCre'
    );
    const headers = new HttpHeaders().set('Content-type', 'application/pdf');
    return this.http
      .get(url, { headers: headers, responseType: 'blob' })
      .pipe(catchError(error => observableThrowError(error)));
  }

  facturasConNotaDevolucion(command: any): Observable<any> {
    const params = new HttpParams()
      .set('sucursal', command.sucursal)
      .set('origen', command.origen)
      .set('fechaIni', command.fechaIni)
      .set('fechaFin', command.fechaFin);
    const url = this.config.buildApiUrl(
      'cuentasPorCobrar/antiguedad/facturasConNotaDevolucion'
    );
    const headers = new HttpHeaders().set('Content-type', 'application/pdf');
    return this.http
      .get(url, { headers: headers, responseType: 'blob', params: params })
      .pipe(catchError(error => observableThrowError(error)));
  }

  exceptionesDescuentos(command: any): Observable<any> {
    const params = new HttpParams()
      .set('sucursal', command.sucursal)
      .set('origen', command.origen)
      .set('fechaIni', command.fechaIni)
      .set('fechaFin', command.fechaFin);
    const url = this.config.buildApiUrl(
      'cuentasPorCobrar/antiguedad/reporteExceptionesDescuentos'
    );
    const headers = new HttpHeaders().set('Content-type', 'application/pdf');
    return this.http
      .get(url, { headers: headers, responseType: 'blob', params: params })
      .pipe(catchError(error => observableThrowError(error)));
  }
}
