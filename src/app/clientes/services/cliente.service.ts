import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { ConfigService } from 'app/utils/config.service';
import { Cliente } from '../models';

@Injectable()
export class ClienteService {
  private apiUrl: string;

  constructor(private http: HttpClient, config: ConfigService) {
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
    return this.http.get<Cliente[]>(this.apiUrl, { params: params });
  }

  save(cliente: Cliente) {
    return this.http.post(this.apiUrl, cliente);
  }

  update(cliente: Cliente) {
    const url = `${this.apiUrl}/${cliente.id}`;
    return this.http.put(url, cliente);
  }

  delete(id: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  facturas(cliente: Cliente, filtro?: any): Observable<Cliente[]> {
    let params = new HttpParams();
    _.forIn(filtro, (value, key) => {
      params = params.set(key, value);
    });
    const url = `${this.apiUrl}/${cliente.id}/facturas`;
    return this.http.get<Cliente[]>(url, { params: params });
  }
}
