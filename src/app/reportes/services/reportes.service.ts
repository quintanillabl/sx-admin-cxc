import { Injectable, ComponentRef } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ConfigService } from '../../utils/config.service';

import * as _ from 'lodash';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { RepPeriodoSucursalComponent } from '../components';

@Injectable()
export class ReportesService {
  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private dialog: MatDialog
  ) {}

  runReport(url: string, repParams = {}) {
    let params = new HttpParams();
    _.forIn(repParams, (value, key) => {
      params = params.set(key, value);
    });
    const apiUrl = this.config.buildApiUrl(url);
    const headers = new HttpHeaders().set('Content-type', 'application/pdf');
    return this.http
      .get(apiUrl, { headers: headers, params: params, responseType: 'blob' })
      .subscribe(
        res => {
          const blob = new Blob([res], {
            type: 'application/pdf'
          });
          const fileUrl = window.URL.createObjectURL(blob);
          window.open(fileUrl, '_blank');
        },
        error1 => {
          console.log('Error al tratar de imprimir reporte');
        }
      );
  }

  ventasAcumuladas() {
    const dialogRef = this.dialog.open(RepPeriodoSucursalComponent, {
      data: {},
      width: '550px'
    });
    dialogRef.afterClosed().subscribe(command => {
      if (command) {
        console.log('Ejecutando reporte con params: ', command);
      }
    });
  }
}
