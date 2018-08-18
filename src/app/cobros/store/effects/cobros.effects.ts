import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'app/store';
import * as fromStore from '../../store';

import { of } from 'rxjs';
import { map, switchMap, tap, catchError, take } from 'rxjs/operators';

import { CobroActionTypes } from '../actions/cobros.actions';
import * as fromActions from '../actions/cobros.actions';

import { CobrosService } from '../../services';

import { MatSnackBar } from '@angular/material';

@Injectable()
export class CobrosEffects {
  constructor(
    private actions$: Actions,
    private service: CobrosService,
    private store: Store<fromStore.CobranzaState>,
    private snackBar: MatSnackBar
  ) {}

  @Effect()
  loadCobros$ = this.actions$.pipe(
    ofType(CobroActionTypes.LoadCobros),
    switchMap(() => {
      return this.service
        .list()
        .pipe(
          map(res => new fromActions.LoadCobrosSuccess(res)),
          catchError(error => of(new fromActions.LoadCobrosFail(error)))
        );
    })
  );

  @Effect()
  addCobro$ = this.actions$.pipe(
    ofType<fromActions.AddCobro>(CobroActionTypes.AddCobro),
    map(action => action.payload),
    switchMap(cobro => {
      return this.service
        .save(cobro)
        .pipe(
          map(res => new fromActions.AddCobroSuccess(res)),
          catchError(error => of(new fromActions.AddCobroFail(error)))
        );
    })
  );

  @Effect()
  updateCobro$ = this.actions$.pipe(
    ofType<fromActions.UpdateCobro>(CobroActionTypes.UpdateCobro),
    map(action => action.payload),
    switchMap(cobro => {
      return this.service
        .update(cobro)
        .pipe(
          map(res => new fromActions.UpdateCobroSuccess(res)),
          catchError(error => of(new fromActions.UpdateCobroFail(error)))
        );
    })
  );

  @Effect()
  deleteCobro$ = this.actions$.pipe(
    ofType<fromActions.DeleteCobro>(CobroActionTypes.DeleteCobro),
    map(action => action.payload),
    switchMap(cobro => {
      return this.service
        .delete(cobro.id)
        .pipe(
          map(res => new fromActions.DeleteCobroSuccess(cobro)),
          catchError(error => of(new fromActions.LoadCobrosFail(error)))
        );
    })
  );

  @Effect()
  deleteSuccess$ = this.actions$.pipe(
    ofType(CobroActionTypes.DeleteCobroSuccess),
    map(() => new fromRoot.Go({ path: ['../..'] }))
  );

  @Effect()
  updateSuccess$ = this.actions$.pipe(
    ofType<fromActions.UpdateCobroSuccess>(CobroActionTypes.UpdateCobroSuccess),
    map(action => action.payload),
    tap(cobro =>
      this.snackBar.open(`Cobro ${cobro.importe} actualizado `, 'Cerrar', {
        duration: 5000
      })
    ),
    map(cobro => new fromRoot.Go({ path: ['ordenes/cobros', cobro.id] }))
  );
}
