import { createSelector } from '@ngrx/store';

import * as fromRoot from 'app/store';
import * as fromFeature from '../reducers';
import * as fromCobros from '../reducers/cobro.reducer';
import { Cobro } from '../../models';

export const getCobrosState = createSelector(
  fromFeature.getCobranzaState,
  (state: fromFeature.CobranzaState) => state.cobros
);

export const getCobrosEntities = createSelector(
  getCobrosState,
  fromCobros.selectEntities
);

export const getAllCobros = createSelector(
  getCobrosState,
  fromCobros.selectAll
);

export const getCobrosLoaded = createSelector(
  getCobrosState,
  fromCobros.getCobrosLoaded
);

export const getCobrosLoading = createSelector(
  getCobrosState,
  fromCobros.getCobrosLoading
);

export const getSelectedCobro = createSelector(
  getCobrosEntities,
  fromRoot.getRouterState,
  (entities, router): Cobro => {
    return router.state && entities[router.state.params.cobroId];
  }
);

export const getCobrosFilter = createSelector(
  getCobrosState,
  fromCobros.getCobrosFilter
);
