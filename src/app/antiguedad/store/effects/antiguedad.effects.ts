import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import * as fromActions from '../actions/antiguedad.actions';

import {
  map,
  tap,
  switchMap,
  catchError,
  distinctUntilChanged,
  filter
} from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { AntiguedadDeSaldo } from '../../models/antiguedadDeSaldo';
import { AntiguedadService } from '../../services';

@Injectable()
export class AntiguedadEffects {
  constructor(private actions$: Actions, private service: AntiguedadService) {}

  @Effect()
  loadAntiguedad$ = this.actions$
    .ofType(fromActions.LOAD_ANTIGUEAD_ACTION)
    .pipe(
      switchMap(() => {
        return this.service
          .list()
          .pipe(
            map(res => new fromActions.LoadAntiguedadActionSuccess(res)),
            catchError(error =>
              of(new fromActions.LoadAntiguedadActionFail(error))
            )
          );
      })
    );

  @Effect()
  selectAntiguedad$ = this.actions$
    .ofType(fromActions.SET_SELECTED_ACTION)
    .pipe(
      map((action: fromActions.SetSelectedAction) => action.payload),
      filter(ant => !!ant),
      distinctUntilChanged((a, b) => a.clienteId === b.clienteId),
      // tap(antiquedad => console.log('Buscando facturas para: ', antiquedad)),
      switchMap(antiguedad => {
        return this.service
          .cxc(antiguedad.clienteId)
          .pipe(
            map(res => new fromActions.SetSelectedFacturasAction(res)),
            catchError(error =>
              of(new fromActions.SetSelectedFacturasActionFail(error))
            )
          );
      })
    );

  @Effect()
  unselectAntiguedad$ = this.actions$
    .ofType(fromActions.SET_SELECTED_ACTION)
    .pipe(
      map((action: fromActions.SetSelectedAction) => action.payload),
      filter(ant => !ant),
      // tap(() => console.log('Limpiando facturas por unseleccion')),
      map(() => new fromActions.SetSelectedFacturasAction([]))
    );

  @Effect({ dispatch: false })
  printAntiguedad$ = this.actions$
    .ofType(fromActions.PRINT_ANTIGUEDAD_ACTION)
    .pipe(
      tap(() => {
        this.service.print().subscribe(
          res => {
            const blob = new Blob([res], {
              type: 'application/pdf'
            });
            const fileUrl = window.URL.createObjectURL(blob);
            window.open(fileUrl, '_blank');
          },
          error1 => {
            console.log('Error al tratar de imprimir antiguead de saldos');
          }
        );
      })
    );

  @Effect({ dispatch: false })
  printCarteraCOD$ = this.actions$.ofType(fromActions.PRINT_CARTERA_COD).pipe(
    map((action: fromActions.PrintCarteraCodAction) => action.payload),
    tap(payload => {
      this.service
        .reporteDeCobranzaCOD(payload.sucursal, payload.fecha)
        .subscribe(
          res => {
            const blob = new Blob([res], {
              type: 'application/pdf'
            });
            const fileUrl = window.URL.createObjectURL(blob);
            window.open(fileUrl, '_blank');
          },
          error1 => {
            console.log('Error al tratar de imprimir antiguead de saldos');
          }
        );
    })
  );
}
