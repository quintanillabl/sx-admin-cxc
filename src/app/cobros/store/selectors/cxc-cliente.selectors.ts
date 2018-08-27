import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromCxc from '../reducers/cxc-cliente.reducers';
import { CuentaPorCobrar } from '../../models';

export const getCuentasPorClienteState = createSelector(
  fromFeature.getCobranzaState,
  (state: fromFeature.CobranzaState) => state.cuentasPorCliente
);

export const getCuentasPorClienteEntities = createSelector(
  getCuentasPorClienteState,
  fromCxc.getCuentasPorClienteEntities
);

export const getAllCuentas = createSelector(
  getCuentasPorClienteEntities,
  entities => {
    return Object.keys(entities).map(id => entities[id]);
  }
);

export const getCuentasPorClienteLoaded = createSelector(
  getCuentasPorClienteState,
  fromCxc.getCuentasPorClienteLoaded
);

export const getCuentasPorClienteLoading = createSelector(
  getCuentasPorClienteState,
  fromCxc.getCuentasPorClienteLoading
);

export const getSelectedCuenta = (id: string) =>
  createSelector(getCuentasPorClienteEntities, (entities): CuentaPorCobrar => {
    return entities[id];
  });
