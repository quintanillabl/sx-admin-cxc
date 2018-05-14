import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { ConfigService } from 'app/utils/config.service';
import { AntiguedadDeSalgo } from '../models/antiguedadDeSalgo';

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
}
