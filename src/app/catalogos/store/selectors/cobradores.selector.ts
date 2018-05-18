import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromCobradores from '../reducers/cobradores.reducers';

import * as _ from 'lodash';

export const getCobradorState = createSelector(
  fromFeature.getCatalogosState,
  (state: fromFeature.CatalogosState) => state.cobradores
);

export const getCobradoresEntities = createSelector(
  getCobradorState,
  fromCobradores.getCobradoresEntities
);

export const getAllCobradores = createSelector(
  getCobradoresEntities,
  entities => _.sortBy(Object.keys(entities).map(id => entities[id]), 'id')
);

export const getCobradoresLoading = createSelector(
  getCobradorState,
  fromCobradores.getCobradoresLoading
);

export const getCobradoresLoaded = createSelector(
  getCobradorState,
  fromCobradores.getCobradoresLoaded
);
