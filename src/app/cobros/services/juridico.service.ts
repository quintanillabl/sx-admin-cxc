import { of as observableOf, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { ConfigService } from '../../utils/config.service';
import { catchError } from 'rxjs/operators';

import { Juridico } from '../models';

import * as _ from 'lodash';

@Injectable()
export class JuridicoService {
  private apiUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = configService.buildApiUrl('cxc/juridico');
  }

  list(filtro: {}): Observable<Juridico[]> {
    let params = new HttpParams();
    _.forIn(filtro, (value, key) => {
      params = params.set(key, value);
    });
    return this.http
      .get<Juridico[]>(this.apiUrl, { params: params })
      .pipe(catchError(err => observableOf(err)));
  }

  save(entity: Partial<Juridico>): Observable<Juridico> {
    return this.http
      .post<Juridico[]>(this.apiUrl, entity)
      .pipe(catchError(err => observableOf(err)));
  }

  mandarFacturas(command: any) {
    const url = `${this.apiUrl}/mandarFacturas`;
    return this.http
      .put(url, command)
      .pipe(catchError(err => observableOf(err)));
  }
}
