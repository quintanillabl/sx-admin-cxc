import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { ConfigService } from 'app/utils/config.service';
import { AntiguedadDeSalgo } from '../models/antiguedadDeSalgo';
import { Cliente } from '../../clientes/models';

@Injectable()
export class AntiguedadService {
  constructor(private http: HttpClient, private config: ConfigService) {}

  list(): Observable<AntiguedadDeSalgo[]> {
    return this.http
      .get<AntiguedadDeSalgo[]>(
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
}
