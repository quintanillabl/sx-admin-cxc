import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ConfigService } from '../../utils/config.service';
import { catchError } from 'rxjs/operators';

import { VentaCredito } from '../models/ventaCredito';

@Injectable()
export class RevisionesService {
  private apiUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = configService.buildApiUrl('cxc/ventaCredito');
  }

  list(): Observable<VentaCredito[]> {
    const url = `${this.apiUrl}`;
    return this.http
      .get<VentaCredito[]>(url)
      .pipe(catchError(err => Observable.of(err)));
  }

  update(credito: VentaCredito): Observable<VentaCredito> {
    const url = `${this.apiUrl}/${credito.id}`;
    return this.http
      .put<VentaCredito>(url, credito)
      .pipe(catchError(error => Observable.throw(error)));
  }

  batchUpdate(command: {
    template: Object;
    facturas: VentaCredito[];
  }): Observable<VentaCredito[]> {
    const url = `${this.apiUrl}/batchUpdate`;
    return this.http
      .post<VentaCredito[]>(url, command)
      .pipe(catchError(error => Observable.throw(error)));
  }

  recepcionCxc(facturas: VentaCredito[]): Observable<VentaCredito[]> {
    const url = `${this.apiUrl}/registrarRecepcionCxC`;
    return this.http
      .put<VentaCredito[]>(url, { facturas })
      .pipe(catchError(error => Observable.throw(error)));
  }

  cancelarRecepcionCxC(facturas: VentaCredito[]): Observable<VentaCredito[]> {
    const url = `${this.apiUrl}/cancelarRecepcionCxC`;
    return this.http
      .put<VentaCredito[]>(url, { facturas })
      .pipe(catchError(error => Observable.throw(error)));
  }

  registrarRvisada(facturas: VentaCredito[]): Observable<VentaCredito[]> {
    const url = `${this.apiUrl}/registrarRvisada`;
    return this.http
      .put<VentaCredito[]>(url, { facturas })
      .pipe(catchError(error => Observable.throw(error)));
  }

  actualizar(): Observable<Array<any>> {
    const url = `${this.apiUrl}/actualizar`;
    return this.http.get<Array<any>>(url);
  }

  generar(): Observable<any> {
    const url = `${this.apiUrl}/generar`;
    return this.http.post(url, {}).pipe(catchError(err => Observable.of(err)));
  }

  recalcular(): Observable<any> {
    const url = `${this.apiUrl}/recalcular`;
    return this.http.post(url, {}).pipe(catchError(err => Observable.of(err)));
  }

  reporteDeRevision(command: any) {
    let params = new HttpParams().set('fecha', command.fecha);
    if (command.cliente !== null) {
      params = params.set('cliente', command.cliente.id);
    }
    if (command.cobrador) {
      params = params.set('cobrador', command.cobrador.id);
    }

    const url = `${this.apiUrl}/print`;
    const headers = new HttpHeaders().set('Content-type', 'application/pdf');
    return this.http
      .get(url, { headers: headers, responseType: 'blob', params: params })
      .pipe(catchError(error => Observable.throw(error)));
  }
}
