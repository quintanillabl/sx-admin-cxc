import { createFeatureSelector } from '@ngrx/store';

import * as fromDespachos from '../actions/despachos.actions';
import { Despacho } from '../../models/despacho';

import * as _ from 'lodash';

export interface DespachoState {
  entities: { [id: string]: Despacho };
  loading: boolean;
  loaded: boolean;
}

export const initialState: DespachoState = {
  entities: {},
  loading: false,
  loaded: false
};

export function reducer(
  state = initialState,
  action: fromDespachos.DespachosActions
): DespachoState {
  switch (action.type) {
    case fromDespachos.LOAD_DESPACHOS: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromDespachos.LOAD_DESPACHOS_SUCCESS: {
      const despachos = action.payload;
      const entities = _.keyBy(despachos, 'id');
      return {
        ...state,
        entities,
        loading: false,
        loaded: true
      };
    }

    case fromDespachos.LOAD_DESPACHOS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case fromDespachos.UPDATE_DESPACHO_SUCCESS:
    case fromDespachos.CREATE_DESPACHO_SUCCESS: {
      const despacho = action.payload;
      const entities = { ...state.entities, [despacho.id]: despacho };

      return {
        ...state,
        entities
      };
    }

    case fromDespachos.REMOVE_DESPACHO_SUCCESS: {
      const despacho = action.payload;
      const { [despacho.id]: result, ...entities } = state.entities;
      return {
        ...state,
        entities
      };
    }
  }

  return state;
}

export const getDespachosEntities = (state: DespachoState) => state.entities;
export const getDespachosLoading = (state: DespachoState) => state.loading;
export const getDespachosLoaded = (state: DespachoState) => state.loaded;
