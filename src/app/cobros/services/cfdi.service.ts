import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ConfigService } from '../../utils/config.service';
import { Cfdi } from '../models/cfdi';

import * as _ from 'lodash';

@Injectable()
export class CfdiService {
  private apiUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = configService.buildApiUrl('cfdis');
  }

  mostrarXml(cfdi: Cfdi): Observable<any> {
    const url = `${this.apiUrl}/mostrarXml/${cfdi.id}`;
    const headers = new HttpHeaders().set('Content-type', 'text/xml');
    return this.http.get(url, {
      headers: headers,
      responseType: 'blob'
    });
  }

  enviarPorEmail(cfdi, target: string): Observable<any> {
    const params = new HttpParams().set('target', target);
    const url = `${this.apiUrl}/enviarEmail/${cfdi.id}`;
    return this.http.put(url, {}, { params: params });
  }
}
