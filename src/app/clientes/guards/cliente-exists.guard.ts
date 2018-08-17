import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable ,  of } from 'rxjs';
import { tap, map, filter, take, switchMap, catchError } from 'rxjs/operators';
import * as fromStore from '../store';
import * as fromCliente from '../store/actions/clientes.action';

import { Cliente } from '../models/cliente';
import { ClienteService } from '../services';

@Injectable()
export class ClienteExistsGuard implements CanActivate {
  constructor(
    private store: Store<fromStore.ClientesState>,
    private service: ClienteService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => {
        const id = route.params.id;
        return this.hasCliente(id);
      })
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

  hasCliente(id: string): Observable<boolean> {
    console.log('Obteniendo cliente: ', id);
    return this.hasClienteInStore(id).pipe(
      switchMap(inStore => {
        if (inStore) {
          console.log('Cliente localizado en el Store');
          return of(inStore);
        }
        return this.hasClienteInApi(id);
      })
    );
  }

  hasClienteInStore(id: string): Observable<boolean> {
    console.log('Buscando cliente in store');
    return this.store
      .select(fromStore.getClienteEntities)
      .pipe(
        map((entities: { [key: string]: Cliente }) => !!entities[id]),
        take(1)
      );
  }

  hasClienteInApi(id: string): Observable<boolean> {
    console.log('Buscando cliente en el servidor');
    return this.service.get(id).pipe(
      map(cliente => new fromCliente.LoadClienteAction(cliente)),
      tap((action: fromCliente.LoadClienteAction) =>
        this.store.dispatch(action)
      ),
      map(cliente => console.log('Cliente from api: ', cliente)),
      map(cliente => !!cliente),
      catchError(() => {
        return of(false);
      })
    );
  }
}
