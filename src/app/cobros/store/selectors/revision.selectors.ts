import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromRevision from '../reducers/revision.reducer';

import * as _ from 'lodash';

export const getRevisionState = createSelector(
  fromFeature.getCobranzaState,
  (state: fromFeature.CobranzaState) => state.revision
);

export const getRevisionEntities = createSelector(
  getRevisionState,
  fromRevision.getRevisionEntities
);

export const getAllRevisiones = createSelector(getRevisionEntities, entities =>
  Object.keys(entities).map(id => entities[id])
);

export const getRevisionesSorted = createSelector(getAllRevisiones, list =>
  _.sortBy(list, 'nombre')
);

export const getRevisionesLoading = createSelector(
  getRevisionState,
  fromRevision.getRevisionLoading
);

export const getRevisionLoaded = createSelector(
  getRevisionState,
  fromRevision.getRevisionLoading
);
