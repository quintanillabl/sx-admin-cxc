import { createSelector } from '@ngrx/store';

import * as fromRoot from 'app/store';
import * as fromFeature from '../reducers';
import * as fromClientes from '../reducers/clientes.reducer';

import { Cliente } from '../../models/cliente';

export const getClienteState = createSelector(
  fromFeature.getClientesState,
  (state: fromFeature.ClientesState) => state.clientes
);

export const getClienteEntities = createSelector(
  getClienteState,
  fromClientes.getEntites
);

export const getAllClientes = createSelector(getClienteEntities, entities => {
  return Object.keys(entities).map(id => entities[id]);
});

export const getClientesLoadig = createSelector(
  getClienteState,
  fromClientes.getClientesLoading
);
export const getClientesLoaded = createSelector(
  getClienteState,
  fromClientes.getClientesLoaded
);

export const getSelectedCliente = createSelector(
  getClienteEntities,
  fromRoot.getRouterState,
  (entities, router): Cliente => {
    return router.state && entities[router.state.params.id];
  }
);
