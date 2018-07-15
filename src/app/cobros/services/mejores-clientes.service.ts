import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ConfigService } from '../../utils/config.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MejoresClientesService {
  private apiUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = configService.buildApiUrl('crm/mejoresClientes');
  }

  list(ejercicio: number, mes: number): Observable<any[]> {
    const url = `${this.apiUrl}/${ejercicio}/${mes}`;
    return this.http
      .get<any[]>(url)
      .pipe(catchError(err => Observable.of(err)));
  }

  generar(command: any): Observable<any[]> {
    const url = `${this.apiUrl}/generarComisiones`;
    const params = new HttpParams()
      .set('fechaInicial', command.fechaInicial)
      .set('fechaFinal', command.fechaFinal)
      .set('tipo', command.tipo);
    return this.http
      .get<any[]>(url, { params: params })
      .pipe(catchError(err => Observable.of(err)));
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
      .pipe(catchError(error => Observable.throw(error)));
  }
}
