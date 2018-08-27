import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as fromStore from '../../store/reducers';
import { getPeriodoDeBonificaciones } from '../selectors/bonificacionesMC.selectors';

import * as fromActions from '../actions/bonificacionMC.actions';

import {
  map,
  withLatestFrom,
  switchMap,
  catchError,
  tap,
  filter
} from 'rxjs/operators';
import { of } from 'rxjs';
import { BonificacionesMCService } from '../../services';

@Injectable()
export class BonificacionesMCEffects {
  constructor(
    private actions$: Actions,
    private store: Store<fromStore.CobranzaState>,
    private service: BonificacionesMCService
  ) {}

  @Effect()
  cambiarPeriodo$ = this.actions$.pipe(
    ofType<fromActions.CambiarPeriodoBonificaciones>(
      fromActions.CAMBIAR_PERIODO_BONIFICACIONES_MC
    ),
    map(() => new fromActions.LoadBonificacionesMC())
  );

  @Effect()
  loadBonificaciones$ = this.actions$.pipe(
    ofType<fromActions.LoadBonificacionesMC>(
      fromActions.LOAD_BONIFICACIONES_MC
    ),
    withLatestFrom(
      this.store.pipe(select(getPeriodoDeBonificaciones)),
      (action, periodo) => periodo // Solo nos interesa el periodo (descriminamos la accion)
    ),
    switchMap(periodo => {
      return this.service
        .list(periodo.ejercicio, periodo.mes)
        .pipe(
          map(res => new fromActions.LoadBonificacionesMCSuccess(res)),
          catchError(error =>
            of(new fromActions.LoadBonificacionesMCFail(error))
          )
        );
    })
  );

  @Effect()
  autorizar$ = this.actions$.pipe(
    ofType<fromActions.AutorizarBonificacion>(
      fromActions.AUTORIZAR_BONIFICACION_MC
    ),
    map(action => action.payload),
    switchMap(bonificacion => {
      return this.service
        .autorizar(bonificacion.id)
        .pipe(
          map(res => new fromActions.UpdateBonificacionSuccess(res)),
          catchError(error => of(new fromActions.UpdateBonificacionFail(error)))
        );
    })
  );

  @Effect()
  autorizacionBatch$ = this.actions$.pipe(
    ofType<fromActions.AutorizarBatchBonificacion>(
      fromActions.AUTORIZAR_BONIFICACION_MC_BATCH
    ),
    withLatestFrom(
      this.store.pipe(select(getPeriodoDeBonificaciones)),
      (action, periodo) => periodo // Solo nos interesa el periodo (descriminamos la accion)
    ),
    switchMap(periodo => {
      return this.service
        .autorizacionBatch(periodo.ejercicio, periodo.mes)
        .pipe(
          map(res => new fromActions.LoadBonificacionesMCSuccess(res)),
          catchError(error =>
            of(new fromActions.LoadBonificacionesMCFail(error))
          )
        );
    })
  );

  @Effect()
  suspender$ = this.actions$.pipe(
    ofType<fromActions.SuspenderBonificacion>(
      fromActions.SUSPENDER_BONIFICACION_MC
    ),
    map(action => action.payload),
    switchMap(bonificacion => {
      return this.service
        .suspender(bonificacion.id, bonificacion.suspendidoComentario)
        .pipe(
          map(res => new fromActions.UpdateBonificacionSuccess(res)),
          catchError(error => of(new fromActions.UpdateBonificacionFail(error)))
        );
    })
  );

  @Effect()
  generar$ = this.actions$.pipe(
    ofType<fromActions.GenerarBonificacion>(
      fromActions.GENERAR_BONIFICACIONES_MC
    ),
    withLatestFrom(
      this.store.pipe(select(getPeriodoDeBonificaciones)),
      (action, periodo) => periodo // Solo nos interesa el periodo (descriminamos la accion)
    ),
    switchMap(periodo => {
      return this.service
        .generar(periodo.ejercicio, periodo.mes)
        .pipe(
          map(res => new fromActions.LoadBonificacionesMCSuccess(res)),
          catchError(error =>
            of(new fromActions.LoadBonificacionesMCFail(error))
          )
        );
    })
  );
}
