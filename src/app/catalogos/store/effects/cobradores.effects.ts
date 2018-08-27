import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';
import * as fromCobradores from '../actions/cobradores.actions';

import { Observable ,  of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { Cobrador } from '../../models/cobrador';
import { CobradoresService } from '../../services';

@Injectable()
export class CobradoresEffect {
  constructor(private actions$: Actions, private service: CobradoresService) {}

  @Effect()
  loadCobradores$ = this.actions$.ofType(fromCobradores.LOAD_COBRADORES).pipe(
    switchMap(() => {
      return this.service
        .list()
        .pipe(
          map(res => new fromCobradores.LoadCobradoresSuccess(res)),
          catchError(error => of(new fromCobradores.LoadCobradoresFail(error)))
        );
    })
  );

  @Effect()
  createCobrador$ = this.actions$.ofType(fromCobradores.CREATE_COBRADOR).pipe(
    map((action: fromCobradores.CreateCobrador) => action.payload),
    switchMap(cobrador => {
      return this.service
        .save(cobrador)
        .pipe(
          map(res => new fromCobradores.CreateCobradorSuccess(res)),
          catchError(error => of(new fromCobradores.CreateCobradorFail(error)))
        );
    })
  );

  @Effect()
  updateCobrador$ = this.actions$.ofType(fromCobradores.UPDATE_COBRADOR).pipe(
    map((action: fromCobradores.UpdateCobrador) => action.payload),
    switchMap(cobrador => {
      return this.service
        .update(cobrador)
        .pipe(
          map(res => new fromCobradores.UpdateCobradorSuccess(res)),
          catchError(error => of(new fromCobradores.UpdateCobradorFail(error)))
        );
    })
  );

  @Effect()
  deleteCobrador$ = this.actions$.ofType(fromCobradores.REMOVE_COBRADOR).pipe(
    map((action: fromCobradores.RemoveCobrador) => action.payload),
    switchMap(cobrador => {
      return this.service
        .delete(cobrador)
        .pipe(
          map(() => new fromCobradores.RemoveCobradorSuccess(cobrador)),
          catchError(error => of(new fromCobradores.RemoveCobradorFail(error)))
        );
    })
  );
}
