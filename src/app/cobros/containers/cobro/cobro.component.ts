import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TdDialogService } from '@covalent/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromActions from '../../store/actions/cobros.actions';

import { Observable } from 'rxjs';

import { Cobro, CuentaPorCobrar, AplicacionDeCobro } from '../../models';

import * as _ from 'lodash';

@Component({
  selector: 'sx-cobro',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cobro.component.html',
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
    // this.cobro$.subscribe((cobro) => console.log('cobro: ', cobro));
  }

  aplicar(cobro: Cobro, cuentas: CuentaPorCobrar[]) {
    if (cuentas.length > 0) {
      this.doAplicarSeleccion(cobro, cuentas);
    }
  }

  doAplicarSeleccion(cobro: Cobro, cuentas: CuentaPorCobrar[]) {
    const command = {
      cobro,
      cuentas,
    };
    this.store.dispatch(new fromActions.AgregarAplicaciones(command));
  }

  onDelete(cobro: Cobro, aplicacion: AplicacionDeCobro) {
    if (!cobro.cfdi) {
      this.confirm(
        'Cobros',
        `Eliminar aplicación de $ ${aplicacion.importe}`
      ).subscribe((res) => {
        this.store.dispatch(
          new fromActions.EliminarAplicacion({ cobro, aplicacion })
        );
      });
    }
  }

  saldar(cobro: Cobro) {
    this.confirm(
      'Cobros',
      `Saldar el disponible de $ ${cobro.disponible}`
    ).subscribe((res) => {
      this.store.dispatch(new fromActions.SaldarRecibo(cobro));
    });
  }

  generarRecibo(event: Cobro) {
    this.confirm(
      'Generar recibo electrónico de pago',
      `Importe: ${event.importe}`
    ).subscribe((res) => {
      if (res) {
        this.store.dispatch(new fromActions.GenerarRecibo(event));
      }
    });
  }

  mandarPorCorreo(cobro: Cobro): void {
    this.dialogService
      .openPrompt({
        message: 'Mandar la Cfdi de pago (PDF y XML) al clente',
        disableClose: true,
        title: 'Email',
        value: cobro.cliente.cfdiMail,
        cancelButton: 'Cancelar',
        acceptButton: 'Enviar',
      })
      .afterClosed()
      .subscribe((newValue: string) => {
        if (newValue) {
          this.store.dispatch(
            new fromActions.EnvioDeRecibo({ cobro: cobro, target: newValue })
          );
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
        cancelButton,
      })
      .afterClosed();
  }

  disponibleSaldable(cobro: Cobro) {
    if (cobro.disponible > 0 && cobro.disponible <= 100) {
      return true;
    } else {
      return false;
    }
  }

  printRecibo(event: Cobro) {
    this.store.dispatch(new fromActions.PrintRecibo(event));
  }
}
