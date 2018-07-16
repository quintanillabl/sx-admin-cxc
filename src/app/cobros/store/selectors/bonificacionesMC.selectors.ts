import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromBonificaciones from '../reducers/bonificacionesMC.reducer';

import * as _ from 'lodash';

export const getBonificacionesMCState = createSelector(
  fromFeature.getCobranzaState,
  (state: fromFeature.CobranzaState) => state.bonificacionesMC
);

export const getBonificacionesMCEntities = createSelector(
  getBonificacionesMCState,
  fromBonificaciones.getBonificacionesMCEntities
);

export const getAllBonificaciones = createSelector(
  getBonificacionesMCEntities,
  entities => Object.keys(entities).map(id => entities[id])
);

export const getBonificacionesMCLoading = createSelector(
  getBonificacionesMCState,
  fromBonificaciones.getBonificacionesMCLoading
);
