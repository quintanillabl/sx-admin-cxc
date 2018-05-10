import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromVendedores from '../reducers/vendedores.reducer';

import * as _ from 'lodash';

export const getVendedorState = createSelector(
  fromFeature.getCatalogosState,
  (state: fromFeature.CatalogosState) => state.vendedores
);

export const getVendedoresEntities = createSelector(
  getVendedorState,
  fromVendedores.getVendedoresEntities
);

export const getAllVendedores = createSelector(
  getVendedoresEntities,
  entities => _.sortBy(entities, 'nombres')
);

export const getVendedoresLoading = createSelector(
  getVendedorState,
  fromVendedores.getVendedoresLoading
);

export const getVendedoresLoaded = createSelector(
  getVendedorState,
  fromVendedores.getVendedoresLoaded
);
