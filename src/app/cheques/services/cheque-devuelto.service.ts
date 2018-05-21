import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { ConfigService } from '../../utils/config.service';
import { ChequeDevuelto } from '../models/chequeDevuelto';

@Injectable()
export class ChequeDevueltoService {
  apiUrl: string;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.apiUrl = config.buildApiUrl('cxc/cheques');
  }

  list(): Observable<ChequeDevuelto[]> {
    return this.http
      .get<ChequeDevuelto>(this.apiUrl)
      .pipe(catchError(error => Observable.throw(error)));
  }
}
