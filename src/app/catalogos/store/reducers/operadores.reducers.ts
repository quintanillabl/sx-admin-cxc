import * as fromOperadores from '../actions/index';

import { Operador } from '../../models/operador';

import * as _ from 'lodash';

export interface OperadorState {
  entities: { [id: string]: Operador };
  loading: boolean;
  loaded: boolean;
}

export const initialState: OperadorState = {
  entities: {},
  loading: false,
  loaded: false
};

export function reducer(
  state = initialState,
  action: fromOperadores.OperadoresActions
): OperadorState {
  switch (action.type) {
    case fromOperadores.LOAD_OPERADORES: {
      return {
        ...state,
        loading: true
      };
    }

    case fromOperadores.LOAD_OPERADORES_SUCCESS: {
      const entities = _.keyBy(action.payload, 'clave');
      return {
        ...state,
        entities,
        loading: false,
        loaded: true
      };
    }

    case fromOperadores.LOAD_OPERADORES_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }
  return state;
}

export const getOperadoresEntities = (state: OperadorState) => state.entities;
export const getOperadoresLoading = (state: OperadorState) => state.loading;
export const getOperadoresLoaded = (state: OperadorState) => state.loaded;
