import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromCheques from '../reducers/cheque.reducer';

export const getChequesState = createSelector(
  fromFeature.getCobranzaChequesDevueltosState,
  (state: fromFeature.CobranzaChequesDevueltosState) => state.cheques,
);

export const getChequesEntites = createSelector(
  getChequesState,
  fromCheques.getChequeEntities,
);

export const getAllCheques = createSelector(getChequesEntites, entities =>
  Object.keys(entities).map(id => entities[id]),
);

export const getChequesLoaded = createSelector(
  getChequesState,
  fromCheques.getChequeLoaded,
);
export const getChequesLoading = createSelector(
  getChequesState,
  fromCheques.getChequeLoading,
);
