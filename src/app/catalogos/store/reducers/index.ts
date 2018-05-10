import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromOperadores from './operadores.reducers';
import * as fromCobradores from './cobradores.reducers';
import * as fromVendedores from './vendedores.reducer';
import * as fromDespachos from './despachos.reducers';

export interface CatalogosState {
  operadores: fromOperadores.OperadorState;
  cobradores: fromCobradores.CobradorState;
  vendedores: fromVendedores.VendedorState;
  despachos: fromDespachos.DespachoState;
}

export const reducers: ActionReducerMap<CatalogosState> = {
  operadores: fromOperadores.reducer,
  cobradores: fromCobradores.reducer,
  vendedores: fromVendedores.reducer,
  despachos: fromDespachos.reducer
};

// Operadores slice
export const getCatalogosState = createFeatureSelector<CatalogosState>(
  'catalogos'
);
