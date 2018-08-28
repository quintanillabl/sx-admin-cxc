import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';
import * as fromRoot from 'app/store';
import * as fromStore from '../store';
import * as fromActions from '../store/actions';

import { Observable, of } from 'rxjs';
import { tap, map, filter, take, switchMap, catchError } from 'rxjs/operators';

import { CobrosService } from '../services';
import { Cartera } from '../models/cartera';

@Injectable()
export class CobroExistsGuard implements CanActivate {
  constructor(
    private store: Store<fromStore.CobranzaState>,
    private service: CobrosService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const cartera: Cartera = route.parent.data.cartera;
    console.log('Cartera: ', cartera);
    return this.checkStore(cartera).pipe(
      switchMap(() => {
        const id = route.params.cobroId;
        return this.hasCobroInApi(id);
      })
    );
  }

  checkStore(cartera: Cartera): Observable<boolean> {
    return this.store.select(fromStore.getCobrosLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadCobros());
        }
      }),
      filter(loaded => loaded), // Waiting for loaded
      take(1) // End the stream
    );
  }

  hasCobroInApi(id: string): Observable<boolean> {
    return this.service.get(id).pipe(
      map(cobro => new fromActions.UpdateCobroSuccess(cobro)),
      tap(action => this.store.dispatch(action)),
      map(action => !!action.payload),
      catchError(error => {
        console.error('No se puede activar la ruta error: ', error);
        // this.store.dispatch(new fromRoot.Back());
        return of(false);
      })
    );
  }
}
