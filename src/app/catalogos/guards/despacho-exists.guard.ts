import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot
} from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';
import * as fromStore from '../store';

import { Despacho } from '../models/despacho';

@Injectable()
export class DespachoExistsGuard implements CanActivate {
  constructor(private store: Store<fromStore.CatalogosState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkStore().pipe(
      switchMap(() => {
        const id = route.params.despachoId;
        return this.hasDespacho(id);
      })
    );
  }

  hasDespacho(id: string): Observable<boolean> {
    return this.store
      .select(fromStore.getDespachosEntities)
      .pipe(
        map((entities: { [key: string]: Despacho }) => !!entities[id]),
        take(1)
      );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getDespachosLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadDespachos());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
