import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
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
      .pipe(catchError(error => Observable.throw(error)));
  }

  cxc(clienteId: string): Observable<Cliente[]> {
    const clieUrl = this.config.buildApiUrl('clientes');
    const url = `${clieUrl}/${clienteId}/cxc`;
    return this.http
      .get<Cliente[]>(url)
      .pipe(catchError(error => Observable.throw(error)));
  }

  print(): Observable<any> {
    const url = this.config.buildApiUrl('cuentasPorCobrar/antiguedad/print');
    const headers = new HttpHeaders().set('Content-type', 'application/pdf');
    return this.http
      .get(url, { headers: headers, responseType: 'blob' })
      .pipe(catchError(error => Observable.throw(error)));
  }
}
