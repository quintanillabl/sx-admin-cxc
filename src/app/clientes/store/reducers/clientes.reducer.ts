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

    case fromClientes.SEARCH_CLIENTES_SUCCESS:
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

    case fromClientes.UPDATE_CLIENTE_SUCCESS: {
      const cliente = action.payload;
      const entities = { ...state.entities, [cliente.id]: cliente };

      return {
        ...state,
        entities
      };
    }

    case fromClientes.LOAD_CLIENTE: {
      const cliente = action.payload;
      console.log('Agregando cliente a store: ', cliente);
      const entities = { ...state.entities, [cliente.id]: cliente };

      return {
        ...state,
        entities
      };
    }
  }

  return state;
}

export const getClientesLoading = (state: ClienteState) => state.loading;
export const getClientesLoaded = (state: ClienteState) => state.loaded;
export const getEntites = (state: ClienteState) => state.entities;
