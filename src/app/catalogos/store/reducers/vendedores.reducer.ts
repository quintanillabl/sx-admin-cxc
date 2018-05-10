import { createFeatureSelector, StateObservable } from '@ngrx/store';

import * as fromVendedores from '../actions/vendedores.actions';

import * as _ from 'lodash';

export interface VendedorState {
  entities: {};
  loading: boolean;
  loaded: boolean;
}

export const initialState: VendedorState = {
  entities: {},
  loading: false,
  loaded: false
};

export function reducer(
  state = initialState,
  action: fromVendedores.VendedoresActions
): VendedorState {
  switch (action.type) {
    case fromVendedores.LOAD_VENDEDORES: {
      return {
        ...state,
        loading: true
      };
    }
    case fromVendedores.LOAD_VENDEDORES_SUCCESS: {
      const entities = _.keyBy(action.payload, 'id');
      return {
        entities,
        loading: false,
        loaded: true
      };
    }

    case fromVendedores.LOAD_VENDEDORES_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case fromVendedores.UPDATE_VENDEDOR_SUCCESS:
    case fromVendedores.CREATE_VENDEDOR_SUCCESS: {
      const vendedor = action.payload;
      const entities = { ...state.entities, [vendedor.id]: vendedor };
      return {
        ...state,
        entities
      };
    }

    case fromVendedores.REMOVE_VENDEDOR_SUCCESS: {
      const vendedor = action.payload;
      const { [vendedor.id]: result, ...entities } = state.entities;

      return {
        ...state,
        entities
      };
    }
  }

  return state;
}

export const getVendedoresEntities = (state: VendedorState) => state.entities;
export const getVendedoresLoading = (state: VendedorState) => state.loaded;
export const getVendedoresLoaded = (state: VendedorState) => state.loaded;
