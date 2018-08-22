import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

import * as fromStore from '../store';
import { Cartera } from '../models/cartera';

@Injectable()
export class CobrosGuard implements CanActivate {
  constructor(private store: Store<fromStore.CobranzaState>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const cartera: Cartera = route.parent.data.cartera;
    return this.checkStore(cartera).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(cartera: Cartera): Observable<boolean> {
    return this.store.select(fromStore.getCobrosLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadCobros(cartera));
        }
      }),
      filter(loaded => loaded), // Waiting for loaded
      take(1) // End the stream
    );
  }
}
