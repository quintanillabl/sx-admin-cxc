import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Cobrador } from '../models/cobrador';
import { ConfigService } from 'app/utils/config.service';

@Injectable()
export class CobradoresService {
  apiUrl: string;
  constructor(private http: HttpClient, private config: ConfigService) {
    this.apiUrl = config.buildApiUrl('cobradores');
  }

  list(): Observable<Cobrador[]> {
    return this.http
      .get(this.apiUrl)
      .pipe(catchError(error => Observable.throw(error)));
  }

  save(cobrador: Cobrador): Observable<Cobrador> {
    return this.http
      .post(this.apiUrl, cobrador)
      .pipe(catchError(error => Observable.throw(error)));
  }

  update(cobrador: Cobrador): Observable<Cobrador> {
    const url = `${this.apiUrl}/${cobrador.id}`;
    return this.http
      .put(url, cobrador)
      .pipe(catchError(error => Observable.throw(error)));
  }

  delete(cobrador: Cobrador) {
    const url = `${this.apiUrl}/${cobrador.id}`;
    return this.http
      .delete(url)
      .pipe(catchError(error => Observable.throw(error)));
  }
}
