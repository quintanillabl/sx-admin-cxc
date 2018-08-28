import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'app/store';
import * as fromStore from '../../store';

import { of } from 'rxjs';
import { map, switchMap, tap, catchError, take } from 'rxjs/operators';

import { CuentasPorClienteActionTypes } from '../actions/cxc-cliente.actions';
import * as fromActions from '../actions/cxc-cliente.actions';

import { CxCService } from '../../services';

@Injectable()
export class CxCClienteEffects {
  constructor(private actions$: Actions, private service: CxCService) {}

  /*
  @Effect()
  loadCuentasPorCliente$ = this.actions$.pipe(
    ofType<fromActions.LoadCuentasPorCliente>(
      CuentasPorClienteActionTypes.LoadCuentasPorCliente
    ),
    switchMap(action => {
      return this.service
        .cuentasPorCobrar(action.payload)
        .pipe(
          map(res => new fromActions.LoadCuentasPorClienteSuccess(res)),
          catchError(error =>
            of(new fromActions.LoadCuentasPorClienteFail(error))
          )
        );
    })
  );*/

  @Effect()
  setCliente$ = this.actions$.pipe(
    ofType<fromActions.SetCurrentCliente>(
      CuentasPorClienteActionTypes.SetCurrentCliente
    ),
    map(action => action.payload),
    map(cliente => new fromActions.LoadCuentasPorCliente(cliente))
  );
}
