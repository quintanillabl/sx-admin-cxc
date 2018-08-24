import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromCobranza from '../reducers/cobranza.reducer';

export const getCarteraState = createSelector(
  fromFeature.getCobranzaState,
  (state: fromFeature.CobranzaState) => state.cobranza
);

export const getCartera = createSelector(
  getCarteraState,
  fromCobranza.getCartera
);
