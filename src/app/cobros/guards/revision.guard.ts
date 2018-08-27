import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import * as fromStore from '../store';
import * as revisionActions from '../store/actions/revision.actions';

import { Observable ,  of } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class RevisionGuard implements CanActivate {
  constructor(private store: Store<fromStore.CobranzaState>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getRevisionLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new revisionActions.LoadRevisionAction());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
