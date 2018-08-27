import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
      .get<Vendedor[]>(this.apiUrl)
      .pipe(catchError(error => observableThrowError(error)));
  }

  save(vendedor: Vendedor): Observable<Vendedor> {
    return this.http
      .post<Vendedor>(this.apiUrl, vendedor)
      .pipe(catchError(error => observableThrowError(error)));
  }

  update(vendedor: Vendedor): Observable<Vendedor> {
    const url = `${this.apiUrl}/${vendedor.id}`;
    return this.http
      .put<Vendedor>(url, vendedor)
      .pipe(catchError(error => observableThrowError(error)));
  }

  delete(vendedor: Vendedor) {
    const url = `${this.apiUrl}/${vendedor.id}`;
    return this.http
      .delete(url)
      .pipe(catchError(error => observableThrowError(error)));
  }
}
