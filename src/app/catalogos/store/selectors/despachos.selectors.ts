import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromDepachos from '../reducers/despachos.reducers';
import * as fromRoot from 'app/store';

import { Despacho } from '../../models/despacho';

import * as _ from 'lodash';

export const getDespachosState = createSelector(
  fromFeature.getCatalogosState,
  (state: fromFeature.CatalogosState) => state.despachos
);

export const getDespachosEntities = createSelector(
  getDespachosState,
  fromDepachos.getDespachosEntities
);

export const getAllDespachos = createSelector(getDespachosEntities, entities =>
  _.sortBy(Object.keys(entities).map(id => entities[id]), 'id')
);

export const getDespachosLoading = createSelector(
  getDespachosState,
  fromDepachos.getDespachosLoading
);

export const getDespachosLoaded = createSelector(
  getDespachosState,
  fromDepachos.getDespachosLoaded
);

export const getSelectedDespacho = createSelector(
  getDespachosEntities,
  fromRoot.getRouterState,
  (entities, router): Despacho => {
    return router.state && entities[router.state.params.despachoId];
  }
);
