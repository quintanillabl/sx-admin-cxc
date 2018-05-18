import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { RevisionesService } from '../../services';
import * as revisionActions from '../actions/revision.actions';

import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

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
}
