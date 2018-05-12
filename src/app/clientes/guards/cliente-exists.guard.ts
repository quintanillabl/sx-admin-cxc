import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';
import * as fromStore from '../store';

import { Cliente } from '../models/cliente';

@Injectable()
export class ClienteExistsGuard implements CanActivate {
  constructor(private store: Store<fromStore.ClientesState>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => {
        const id = route.params.id;
        return this.hasCliente(id);
      })
    );
  }

  hasCliente(id: string): Observable<boolean> {
    return this.store
      .select(fromStore.getClienteEntities)
      .pipe(
        map((entities: { [key: string]: Cliente }) => !!entities[id]),
        take(1)
      );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getClientesLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadClientes());
        }
      }),
      filter(loaded => loaded), // Waiting for loaded
      take(1) // End the stream
    );
  }
}
