import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector
} from '@ngrx/store';

import * as fromClientes from './clientes.reducer';

export interface ClientesState {
  clientes: fromClientes.ClienteState;
}

export const reducers: ActionReducerMap<ClientesState> = {
  clientes: fromClientes.reducer
};

export const getClientesState = createFeatureSelector<ClientesState>(
  'clientes'
);
