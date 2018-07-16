import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ConfigService } from '../../utils/config.service';
import { catchError } from 'rxjs/operators';
import { BonificacionMC } from '../models/bonificacionMC';

@Injectable()
export class BonificacionesMCService {
  private apiUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = configService.buildApiUrl('crm/mejoresClientes');
  }

  list(ejercicio: number, mes: number): Observable<BonificacionMC[]> {
    const url = `${this.apiUrl}/${ejercicio}/${mes}`;
    return this.http
      .get<any[]>(url)
      .pipe(catchError(err => Observable.of(err)));
  }

  generar(ejercicio: number, mes: number): Observable<BonificacionMC[]> {
    const url = `${this.apiUrl}/generar/${ejercicio}/${mes}`;
    return this.http
      .get<any[]>(url)
      .pipe(catchError(err => Observable.of(err)));
  }

  reporte(ejercicio: number, mes: number): Observable<any> {
    const url = `${this.apiUrl}/reporte`;
    const params = new HttpParams()
      .set('EJERCICIO', ejercicio.toString())
      .set('MES', mes.toString());
    const headers = new HttpHeaders().set('Content-type', 'application/pdf');
    return this.http
      .get(url, { headers: headers, responseType: 'blob', params: params })
      .pipe(catchError(error => Observable.throw(error)));
  }
}
