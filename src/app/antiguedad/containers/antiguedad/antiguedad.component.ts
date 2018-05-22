import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';

import { AntiguedadDeSaldo } from '../../models/antiguedadDeSaldo';

import { MatDialog } from '@angular/material';
import { ReporteCarteraCodComponent } from '../../components';

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
    this.store.dispatch(new fromStore.PrintAntiguedadAction());
  }

  carteraCOD() {
    this.dialog
      .open(ReporteCarteraCodComponent, { data: {} })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          console.log('Imprimiendo Cartera COD: ', res);
          this.store.dispatch(new fromStore.PrintCarteraCodAction(res));
        }
      });
  }

  onSearch(event: string) {
    this.store.dispatch(new fromStore.SetSearchTermAction(event));
  }

  antiguedadPorCliente() {}

  clientesSuspendidosCre() {}

  facturasConNotaDevolucion() {}
}
