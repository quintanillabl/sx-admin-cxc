import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromAntiguedad from '../reducers/antiguedad.reducer';

import * as _ from 'lodash';

export const getAntigueadState = createSelector(
  fromFeature.getAntigueadDeSaldosState,
  (state: fromFeature.AntiguedadDeSaldoState) => state.antiguedad
);

export const getAntiguedadEntities = createSelector(
  getAntigueadState,
  fromAntiguedad.getAntiguedadEntities
);

export const getAllAntiguedad = createSelector(
  getAntiguedadEntities,
  entities => _.sortBy(entities, ['part']).reverse()
);

export const getAntiguedadLoading = createSelector(
  getAntigueadState,
  fromAntiguedad.getAntiguedadLoading
);

export const getAntiguedadLoaded = createSelector(
  getAntigueadState,
  fromAntiguedad.getAntiguedadLoaded
);
