import { createSelector } from '@ngrx/store';

import * as fromRoot from 'app/store';
import * as fromFeature from '../reducers';
import * as fromBonificaciones from '../reducers/bonificacionesMC.reducer';

import * as _ from 'lodash';
import { BonificacionMC } from '../../models/bonificacionMC';

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
export const getBonificacionesMCLoaded = createSelector(
  getBonificacionesMCState,
  fromBonificaciones.getBonificacionesMCLoaded
);

export const getPeriodoDeBonificaciones = createSelector(
  getBonificacionesMCState,
  fromBonificaciones.getPeriodoDeBonificaciones
);

export const getSelectedBonificacion = createSelector(
  getBonificacionesMCEntities,
  fromRoot.getRouterState,
  (entities, router): BonificacionMC => {
    return router.state && entities[router.state.params.bonificacionId];
  }
);
