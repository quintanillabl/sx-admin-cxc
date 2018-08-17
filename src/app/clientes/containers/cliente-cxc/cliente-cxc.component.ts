
import {of as observableOf,  Observable } from 'rxjs';

import {delay, switchMap,  catchError, finalize } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';

import { Cliente } from '../../models';
import { ClienteService } from '../../services';
import { TdDialogService } from '@covalent/core';

@Component({
  selector: 'sx-cliente-cxc',
  templateUrl: './cliente-cxc.component.html'
})
export class ClienteCxcComponent implements OnInit {
  cliente$: Observable<Cliente>;

  cuentasPorCobrar$: Observable<Array<any>>;
  selected: Array<any> = [];
  procesando = false;

  constructor(
    private store: Store<fromStore.ClientesState>,
    private route: ActivatedRoute,
    private service: ClienteService,
    private dialogService: TdDialogService
  ) {}

  ngOnInit() {
    // this.cliente$ = this.route.parent.data.map(data => data.cliente);
    this.cliente$ = this.store.select(fromStore.getSelectedCliente);
    this.load();
  }

  load() {
    this.procesando = true;
    this.cuentasPorCobrar$ = this.cliente$.pipe(switchMap(cliente => {
      return this.service
        .cxc(cliente, { term: '' })
        .pipe(
          catchError(err => observableOf(err)),
          finalize(() => (this.procesando = false))
        );
    }));
  }

  saldar() {
    const facturas = this.selected;
    if (facturas.length > 0) {
      const msg = `Saldar ${this.selected.length} facturas seleccionadas`;
      this.dialogService
        .openConfirm({
          title: 'Cuentas por cobrar',
          message: msg,
          acceptButton: 'Aceptar',
          cancelButton: 'Cancelar'
        })
        .afterClosed()
        .subscribe((res: Array<any>) => {
          if (res) {
            this.procesando = true;
            facturas.forEach(item => {
              this.service
                .saldarCxc(item.id).pipe(
                delay(2000))
                .subscribe((cxc: any) => cxc);
              console.log('Saldando cxc: ', item);
            });
            this.procesando = false;
            this.load();
          }
        });
    }
  }

  juridico() {
    const facturas = this.selected;
    if (facturas.length > 0) {
      const fac = facturas[0];
      const msg = `Mandar a jurídico la factura ${
        fac.documento
      } con un saldo de: ${fac.saldo}`;
      this.dialogService
        .openConfirm({
          title: 'Cuentas por cobrar',
          message: msg,
          acceptButton: 'Aceptar',
          cancelButton: 'Cancelar'
        })
        .afterClosed()
        .subscribe((res: Array<any>) => {
          if (res) {
          }
        });
    }
  }
}
