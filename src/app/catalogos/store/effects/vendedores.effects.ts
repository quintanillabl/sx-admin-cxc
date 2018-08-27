import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';
import * as fromVendedores from '../actions/vendedores.actions';

import { Observable ,  of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { Vendedor } from '../../models/vendedor';
import { VendedoresService } from '../../services';

@Injectable()
export class VendedoresEffect {
  constructor(private actions$: Actions, private service: VendedoresService) {}

  @Effect()
  loadVendedores$ = this.actions$.ofType(fromVendedores.LOAD_VENDEDORES).pipe(
    switchMap(() => {
      return this.service
        .list()
        .pipe(
          map(res => new fromVendedores.LoadVendedoresSuccess(res)),
          catchError(error => of(new fromVendedores.LoadVendedoresFail(error)))
        );
    })
  );

  @Effect()
  createVendedor$ = this.actions$.ofType(fromVendedores.CREATE_VENDEDOR).pipe(
    map((action: fromVendedores.CreateVendedor) => action.payload),
    switchMap(vendedor => {
      return this.service
        .save(vendedor)
        .pipe(
          map(res => new fromVendedores.CreateVendedorSuccess(res)),
          catchError(error => of(new fromVendedores.CreateVendedorFail(error)))
        );
    })
  );

  @Effect()
  updateVendedor$ = this.actions$.ofType(fromVendedores.UPDATE_VENDEDOR).pipe(
    map((action: fromVendedores.UpdateVendedor) => action.payload),
    switchMap(vendedor => {
      return this.service
        .update(vendedor)
        .pipe(
          map(res => new fromVendedores.UpdateVendedorSuccess(res)),
          catchError(error => of(new fromVendedores.UpdateVendedorFail(error)))
        );
    })
  );

  @Effect()
  deleteVendedor$ = this.actions$.ofType(fromVendedores.REMOVE_VENDEDOR).pipe(
    map((action: fromVendedores.RemoveVendedor) => action.payload),
    switchMap(vendedor => {
      return this.service
        .delete(vendedor)
        .pipe(
          map(() => new fromVendedores.RemoveVendedorSuccess(vendedor)),
          catchError(error => of(new fromVendedores.RemoveVendedorFail(error)))
        );
    })
  );
}
