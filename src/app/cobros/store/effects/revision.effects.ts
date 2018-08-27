import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { RevisionesService } from '../../services';
import * as revisionActions from '../actions/revision.actions';

import { map, switchMap, catchError, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class RevisionEffects {
  constructor(private actions$: Actions, private service: RevisionesService) {}

  @Effect()
  loadRevision$ = this.actions$
    .ofType(revisionActions.LOAD_REVISION_ACTION)
    .pipe(
      switchMap(() => {
        return this.service
          .list()
          .pipe(
            tap(res => console.log('LOAD_ACCIONT SUCCES: ', res.length)),
            map(res => new revisionActions.LoadRevisionActionSuccess(res)),
            catchError(error =>
              of(new revisionActions.LoadRevisionActionFail(error))
            )
          );
      })
    );

  @Effect()
  updateRevision$ = this.actions$
    .ofType(revisionActions.UPDATE_REVISION_ACTION)
    .pipe(
      map((action: revisionActions.UpdateRevisionAction) => action.payload),
      switchMap(ventaCredito => {
        return this.service
          .update(ventaCredito)
          .pipe(
            tap(res => console.log('Venta credito actualizada: ', res)),
            map(
              res =>
                new revisionActions.UpdateRevisionActionSuccess(ventaCredito)
            ),
            catchError(error =>
              of(new revisionActions.UpdateRevisionActionFail(error))
            )
          );
      })
    );

  @Effect()
  batchUpdate$ = this.actions$.ofType(revisionActions.BATCH_UPDATE_ACTION).pipe(
    map((action: revisionActions.BatchUpdateAction) => action.payload),
    filter(command => command.type === revisionActions.BatchType.NORMAL),
    switchMap(command => {
      return this.service
        .batchUpdate({ facturas: command.facturas, template: command.template })
        .pipe(
          map(res => new revisionActions.BatchUpdateActionSuccess(res)),
          catchError(error =>
            of(new revisionActions.BatchUpdateActionFial(error))
          )
        );
    })
  );

  @Effect()
  batchUpdateRecepcionCxC$ = this.actions$
    .ofType(revisionActions.BATCH_UPDATE_ACTION)
    .pipe(
      map((action: revisionActions.BatchUpdateAction) => action.payload),
      filter(
        command => command.type === revisionActions.BatchType.RECEPCION_CXC
      ),
      switchMap(command => {
        return this.service
          .recepcionCxc(command.facturas)
          .pipe(
            map(res => new revisionActions.BatchUpdateActionSuccess(res)),
            catchError(error =>
              of(new revisionActions.BatchUpdateActionFial(error))
            )
          );
      })
    );

  @Effect()
  batchUpdateCancelarRecepcionCxC$ = this.actions$
    .ofType(revisionActions.BATCH_UPDATE_ACTION)
    .pipe(
      map((action: revisionActions.BatchUpdateAction) => action.payload),
      filter(
        command =>
          command.type === revisionActions.BatchType.CANCELAR_RECEPCION_CXC
      ),
      switchMap(command => {
        return this.service
          .cancelarRecepcionCxC(command.facturas)
          .pipe(
            map(res => new revisionActions.BatchUpdateActionSuccess(res)),
            catchError(error =>
              of(new revisionActions.BatchUpdateActionFial(error))
            )
          );
      })
    );

  @Effect()
  batchUpdateRevisada$ = this.actions$
    .ofType(revisionActions.BATCH_UPDATE_ACTION)
    .pipe(
      map((action: revisionActions.BatchUpdateAction) => action.payload),
      filter(command => command.type === revisionActions.BatchType.REVISADA),
      switchMap(command => {
        return this.service
          .registrarRvisada(command.facturas)
          .pipe(
            map(res => new revisionActions.BatchUpdateActionSuccess(res)),
            catchError(error =>
              of(new revisionActions.BatchUpdateActionFial(error))
            )
          );
      })
    );
}
