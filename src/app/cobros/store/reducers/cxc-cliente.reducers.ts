import {
  CuentasPorClienteActions,
  CuentasPorClienteActionTypes
} from '../actions/cxc-cliente.actions';

import { CuentaPorCobrar } from '../../models';
import { Cliente } from 'app/clientes/models';

import * as _ from 'lodash';

export interface State {
  cliente: Partial<Cliente>;
  entities: { [id: string]: CuentaPorCobrar };
  loading: boolean;
  loaded: boolean;
}

export const initialState: State = {
  cliente: null,
  entities: {},
  loading: false,
  loaded: false
};

export function reducer(
  state = initialState,
  action: CuentasPorClienteActions
): State {
  switch (action.type) {
    case CuentasPorClienteActionTypes.SetCurrentCliente: {
      return {
        ...state,
        cliente: action.payload
      };
    }

    case CuentasPorClienteActionTypes.LoadCuentasPorCliente: {
      return {
        ...state,
        loading: true
      };
    }

    case CuentasPorClienteActionTypes.LoadCuentasPorClienteFail: {
      return {
        ...state,
        loading: false
      };
    }

    case CuentasPorClienteActionTypes.LoadCuentasPorClienteSuccess: {
      const entities = _.keyBy(action.payload, 'id');
      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    }

    default: {
      return state;
    }
  }
}

export const getCuentasPorClienteLoading = (state: State) => state.loading;
export const getCuentasPorClienteLoaded = (state: State) => state.loaded;
export const getCuentasPorClienteEntities = (state: State) => state.entities;
