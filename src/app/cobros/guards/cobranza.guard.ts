import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

import * as fromStore from '../store';
import * as fromActions from '../store/actions/conbranza.actions';
import { Cartera } from '../models/cartera';

@Injectable()
export class CobranzaGuard implements CanActivate {
  constructor(private store: Store<fromStore.CobranzaState>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const cartera: Cartera = route.data.cartera;
    return this.checkCartera(cartera).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkCartera(cartera: Cartera): Observable<Cartera> {
    return this.store.select(fromStore.getCartera).pipe(
      tap(targetCartera => {
        if (!targetCartera || targetCartera.clave !== cartera.clave) {
          this.store.dispatch(new fromActions.SetCartera({ cartera }));
        }
      }),
      filter((res: Cartera) => res.clave === cartera.clave), // Waiting for cartera set
      take(1) // End the stream
    );
  }
}
