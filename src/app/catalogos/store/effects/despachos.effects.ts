import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';

import { Observable ,  of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as fromDespacho from '../actions/despachos.actions';
import * as fromRoot from 'app/store';

import { DespachosService } from '../../services';

@Injectable()
export class DespachosEffects {
  constructor(private actions$: Actions, private service: DespachosService) {}

  @Effect()
  loadDespachos$ = this.actions$.ofType(fromDespacho.LOAD_DESPACHOS).pipe(
    switchMap(() => {
      return this.service
        .list()
        .pipe(
          map(res => new fromDespacho.LoadDespachosSuccess(res)),
          catchError(error => of(new fromDespacho.LoadDespachosFail(error)))
        );
    })
  );

  @Effect()
  createDespacho$ = this.actions$.ofType(fromDespacho.CREATE_DESPACHO).pipe(
    map((action: fromDespacho.CreateDespacho) => action.payload),
    switchMap(despacho => {
      return this.service
        .save(despacho)
        .pipe(
          map(res => new fromDespacho.CreateDespachoSuccess(res)),
          catchError(error => of(new fromDespacho.CreateDespachoFail(error)))
        );
    })
  );

  @Effect()
  createDespachoSuccess$ = this.actions$
    .ofType(fromDespacho.CREATE_DESPACHO_SUCCESS)
    .pipe(
      map((action: fromDespacho.CreateDespachoSuccess) => action.payload),
      map(despacho => {
        return new fromRoot.Go({
          path: ['catalogos/despachos', despacho.id]
        });
      })
    );

  @Effect()
  updateDespacho$ = this.actions$.ofType(fromDespacho.UPDATE_DESPACHO).pipe(
    map((action: fromDespacho.UpdateDespacho) => action.payload),
    switchMap(despacho => {
      return this.service
        .update(despacho)
        .pipe(
          map(res => new fromDespacho.UpdateDespachoSuccess(res)),
          catchError(error => of(new fromDespacho.UpdateDespachoFail(error)))
        );
    })
  );

  @Effect()
  removeDespacho$ = this.actions$.ofType(fromDespacho.REMOVE_DESPACHO).pipe(
    map((action: fromDespacho.RemoveDespacho) => action.payload),
    switchMap(despacho => {
      return this.service
        .delete(despacho)
        .pipe(
          map(() => new fromDespacho.RemoveDespachoSuccess(despacho)),
          catchError(error => of(new fromDespacho.RemoveDespachoFail(error)))
        );
    })
  );

  @Effect()
  handleProductoSuccess$ = this.actions$
    .ofType(
      fromDespacho.UPDATE_DESPACHO_SUCCESS,
      fromDespacho.REMOVE_DESPACHO_SUCCESS
    )
    .pipe(
      map(pizza => {
        return new fromRoot.Go({
          path: ['/catalogos/despachos']
        });
      })
    );
}
