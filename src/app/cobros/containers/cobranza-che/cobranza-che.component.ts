import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TdMediaService } from '@covalent/core';
import { MatDialog } from '@angular/material';

import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';

import { Observable, combineLatest } from 'rxjs';

import { FechaDialogComponent } from 'app/_shared/components';
import { CobrosService } from '../../services';

import * as moment from 'moment';

import { ReportesService } from 'app/reportes/services';
import { Cartera } from '../../models/cartera';

@Component({
  selector: 'sx-cobranza-che',
  templateUrl: './cobranza-che.component.html'
})
export class CobranzaCheComponent implements OnInit, OnDestroy {
  navigation = [
    {
      path: 'facturas',
      title: 'Cheques',
      description: 'Cuentas por cobrar',
      icon: 'account_balance_wallet'
    },
    {
      path: 'cobros',
      title: 'Cobros',
      description: 'Registro de cobros',
      icon: 'attach_money'
    },
    {
      path: 'bonificaciones',
      title: 'Bonificación',
      description: 'Notas de bonificación',
      icon: 'system_update_alt'
    },
    {
      path: 'cargos',
      title: 'Cargos',
      description: 'Notas de cargo',
      icon: 'event_busy'
    }
  ];

  loading$: Observable<boolean>;
  cartera$: Observable<Cartera>;

  constructor(
    public media: TdMediaService,
    private store: Store<fromStore.CobranzaState>,
    private dialog: MatDialog,
    private service: CobrosService,
    private reportService: ReportesService
  ) {}

  ngOnInit() {
    this.cartera$ = this.store.pipe(select(fromStore.getCartera));
    this.loading$ = combineLatest(
      this.store.pipe(select(fromStore.getCobrosLoading)),
      (cobrosLoading: boolean) => cobrosLoading
    );
  }

  ngOnDestroy() {
    this.store.dispatch(new fromStore.ClearCobros());
  }

  reporteDeCobranza(cartera: Cartera) {
    const dialogRef = this.dialog.open(FechaDialogComponent, {
      data: { title: `Reporte de cobranza ${cartera.clave}` }
    });
    dialogRef.afterClosed().subscribe(fecha => {
      if (fecha) {
        this.service.reporteDeCobranza(fecha, cartera.clave).subscribe(
          res => {
            const blob = new Blob([res], {
              type: 'application/pdf'
            });
            const fileURL = window.URL.createObjectURL(blob);
            window.open(fileURL, '_blank');
          },
          error2 => console.log(error2)
        );
      }
    });
  }

  estadoDeCuentaGeneralChe() {
    this.dialog
      .open(FechaDialogComponent, {
        data: { title: 'Estado de cuenta general' },
        width: '650px'
      })
      .afterClosed()
      .subscribe((fecha: Date) => {
        if (fecha) {
          const params = { fecha: moment(fecha).format('DD/MM/YYYY') };
          this.reportService.runReport(
            'cxc/cheques/estadoDeCuentaGeneralChe',
            params
          );
        }
      });
  }

  estadoDeCuentaDetChe() {
    this.dialog
      .open(FechaDialogComponent, {
        data: { title: 'Estado de cuenta a detalle' },
        width: '650px'
      })
      .afterClosed()
      .subscribe((fecha: Date) => {
        if (fecha) {
          const params = { fecha: moment(fecha).format('DD/MM/YYYY') };
          this.reportService.runReport(
            'cxc/cheques/estadoDeCuentaDetChe',
            params
          );
        }
      });
  }
}
