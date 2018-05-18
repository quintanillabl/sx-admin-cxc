import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    return this.http
      .get<any>(this.apiUrl)
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

  reporte() {
    const url = `${this.apiUrl}/print`;
    const headers = new HttpHeaders().set('Content-type', 'application/pdf');
    return this.http
      .get(url, { headers: headers, responseType: 'blob' })
      .pipe(catchError(error => Observable.throw(error)));
  }
}
