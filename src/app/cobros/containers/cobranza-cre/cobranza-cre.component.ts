import { Component, OnInit, OnDestroy } from '@angular/core';
import { TdMediaService } from '@covalent/core';
import { MatDialog } from '@angular/material';

import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';

import { Observable, combineLatest } from 'rxjs';

import { FechaDialogComponent } from 'app/_shared/components';
import { CobrosService } from '../../services';

import { Cartera } from '../../models/cartera';

@Component({
  selector: 'sx-cobranza-cre',
  templateUrl: './cobranza-cre.component.html'
})
export class CobranzaCreComponent implements OnInit, OnDestroy {
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
      path: 'revisiones',
      title: 'Revisión',
      description: 'Revisión y cobro',
      icon: 'event_note'
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
      path: 'comisiones',
      title: 'Comisiones',
      description: 'Comisiones cobradores',
      icon: 'people'
    }
  ];

  loading$: Observable<boolean>;
  cartera$: Observable<Cartera>;

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
}
