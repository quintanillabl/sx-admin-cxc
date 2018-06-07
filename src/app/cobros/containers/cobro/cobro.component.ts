import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { Cobro } from '../../models/cobro';
import { CobrosService } from '../../services';
import { TdDialogService, TdLoadingService } from '@covalent/core';
import { MatDialog } from '@angular/material';
import { FechaDialogComponent } from '../../../_shared/components';

@Component({
  selector: 'sx-cobro',
  templateUrl: './cobro.component.html',
  styles: [
    `
    .fill-space {
      flex: 1 1 auto;
    }
  `
  ]
})
export class CobroComponent implements OnInit {
  cobro: Cobro;
  pendientes$: Observable<Array<any>>;
  selectedCuentasPorPagar = <any>[];

  constructor(
    private route: ActivatedRoute,
    private service: CobrosService,
    private dialogService: TdDialogService,
    private loadingService: TdLoadingService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.cobro = this.route.snapshot.data.cobro;
    console.log('Administracion de cobro: ', this.cobro);
    this.cargarPendientes();
  }

  reload() {
    this.service
      .get(this.cobro.id)
      .pipe(catchError(err => Observable.of(err)))
      .subscribe(res => (this.cobro = res));
    this.cargarPendientes();
  }

  cargarPendientes() {
    this.selectedCuentasPorPagar = [];
    this.pendientes$ = this.service
      .cuentasPorCobrar(this.cobro.cliente, this.cobro.tipo)
      .pipe(catchError(err => Observable.of(err)));
  }

  onSelection(rows) {
    this.selectedCuentasPorPagar = rows;
  }

  get porAplicar() {
    const saldoTotal = _.sumBy(
      this.selectedCuentasPorPagar,
      (item: any) => item.saldo
    );
    return saldoTotal <= this.cobro.disponible
      ? saldoTotal
      : this.cobro.disponible;
  }

  aplicar() {
    if (this.porAplicar > 0) {
      const dialogRef = this.dialog.open(FechaDialogComponent, {
        data: { title: `Aplicar ${_.round(this.porAplicar, 2)} en fecha` }
      });
      dialogRef.afterClosed().subscribe(fecha => {
        if (fecha) {
          // console.log('Aplicar en: ', fecha);
          this.doAplicarSeleccion(fecha);
        }
      });
      /*
      this.dialogService
        .openConfirm({
          title: 'Aplicar pago',
          message: `Se aplicara el abono de ${this.porAplicar} a ${
            this.selectedCuentasPorPagar.length
          } facturas`,
          acceptButton: 'Aplicar',
          cancelButton: 'Cancelar'
        })
        .afterClosed()
        .subscribe(res => {
          if (res) {
            this.doAplicarSeleccion();
          }
        });
        */
    }
  }

  doAplicarSeleccion(fecha: Date) {
    this.loadingService.register('saving');
    const pago = { ...this.cobro };
    pago.fechaDeAplicacion = fecha.toISOString();
    pago.pendientesDeAplicar = this.selectedCuentasPorPagar.map((item: any) => {
      return { id: item.id };
    });
    this.service
      .update(pago)
      .pipe(
        finalize(() => this.loadingService.resolve('saving')),
        catchError(err => Observable.of(err))
      )
      .subscribe(res => {
        // console.log('Res: ', res);
        this.reload();
      });
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
          this.loadingService.register('saldando');
          this.service
            .saldar(cobro)
            .pipe(
              catchError(err => Observable.of(err)),
              finalize(() => this.loadingService.resolve('saldando'))
            )
            .subscribe(cc => {
              this.reload();
            });
        }
      });
  }
}
