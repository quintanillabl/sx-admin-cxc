import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'app/store';
import * as fromStore from '../../store';
import * as fromActions from '../actions/cobros.actions';
import * as fromCobranza from '../../store/selectors/cobranza.selectors';
import * as fromCobros from '../../store/selectors/cobros.selectors';

import { of } from 'rxjs';
import {
  map,
  switchMap,
  tap,
  catchError,
  withLatestFrom
} from 'rxjs/operators';

import { CobroActionTypes } from '../actions/cobros.actions';

import { CobrosService } from '../../services';

import { TdDialogService } from '@covalent/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class CobrosEffects {
  constructor(
    private actions$: Actions,
    private service: CobrosService,
    private store: Store<fromStore.CobranzaState>,
    private dialogService: TdDialogService,
    private snackBar: MatSnackBar
  ) {}

  @Effect()
  loadCobros$ = this.actions$.pipe(
    ofType<fromActions.LoadCobros>(CobroActionTypes.LoadCobros),
    withLatestFrom(
      this.store.pipe(select(fromCobranza.getCartera)),
      this.store.pipe(select(fromCobros.getCobrosFilter)),
      (action, cartera, filter) => {
        return {
          ...filter,
          cartera: cartera.clave,
          cliente: filter.cliente ? filter.cliente.id : null
        };
      }
    ),
    switchMap(command => {
      return this.service
        .search(command)
        .pipe(
          map(res => new fromActions.LoadCobrosSuccess(res)),
          catchError(error => of(new fromActions.LoadCobrosFail(error)))
        );
    })
  );

  @Effect()
  setCobros = this.actions$.pipe(
    ofType<fromActions.SetCobrosFilter>(CobroActionTypes.SetCobrosFilter),
    map(action => new fromActions.LoadCobros())
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
        .registrarAcplicaciones(command.cobro, command.cuentas)
        .pipe(
          map(res => new fromActions.UpdateCobroSuccess(res)),
          catchError(error => of(new fromActions.UpdateCobroFail(error)))
        );
    })
  );

  @Effect()
  eliminarAplicacion$ = this.actions$.pipe(
    ofType<fromActions.EliminarAplicacion>(CobroActionTypes.EliminarAplicacion),
    map(action => action.payload),
    switchMap(command => {
      return this.service
        .eliminarAcplicacion(command.aplicacion)
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
    ofType<
      | fromActions.UpdateCobroFail
      | fromActions.PrintReciboFail
      | fromActions.EnvioDeReciboBatchFail
    >(
      CobroActionTypes.UpdateCobroFail,
      CobroActionTypes.PrintReciboFail,
      CobroActionTypes.EnvioDeReciboBatchFail
    ),
    map(action => action.payload),
    tap(response => {
      const message = response.error ? response.error.message : 'Error';
      console.error('Error: ', response.message);
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

  @Effect()
  imprimirReciboCobro$ = this.actions$.pipe(
    ofType<fromActions.PrintRecibo>(CobroActionTypes.PrintRecibo),
    map(action => action.payload),
    switchMap(cobro => {
      return this.service
        .imprimirRecibo(cobro)
        .pipe(
          map(res => new fromActions.PrintReciboSuccess(res)),
          catchError(error => of(new fromActions.PrintReciboFail(error)))
        );
    })
  );

  @Effect({ dispatch: false })
  printSuccess$ = this.actions$.pipe(
    ofType<fromActions.PrintReciboSuccess>(CobroActionTypes.PrintReciboSuccess),
    map(action => action.payload),
    tap(res => {
      const blob = new Blob([res], {
        type: 'application/pdf'
      });
      const fileURL = window.URL.createObjectURL(blob);
      window.open(fileURL, '_blank');
    })
  );

  @Effect()
  timbradoBatch$ = this.actions$.pipe(
    ofType<fromActions.TimbradoBatch>(CobroActionTypes.TimbradoBatch),
    map(action => action.payload),
    switchMap(res => {
      return this.service
        .timbradoBatch(res.cobros)
        .pipe(
          map(cobros => new fromActions.UpsertCobros(cobros)),
          catchError(error => of(new fromActions.UpdateCobroFail(error)))
        );
    })
  );

  @Effect()
  envioPorCorreo$ = this.actions$.pipe(
    ofType<fromActions.EnvioDeRecibo>(CobroActionTypes.EnvioDeRecibo),
    map(action => action.payload),
    switchMap(res => {
      return this.service
        .enviarRecibo(res.cobro, res.target)
        .pipe(
          map(cfdi => new fromActions.EnvioDeReciboBatchSuccess([cfdi])),
          catchError(error => of(new fromActions.EnvioDeReciboBatchFail(error)))
        );
    })
  );

  @Effect()
  envioBatch$ = this.actions$.pipe(
    ofType<fromActions.EnvioDeReciboBatch>(CobroActionTypes.EnvioDeReciboBatch),
    map(action => action.payload),
    switchMap(res => {
      return this.service
        .envioBatch(res.cobros, res.target)
        .pipe(
          map(
            (cfdis: any[]) => new fromActions.EnvioDeReciboBatchSuccess(cfdis)
          ),
          catchError(error => of(new fromActions.EnvioDeReciboBatchFail(error)))
        );
    })
  );

  @Effect({ dispatch: false })
  envioBatchSuccess$ = this.actions$.pipe(
    ofType<fromActions.EnvioDeReciboBatchSuccess>(
      CobroActionTypes.EnvioDeReciboBatchSuccess
    ),
    map(action => action.payload),
    tap(res => {
      this.snackBar.open(`Recibos enviados ${res.length} `, 'Cerrar', {
        duration: 10000
      });
    })
  );
}
