import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import * as fromRevision from './revision.reducer';
import * as fromBonificaciones from './bonificacionesMC.reducer';

export interface CobranzaState {
  revision: fromRevision.RevisionState;
  bonificacionesMC: fromBonificaciones.BonificacionesMCState;
}

export const reducers: ActionReducerMap<CobranzaState> = {
  revision: fromRevision.reducer,
  bonificacionesMC: fromBonificaciones.reducer
};

// Cobranza slice
export const getCobranzaState = createFeatureSelector('cobranza');
