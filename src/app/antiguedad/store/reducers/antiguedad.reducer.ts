import * as fromAntiguedad from '../actions/antiguedad.actions';

import { AntiguedadDeSalgo } from '../../models/antiguedadDeSalgo';

import * as _ from 'lodash';

export interface AntiguedadState {
  entities: { [id: string]: AntiguedadDeSalgo };
  loaded: boolean;
  loading: boolean;
}

export const initialState: AntiguedadState = {
  entities: {},
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromAntiguedad.AntiguedadActions
): AntiguedadState {
  switch (action.type) {
    case fromAntiguedad.LOAD_ANTIGUEAD_ACTION: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    case fromAntiguedad.LOAD_ANTIGUEAD_ACTION_SUCCESS: {
      const entities = _.keyBy(action.payload, 'clienteId');
      return {
        ...state,
        entities,
        loading: false,
        loaded: true
      };
    }
  }
  return state;
}

export const getAntiguedadEntities = (state: AntiguedadState) => state.entities;
export const getAntiguedadLoading = (state: AntiguedadState) => state.loaded;
export const getAntiguedadLoaded = (state: AntiguedadState) => state.loaded;
