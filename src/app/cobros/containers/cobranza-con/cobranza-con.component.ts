import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TdMediaService } from '@covalent/core';
import { MatDialog } from '@angular/material';

import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';

import { Observable, combineLatest } from 'rxjs';
import { merge } from 'rxjs/operators';

import { FechaDialogComponent, PeriodoDialogComponent } from 'app/_shared/components';
import { CobrosService } from '../../services';

import * as _ from 'lodash';
import * as moment from 'moment';

import { ReportesService } from 'app/reportes/services';
import { Cartera } from '../../models/cartera';

@Component({
  selector: 'sx-cobranza-con',
  templateUrl: './cobranza-con.component.html'
})
export class CobranzaConComponent implements OnInit, OnDestroy {
  navigation = [
    {
      path: 'facturas',
      title: 'Facturas',
      description: 'Cuentas por cobrar',
      icon: 'shopping_cart'
    },
    {
      path: 'cobros',
      title: 'Cobros',
      description: 'Registro de cobros',
      icon: 'attach_money'
    },

    {
      path: 'devoluciones',
      title: 'Devoluciones',
      description: 'Notas de devolución',
      icon: 'keyboard_return'
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
    },
    {
      path: 'mejoresClientes',
      title: 'Bonificaciones MC',
      description: 'Mejores clientes',
      icon: 'people'
    }
  ];

  cartera$: Observable<Cartera>;
  loading$: Observable<boolean>;

  constructor(
    public media: TdMediaService,
    private store: Store<fromStore.CobranzaState>,
    private dialog: MatDialog,
    private service: CobrosService
  ) {}

  ngOnInit() {
    this.loading$ = combineLatest(
      this.store.pipe(select(fromStore.getCobrosLoading)),
      (cobrosLoading: boolean) => cobrosLoading
    );
    this.cartera$ = this.store.pipe(select(fromStore.getCartera));
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
            // this.loadingService.resolve('saving');
            const fileURL = window.URL.createObjectURL(blob);
            window.open(fileURL, '_blank');
          },
          error2 => console.log(error2)
        );
      }
    });
  }

  reporteDeRecibosPendientes() {
    const dialogRef = this.dialog.open(PeriodoDialogComponent, {
      data: { title: `Reporte de recibos CFDI pendientes` }
    });
    dialogRef.afterClosed().subscribe(periodo => {
      if (periodo) {
        this.service.reporteDeRecibosPendientes(periodo.fechaInicial, periodo.fechaFinal).subscribe(
          res => {
            const blob = new Blob([res], {
              type: 'application/pdf'
            });
            // this.loadingService.resolve('saving');
            const fileURL = window.URL.createObjectURL(blob);
            window.open(fileURL, '_blank');
          },
          error2 => console.log(error2)
        );
      }
    });
  }
}
