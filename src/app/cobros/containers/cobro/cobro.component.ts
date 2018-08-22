import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TdDialogService } from '@covalent/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromActions from '../../store/actions/cobros.actions';

import { Observable, Observer } from 'rxjs';

import { Cobro, CuentaPorCobrar } from '../../models';
import { FechaDialogComponent } from 'app/_shared/components';

import * as _ from 'lodash';

@Component({
  selector: 'sx-cobro',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cobro.component.html'
})
export class CobroComponent implements OnInit {
  cobro$: Observable<Cobro>;

  constructor(
    private store: Store<fromStore.CobranzaState>,
    private dialogService: TdDialogService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.cobro$ = this.store.pipe(select(fromStore.getSelectedCobro));
  }

  aplicar(cobro: Cobro, cuentas: CuentaPorCobrar[]) {
    this.dialog
      .open(FechaDialogComponent, {
        data: { fecha: new Date(), title: 'Fecha de aplicación' }
      })
      .afterClosed()
      .subscribe(res => {
        if (res !== null) {
          this.doAplicarSeleccion(cobro, cuentas, res);
        }
      });
  }

  doAplicarSeleccion(cobro: Cobro, cuentas: CuentaPorCobrar[], fecha: Date) {
    const command = {
      cobro,
      cuentas,
      fecha
    };
    this.store.dispatch(new fromActions.AgregarAplicaciones(command));
  }

  saldar(cobro: Cobro) {
    this.dialogService
      .openConfirm({
        title: 'Cobros',
        message: 'Saldar el disponible de: $ ' + cobro.disponible,
        acceptButton: 'Aceptar',
        cancelButton: 'Cancelar'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          console.log('Saldando disponible de cobro: ', cobro);
        }
      });
  }

  generarRecibo(event: Cobro) {
    this.confirm(
      'Generar recibo electrónico de pago',
      `Importe: ${event.importe}`
    ).subscribe(res => {
      if (res) {
        this.store.dispatch(new fromActions.GenerarRecibo(event));
      }
    });
  }

  confirm(title: string, message: string): Observable<any> {
    const acceptButton = 'Aceptar';
    const cancelButton = 'Cancelar';
    return this.dialogService
      .openConfirm({
        title,
        message,
        acceptButton,
        cancelButton
      })
      .afterClosed();
  }
}
