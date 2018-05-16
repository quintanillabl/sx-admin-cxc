import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import * as fromActions from '../actions/antiguedad.actions';

import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { AntiguedadDeSalgo } from '../../models/antiguedadDeSalgo';
import { AntiguedadService } from '../../services';

@Injectable()
export class AntiguedadEffects {
  constructor(private actions$: Actions, private service: AntiguedadService) {}

  @Effect()
  loadAntiguedad$ = this.actions$
    .ofType(fromActions.LOAD_ANTIGUEAD_ACTION)
    .pipe(
      switchMap(() => {
        return this.service
          .list()
          .pipe(
            map(res => new fromActions.LoadAntiguedadActionSuccess(res)),
            catchError(error =>
              of(new fromActions.LoadAntiguedadActionFail(error))
            )
          );
      })
    );
}
