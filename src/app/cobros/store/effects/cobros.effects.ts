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
import { TdDialogService } from '@covalent/core';
import * as fromCobros from '../../store/selectors/cobros.selectors';

@Injectable()
export class CobrosEffects {
  constructor(
    private actions$: Actions,
    private service: CobrosService,
    private store: Store<fromStore.CobranzaState>,
    private snackBar: MatSnackBar,
    private dialogService: TdDialogService
  ) {}

  @Effect()
  loadCobros$ = this.actions$.pipe(
    ofType<fromActions.LoadCobros>(CobroActionTypes.LoadCobros),
    map(action => action.payload),
    switchMap(cartera => {
      return this.service
        .list({ cartera: cartera.clave })
        .pipe(
          map(res => new fromActions.LoadCobrosSuccess(res)),
          catchError(error => of(new fromActions.LoadCobrosFail(error)))
        );
    })
  );

  @Effect()
  searchCobros$ = this.actions$.pipe(
    ofType<fromActions.SearchCobros>(CobroActionTypes.SearchCobros),
    switchMap(action => {
      return this.service
        .search(action.payload)
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
  aplicarCobro$ = this.actions$.pipe(
    ofType<fromActions.AgregarAplicaciones>(
      CobroActionTypes.AgregarAplicaciones
    ),
    map(action => action.payload),
    switchMap(command => {
      return this.service
        .registrarAcplicaciones(command.cobro, command.cuentas, command.fecha)
        .pipe(
          map(res => new fromActions.UpdateCobroSuccess(res)),
          catchError(error => of(new fromActions.UpdateCobroFail(error)))
        );
    })
  );

  @Effect()
  generarReciboCobro$ = this.actions$.pipe(
    ofType<fromActions.GenerarRecibo>(CobroActionTypes.GenerarRecibo),
    map(action => action.payload),
    switchMap(cobro => {
      return this.service
        .generarRecibo(cobro)
        .pipe(
          map(res => new fromActions.UpdateCobroSuccess(res)),
          catchError(error => of(new fromActions.UpdateCobroFail(error)))
        );
    })
  );

  @Effect()
  saldarReciboCobro$ = this.actions$.pipe(
    ofType<fromActions.SaldarRecibo>(CobroActionTypes.SaldarRecibo),
    map(action => action.payload),
    switchMap(cobro => {
      return this.service
        .saldar(cobro)
        .pipe(
          map(res => new fromActions.UpdateCobroSuccess(res)),
          catchError(error => of(new fromActions.UpdateCobroFail(error)))
        );
    })
  );

  @Effect({ dispatch: false })
  updateFail$ = this.actions$.pipe(
    ofType<fromActions.UpdateCobroFail>(CobroActionTypes.UpdateCobroFail),
    map(action => action.payload),
    tap(response => {
      const message = response.error ? response.error.message : 'Error';
      console.error('Error actualizando cobro error: ', response.message);
      this.dialogService.openAlert({
        message: `${response.status} ${message}`,
        title: `Error ${response.status}`,
        closeButton: 'Cerrar'
      });
      /*
      this.snackBar.open(`Eerror ${response.status} `, 'Cerrar', {
        duration: 10000,
        verticalPosition: 'top',
        politeness: 'assertive'
      });
      */
    })
  );

  @Effect({ dispatch: false })
  imprimirReciboCobro$ = this.actions$.pipe(
    ofType<fromActions.PrintRecibo>(CobroActionTypes.PrintRecibo),
    map(action => action.payload),
    tap(cobro => {
      this.service.imprimirRecibo(cobro);
    })
  );
}
