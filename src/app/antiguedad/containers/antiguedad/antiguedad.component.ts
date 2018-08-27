import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';

import { AntiguedadDeSaldo } from '../../models/antiguedadDeSaldo';

import { MatDialog } from '@angular/material';
import {
  RepAntigueadCteComponent,
  RepExcepcionesDescComponent,
  RepFacturasNcComponent,
  ReporteCarteraCodComponent,
  RepAntigueadComponent,
  RepCtePerSucComponent
} from '../../components';

import { ReportesService } from 'app/reportes/services';
import { RepPeriodoSucursalComponent } from 'app/reportes/components';

@Component({
  selector: 'sx-antiguedad',
  templateUrl: './antiguedad.component.html',
  styles: []
})
export class AntiguedadComponent implements OnInit {
  selected$: Observable<AntiguedadDeSaldo>;

  constructor(
    private store: Store<fromStore.AntiguedadDeSaldoState>,
    private dialog: MatDialog,
    private reportService: ReportesService
  ) {}

  ngOnInit() {
    this.selected$ = this.store.select(fromStore.getAntiguedadSelected);
  }

  antiguedadGlobal() {
    this.dialog
      .open(RepAntigueadComponent, { data: {}, width: '400px' })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          console.log('Reporte : ', res);
          this.store.dispatch(new fromStore.PrintAntiguedadAction(res));
        }
      });
  }

  carteraCOD() {
    this.dialog
      .open(ReporteCarteraCodComponent, { data: {} })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.store.dispatch(new fromStore.PrintCarteraCodAction(res));
        }
      });
  }

  onSearch(event: string) {
    this.store.dispatch(new fromStore.SetSearchTermAction(event));
  }

  antiguedadPorCliente() {
    this.dialog
      .open(RepAntigueadCteComponent, { data: {}, width: '650px' })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.store.dispatch(
            new fromStore.PrintAntiguedadPorClienteAction(res)
          );
        }
      });
  }

  clientesSuspendidosCre() {
    this.store.dispatch(new fromStore.PrintClientesSuspendidosAction());
  }

  facturasConNotaDevolucion() {
    this.dialog
      .open(RepFacturasNcComponent, { data: {}, width: '500px' })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.store.dispatch(
            new fromStore.PrintFacturasConDevolucionAction(res)
          );
        }
      });
  }

  exceptionesEnDescuentos() {
    this.dialog
      .open(RepExcepcionesDescComponent, { data: {}, width: '500px' })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.store.dispatch(
            new fromStore.PrintExceptionesDescuentosAction(res)
          );
        }
      });
  }

  ventasAcumuladas() {
    // this.reportService.ventasAcumuladas();
    this.dialog
      .open(RepPeriodoSucursalComponent, {
        data: { title: 'Reporte de ventas acumuladas' },
        width: '550px'
      })
      .afterClosed()
      .subscribe(command => {
        if (command) {
          this.reportService.runReport('ventas/ventasAcumuladas', command);
        }
      });
  }

  ventasPorFacturista() {
    this.dialog
      .open(RepPeriodoSucursalComponent, {
        data: { title: 'Ventas por facturista', sucursalOpcional: false },
        width: '550px'
      })
      .afterClosed()
      .subscribe(command => {
        if (command) {
          this.reportService.runReport('ventas/ventaPorFacturista', command);
        }
      });
  }

  ventasPorCliente() {
    this.dialog
      .open(RepCtePerSucComponent, {
        data: { title: 'Ventas por cliente' },
        width: '650px'
      })
      .afterClosed()
      .subscribe(command => {
        if (command) {
          this.reportService.runReport('ventas/ventaPorCliente', command);
        }
      });
  }
}
