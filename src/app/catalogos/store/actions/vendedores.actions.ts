import { Action } from '@ngrx/store';

import { Vendedor } from '../../models/vendedor';

export const LOAD_VENDEDORES = '[Catalogos] Load Vendedores';
export const LOAD_VENDEDORES_FAIL = '[Catalogos] Load Vendedores Fail';
export const LOAD_VENDEDORES_SUCCESS = '[Catalogos] Load Vendedores Success';

export class LoadVendedores implements Action {
  readonly type = LOAD_VENDEDORES;
}

export class LoadVendedoresFail implements Action {
  readonly type = LOAD_VENDEDORES_FAIL;
  constructor(public payload: any) {}
}

export class LoadVendedoresSuccess implements Action {
  readonly type = LOAD_VENDEDORES_SUCCESS;
  constructor(public payload: Vendedor[]) {}
}

// Create actions
export const CREATE_VENDEDOR = '[Catalogos] Create vendedor';
export const CREATE_VENDEDOR_FAIL = '[Catalogos] Create vendedor Fail';
export const CREATE_VENDEDOR_SUCCESS = '[Catalogos] Create vendedor Success';

export class CreateVendedor implements Action {
  readonly type = CREATE_VENDEDOR;
  constructor(public payload: Vendedor) {}
}

export class CreateVendedorFail implements Action {
  readonly type = CREATE_VENDEDOR_FAIL;
  constructor(public payload: any) {}
}

export class CreateVendedorSuccess implements Action {
  readonly type = CREATE_VENDEDOR_SUCCESS;
  constructor(public payload: Vendedor) {}
}

// Create actions
export const UPDATE_VENDEDOR = '[Catalogos] Update vendedor';
export const UPDATE_VENDEDOR_FAIL = '[Catalogos] Update vendedor Fail';
export const UPDATE_VENDEDOR_SUCCESS = '[Catalogos] Update vendedor Success';

export class UpdateVendedor implements Action {
  readonly type = UPDATE_VENDEDOR;
  constructor(public payload: Vendedor) {}
}

export class UpdateVendedorFail implements Action {
  readonly type = UPDATE_VENDEDOR_FAIL;
  constructor(public payload: any) {}
}

export class UpdateVendedorSuccess implements Action {
  readonly type = UPDATE_VENDEDOR_SUCCESS;
  constructor(public payload: Vendedor) {}
}

// Delete actions
// Create actions
export const REMOVE_VENDEDOR = '[Catalogos] Remove vendedor';
export const REMOVE_VENDEDOR_FAIL = '[Catalogos] Remove vendedor Fail';
export const REMOVE_VENDEDOR_SUCCESS = '[Catalogos] Remove vendedor Success';

export class RemoveVendedor implements Action {
  readonly type = REMOVE_VENDEDOR;
  constructor(public payload: Vendedor) {}
}

export class RemoveVendedorFail implements Action {
  readonly type = REMOVE_VENDEDOR_FAIL;
  constructor(public payload: any) {}
}

export class RemoveVendedorSuccess implements Action {
  readonly type = REMOVE_VENDEDOR_SUCCESS;
  constructor(public payload: Vendedor) {}
}

export type VendedoresActions =
  | LoadVendedores
  | LoadVendedoresFail
  | LoadVendedoresSuccess
  | CreateVendedor
  | CreateVendedorFail
  | CreateVendedorSuccess
  | UpdateVendedor
  | UpdateVendedorFail
  | UpdateVendedorSuccess
  | RemoveVendedor
  | RemoveVendedorFail
  | RemoveVendedorSuccess;
