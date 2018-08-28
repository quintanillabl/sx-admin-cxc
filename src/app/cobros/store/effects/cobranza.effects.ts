import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { map } from 'rxjs/operators';

import * as fromActions from '../actions/conbranza.actions';
import { RouterNavigationAction } from '@ngrx/router-store';

@Injectable()
export class CobranzaEffects {
  constructor(private actions$: Actions) {}

  /*
  @Effect()
  routerState$ = this.actions$.pipe(
    ofType<RouterNavigationAction>('ROUTER_NAVIGATION'),
    map(action => action.payload.routerState),
    map(routerState => {
      const { url } = routerState;
      if (url.startsWith('/cobranza/cre')) {
        return new fromActions.SetCartera({
          cartera: { clave: 'CRE', descripcion: 'CREDITO' }
        });
      } else if (url.startsWith('/cobranza/con')) {
        return new fromActions.SetCartera({
          cartera: { clave: 'CON', descripcion: 'CONTADO' }
        });
      } else if (url.startsWith('/cobranza/che')) {
        return new fromActions.SetCartera({
          cartera: { clave: 'CHE', descripcion: 'CHEQUE_DEVUELTO' }
        });
      } else if (url.startsWith('/cobranza/jur')) {
        return new fromActions.SetCartera({
          cartera: { clave: 'CON', descripcion: 'JURIDICO' }
        });
      } else {
        return { type: 'NULL_ACTION' };
      }
    })
  );
  */
}
