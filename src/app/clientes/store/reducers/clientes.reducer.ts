import * as fromClientes from '../actions/clientes.action';

import { Cliente } from '../../models';

import * as _ from 'lodash';

export interface ClienteState {
  entities: { [id: string]: Cliente };
  loaded: boolean;
  loading: boolean;
}

export const initialState: ClienteState = {
  entities: {},
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromClientes.ClientesAction
): ClienteState {
  switch (action.type) {
    case fromClientes.LOAD_CLIENTES: {
      return {
        ...state,
        loading: true
      };
    }

    case fromClientes.LOAD_CLIENTES_SUCCESS: {
      const entities = _.keyBy(action.payload, 'id');
      return {
        ...state,
        entities,
        loading: false,
        loaded: true
      };
    }

    case fromClientes.LOAD_CLIENTES_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const getClientesLoading = (state: ClienteState) => state.loading;
export const getClientesLoaded = (state: ClienteState) => state.loaded;
export const getEntites = (state: ClienteState) => state.entities;
