import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ConfigService } from '../../utils/config.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ComisionesService {
  private apiUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = configService.buildApiUrl('cxc/comisiones');
  }

  list(filtro: any): Observable<any[]> {
    const url = `${this.apiUrl}`;
    const params = new HttpParams()
      .set('fechaInicial', filtro.fechaInicial)
      .set('fechaFinal', filtro.fechaFinal);
    return this.http
      .get<any[]>(url, { params: params })
      .pipe(catchError(err => Observable.of(err)));
  }

  generar(fechaInicial, fechaFinal) {}
}
