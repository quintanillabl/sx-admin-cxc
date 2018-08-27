import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Observable ,  BehaviorSubject } from 'rxjs';
import { combineLatest, finalize, map } from 'rxjs/operators';

import { ComisionesService } from '../../services/comisions.service';
import { Periodo } from 'app/_core/models/periodo';
import { PeriodoDialogComponent } from 'app/_shared/components';

import {
  GeneraComisionesComponent,
  ReporteDeComisionesComponent
} from '../../components';

import * as _ from 'lodash';

@Component({
  selector: 'sx-comisiones',
  templateUrl: './comisiones.component.html',
  styleUrls: ['./comisiones.component.scss']
})
export class ComisionesComponent implements OnInit, OnDestroy {
  comisiones$: Observable<any[]>;
  factura$ = new BehaviorSubject('');
  cliente$ = new BehaviorSubject('');
  comisionista$ = new BehaviorSubject('');
  totales$: Observable<any>;
  periodo: Periodo;
  loading = false;
  componentKey = 'sx.cxc.comisiones';

  constructor(private service: ComisionesService, private dialog: MatDialog) {}

  ngOnInit() {
    this.periodo = Periodo.fromStorage(`${this.componentKey}.periodo`);
    this.load();
  }
  ngOnDestroy() {
    Periodo.saveOnStorage(`${this.componentKey}.periodo`, this.periodo);
  }

  load() {
    this.comisiones$ = this.service.list(this.periodo.toApiJSON()).pipe(
      combineLatest(this.factura$, (data, factura) => {
        if (factura) {
          return data.filter(item =>
            item.documento.toString().startsWith(factura.toString())
          );
        } else {
          return data;
        }
      }),
      combineLatest(this.cliente$, (data, term) => {
        if (term) {
          return data.filter(
            item =>
              item.cliente
                .toString()
                .toLowerCase()
                .indexOf(term.toString().toLowerCase()) !== -1
            // .startsWith(term.toString().toLowerCase())
          );
        } else {
          return data;
        }
      }),
      combineLatest(this.comisionista$, (data, term) => {
        if (term) {
          return data.filter(item =>
            item.clave
              .toString()
              .toLowerCase()
              .startsWith(term.toString().toLowerCase())
          );
        } else {
          return data;
        }
      })
    );

    this.totales$ = this.comisiones$.pipe(
      map(facturas => {
        return {
          facturas: facturas.length,
          importe: _.sumBy(facturas, item => item.pagoComisionable),
          total: _.sumBy(facturas, item => item.comisionImporte)
        };
      })
    );
  }

  test(event) {
    console.log(event);
  }

  changePeriodo() {
    this.dialog
      .open(PeriodoDialogComponent, { data: { periodo: this.periodo } })
      .afterClosed()
      .subscribe(per => {
        if (per) {
          this.periodo = per;
          Periodo.saveOnStorage(`${this.componentKey}.periodo`, this.periodo);
          this.load();
        }
      });
  }

  generar() {
    this.dialog
      .open(GeneraComisionesComponent, {
        data: { periodo: this.periodo },
        width: '300px'
      })
      .afterClosed()
      .subscribe(tipo => {
        if (tipo) {
          const command = { tipo, ...this.periodo.toApiJSON() };
          this.loading = true;
          this.service
            .generar(command)
            .pipe(finalize(() => (this.loading = false)))
            .subscribe(res => this.load());
        }
      });
  }

  reporteDeComisiones() {
    this.dialog
      .open(ReporteDeComisionesComponent, { data: {}, width: '350px' })
      .afterClosed()
      .subscribe(data => {
        if (data) {
          const command = {
            ...data,
            ...this.periodo.toApiJSON()
          };
          this.loading = true;
          this.service
            .reporte(command)
            .pipe(finalize(() => (this.loading = false)))
            .subscribe(res => {
              const blob = new Blob([res], {
                type: 'application/pdf'
              });
              const fileUrl = window.URL.createObjectURL(blob);
              window.open(fileUrl, '_blank');
            });
        }
      });
  }
}
