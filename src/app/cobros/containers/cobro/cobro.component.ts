import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromActions from '../../store/actions/cobros.actions';

import { ActivatedRoute } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import * as _ from 'lodash';

import { Cobro } from '../../models/cobro';
import { CobrosService } from '../../services';
import { TdDialogService, TdLoadingService } from '@covalent/core';
import { MatDialog } from '@angular/material';
import { FechaDialogComponent } from '../../../_shared/components';
import { CuentaPorCobrar } from '../../models';

@Component({
  selector: 'sx-cobro',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *ngIf="cobro$ | async as cobro">
       <sx-cobro-form [cobro]="cobro"></sx-cobro-form>
    </div>
  `
})
export class CobroComponent implements OnInit {
  cobro$: Observable<Cobro>;
  pendientes$: Observable<CuentaPorCobrar[]>;

  constructor(
    private store: Store<fromStore.CobranzaState>,
    private dialogService: TdDialogService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.cobro$ = this.store.pipe(select(fromStore.getSelectedCobro));
    this.cobro$.subscribe(c => console.log('Cobro: ', c));
  }

  aplicar() {}

  doAplicarSeleccion(fecha: Date) {}

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
}
