import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import * as fromStore from '../store';
import * as fromCheques from '../store/actions/cheques.actions';

import { Observable } from 'rxjs/Observable';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ChequesGuard implements CanActivate {
  constructor(private store: Store<fromStore.CobranzaChequesDevueltosState>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getChequesLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromCheques.LoadChequesAction());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
