import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';

import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import * as chequesActions from '../actions/cheques.actions';

import { ChequeDevueltoService } from '../../services';

@Injectable()
export class ChequesEffects {
  constructor(
    private actions$: Actions,
    private service: ChequeDevueltoService
  ) {}

  @Effect()
  loadCheques$ = this.actions$.ofType(chequesActions.LOAD_CHEQUES_ACTION).pipe(
    switchMap(() => {
      return this.service
        .list()
        .pipe(
          map(res => new chequesActions.LoadChequesActionSuccess(res)),
          catchError(error =>
            of(new chequesActions.LoadChequesActionFail(error))
          )
        );
    })
  );
}
