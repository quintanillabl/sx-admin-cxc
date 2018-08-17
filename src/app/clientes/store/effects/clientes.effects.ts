import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import * as fromRoot from 'app/store';
import * as clienteActions from '../actions/clientes.action';

import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

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

  @Effect()
  searchClientes$ = this.actions$.ofType(clienteActions.SEARCH_CLIENTES).pipe(
    map((action: clienteActions.SearchClientesAction) => action.payload),
    switchMap(term => {
      return this.service
        .list({ term })
        .pipe(
          map(res => new clienteActions.SearchClientesActionSuccess(res)),
          catchError(error =>
            of(new clienteActions.SearchClientesActionFail(error))
          )
        );
    })
  );

  @Effect()
  updateCliente$ = this.actions$.ofType(clienteActions.UPDATE_CLIENTE).pipe(
    map((action: clienteActions.UpdateCliente) => action.payload),
    switchMap(cliente => {
      return this.service
        .update(cliente)
        .pipe(
          map(res => new clienteActions.UpdateClienteSuccess(res)),
          catchError(error => of(new clienteActions.UpdateClienteFail(error)))
        );
    })
  );

  @Effect()
  updateClienteSuccess$ = this.actions$
    .ofType(clienteActions.UPDATE_CLIENTE_SUCCESS)
    .pipe(
      map((action: clienteActions.UpdateClienteSuccess) => action.payload),
      map(
        cliente =>
          new fromRoot.Go({
            path: [`clientes/${cliente.id}/info/${cliente.id}`]
          })
      )
    );
}
