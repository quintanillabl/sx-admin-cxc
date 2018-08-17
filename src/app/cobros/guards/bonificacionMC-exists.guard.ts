import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';
import * as fromStore from '../store';
import * as bonificacionesActions from '../store/actions/bonificacionMC.actions';

import { Observable } from 'rxjs';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';
import { BonificacionMC } from '../models/bonificacionMC';

@Injectable()
export class BonificacionMCExistsGuard implements CanActivate {
  constructor(private store: Store<fromStore.CobranzaState>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => {
        const id = route.params.bonificacionId;
        return this.hasBonificacion(id);
      })
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getBonificacionesMCLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new bonificacionesActions.LoadBonificacionesMC());
        }
      }),
      filter(loaded => loaded), // Waiting for loaded
      take(1) // End the stream
    );
  }

  hasBonificacion(id: string): Observable<boolean> {
    return this.store
      .select(fromStore.getBonificacionesMCEntities)
      .pipe(
        map((entities: { [key: string]: BonificacionMC }) => !!entities[id]),
        take(1)
      );
  }
}
