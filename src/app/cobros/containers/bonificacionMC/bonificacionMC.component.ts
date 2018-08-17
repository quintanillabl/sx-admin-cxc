import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'app/store';
import * as fromStore from '../../store';

import { Observable } from 'rxjs';

import { BonificacionMC } from '../../models/bonificacionMC';
import { TdDialogService } from '@covalent/core';

@Component({
  selector: 'sx-bonificacion-mc',
  templateUrl: './bonificacionMC.component.html'
})
export class BonificacionMCComponent implements OnInit {
  bonificacion$: Observable<BonificacionMC>;
  loading$: Observable<boolean>;
  constructor(
    private store: Store<fromStore.CobranzaState>,
    private dialotService: TdDialogService
  ) {}

  ngOnInit() {
    this.bonificacion$ = this.store.pipe(
      select(fromStore.getSelectedBonificacion)
    );
    this.loading$ = this.store.pipe(
      select(fromStore.getBonificacionesMCLoading)
    );
  }

  goBack() {
    this.store.dispatch(new fromRoot.Back());
  }

  autorizar(bonificacion: BonificacionMC) {
    this.dialotService
      .openConfirm({
        title: 'Autorizar bonificacion',
        message: `${bonificacion.nombre}`,
        acceptButton: 'Aceptar',
        cancelButton: 'Cancelar'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.store.dispatch(
            new fromStore.AutorizarBonificacion(bonificacion)
          );
        }
      });
  }

  suspender(bonificacion: BonificacionMC) {
    this.dialotService
      .openPrompt({
        title: 'Suspender bonificacion',
        message: `${bonificacion.nombre}`,
        acceptButton: 'Aceptar',
        cancelButton: 'Cancelar'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          bonificacion.suspendidoComentario = res;
          this.store.dispatch(
            new fromStore.SuspenderBonificacion(bonificacion)
          );
        }
      });
  }
}
