import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';

import { AntiguedadDeSaldo } from '../../models/antiguedadDeSaldo';

import { MatDialog } from '@angular/material';
import {
  RepAntigueadCteComponent,
  RepExcepcionesDescComponent,
  RepFacturasNcComponent,
  ReporteCarteraCodComponent,
  RepAntigueadComponent
} from '../../components';

@Component({
  selector: 'sx-antiguedad',
  templateUrl: './antiguedad.component.html',
  styles: []
})
export class AntiguedadComponent implements OnInit {
  selected$: Observable<AntiguedadDeSaldo>;

  constructor(
    private store: Store<fromStore.AntiguedadDeSaldoState>,
    private dialog: MatDialog
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
          console.log('Reporte de fecha: ', res);
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
}
