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
import { of } from 'rxjs';

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
      map((action: fromActions.PrintAntiguedadAction) => action.payload),
      tap(command => {
        this.service.print(command).subscribe(
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

  @Effect({ dispatch: false })
  printAntiguedadPorCte$ = this.actions$
    .ofType(fromActions.PRINT_ANTIGUEDAD_POR_CLIENTE_ACTION)
    .pipe(
      map(
        (action: fromActions.PrintAntiguedadPorClienteAction) => action.payload
      ),
      tap(payload => {
        this.service
          .antiguedadPorCliente(payload.cliente, payload.fecha)
          .subscribe(
            res => {
              const blob = new Blob([res], {
                type: 'application/pdf'
              });
              const fileUrl = window.URL.createObjectURL(blob);
              window.open(fileUrl, '_blank');
            },
            error1 => {
              console.log(
                'Error al tratar de imprimir antiguead de saldos por cliente'
              );
            }
          );
      })
    );

  @Effect({ dispatch: false })
  printClientesSuspendidos$ = this.actions$
    .ofType(fromActions.PRINT_CLIENTES_SUSPENEIDOS_ACTION)
    .pipe(
      tap(() => {
        this.service.clientesSuspendidosCre().subscribe(
          res => {
            const blob = new Blob([res], {
              type: 'application/pdf'
            });
            const fileUrl = window.URL.createObjectURL(blob);
            window.open(fileUrl, '_blank');
          },
          error1 => {
            console.log(
              'Error al tratar de imprimir reporte de clientes suspendidos'
            );
          }
        );
      })
    );

  @Effect({ dispatch: false })
  printFacturasConDevolucion$ = this.actions$
    .ofType(fromActions.PRINT_FACTURAS_CON_DEVOLUCION_ACTION)
    .pipe(
      map(
        (action: fromActions.PrintFacturasConDevolucionAction) => action.payload
      ),
      tap(payload => {
        this.service.facturasConNotaDevolucion(payload).subscribe(
          res => {
            const blob = new Blob([res], {
              type: 'application/pdf'
            });
            const fileUrl = window.URL.createObjectURL(blob);
            window.open(fileUrl, '_blank');
          },
          error1 => {
            console.log(
              'Error al tratar de imprimir antiguead de saldos por cliente'
            );
          }
        );
      })
    );

  @Effect({ dispatch: false })
  printExceptionesDescuentos$ = this.actions$
    .ofType(fromActions.PRINT_EXCEPCIONES_DESCUENTOS_ACTION)
    .pipe(
      map(
        (action: fromActions.PrintExceptionesDescuentosAction) => action.payload
      ),
      tap(payload => {
        this.service.exceptionesDescuentos(payload).subscribe(
          res => {
            const blob = new Blob([res], {
              type: 'application/pdf'
            });
            const fileUrl = window.URL.createObjectURL(blob);
            window.open(fileUrl, '_blank');
          },
          error1 => {
            console.log(
              'Error al tratar de imprimir reporte de exceptiones en descuentos'
            );
          }
        );
      })
    );
}
