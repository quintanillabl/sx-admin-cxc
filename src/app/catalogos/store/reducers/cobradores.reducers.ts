import { createFeatureSelector } from '@ngrx/store';

import * as fromCobradores from '../actions/cobradores.actions';

import * as _ from 'lodash';

export interface CobradorState {
  entities: {};
  loading: boolean;
  loaded: boolean;
}

export const initialState: CobradorState = {
  entities: {},
  loading: false,
  loaded: false
};

export function reducer(
  state = initialState,
  action: fromCobradores.CobradoresActions
): CobradorState {
  switch (action.type) {
    case fromCobradores.LOAD_COBRADORES: {
      return {
        ...state,
        loading: true
      };
    }
    case fromCobradores.LOAD_COBRADORES_SUCCESS: {
      const entities = _.keyBy(action.payload, 'id');
      return {
        entities,
        loading: false,
        loaded: true
      };
    }

    case fromCobradores.LOAD_COBRADORES_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case fromCobradores.UPDATE_COBRADOR_SUCCESS:
    case fromCobradores.CREATE_COBRADOR_SUCCESS: {
      const cobrador = action.payload;
      const entities = { ...state.entities, [cobrador.id]: cobrador };
      return {
        ...state,
        entities
      };
    }

    case fromCobradores.REMOVE_COBRADOR_SUCCESS: {
      const cobrador = action.payload;
      const { [cobrador.id]: result, ...entities } = state.entities;

      return {
        ...state,
        entities
      };
    }
  }

  return state;
}

export const getCobradoresEntities = (state: CobradorState) => state.entities;
export const getCobradoresLoading = (state: CobradorState) => state.loaded;
export const getCobradoresLoaded = (state: CobradorState) => state.loaded;
