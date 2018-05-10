import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Vendedor } from '../models/vendedor';
import { ConfigService } from 'app/utils/config.service';

@Injectable()
export class VendedoresService {
  apiUrl: string;
  constructor(private http: HttpClient, private config: ConfigService) {
    this.apiUrl = config.buildApiUrl('vendedores');
  }

  list(): Observable<Vendedor[]> {
    return this.http
      .get(this.apiUrl)
      .pipe(catchError(error => Observable.throw(error)));
  }

  save(vendedor: Vendedor): Observable<Vendedor> {
    return this.http
      .post(this.apiUrl, vendedor)
      .pipe(catchError(error => Observable.throw(error)));
  }

  update(vendedor: Vendedor): Observable<Vendedor> {
    const url = `${this.apiUrl}/${vendedor.id}`;
    return this.http
      .put(url, vendedor)
      .pipe(catchError(error => Observable.throw(error)));
  }

  delete(vendedor: Vendedor) {
    const url = `${this.apiUrl}/${vendedor.id}`;
    return this.http
      .delete(url)
      .pipe(catchError(error => Observable.throw(error)));
  }
}
