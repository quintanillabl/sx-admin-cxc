import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import * as clienteActions from '../actions/clientes.action';

import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { ClienteService } from '../../services/cliente.service';

@Injectable()
export class ClientesEffects {
  constructor(private actions$: Actions, private service: ClienteService) {}

  @Effect()
  loadClientes$ = this.actions$.ofType(clienteActions.LOAD_CLIENTES).pipe(
    switchMap(() => {
      return this.service
        .list({})
        .pipe(
          map(res => new clienteActions.LoadClientesSuccess(res)),
          catchError(error => of(new clienteActions.LoadClientesFail(error)))
        );
    })
  );
}
