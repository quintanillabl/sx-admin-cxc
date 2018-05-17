import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import * as fromRevision from './revision.reducer';

export interface CobranzaState {
  revision: fromRevision.RevisionState;
}

export const reducers: ActionReducerMap<CobranzaState> = {
  revision: fromRevision.reducer
};

// Cobranza slice
export const getCobranzaState = createFeatureSelector('cobranza');
