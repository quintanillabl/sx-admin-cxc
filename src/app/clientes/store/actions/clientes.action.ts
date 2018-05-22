import { Action } from '@ngrx/store';
import { Cliente } from '../../models';

export const LOAD_CLIENTES = '[Clientes] Load Clientes';
export const LOAD_CLIENTES_FAIL = '[Clientes] Load Clientes Fail';
export const LOAD_CLIENTES_SUCCESS = '[Clientes] Load Clientes Success';

export class LoadClientes implements Action {
  readonly type = LOAD_CLIENTES;
}

export class LoadClientesFail implements Action {
  readonly type = LOAD_CLIENTES_FAIL;

  constructor(public payload: any) {}
}

export class LoadClientesSuccess implements Action {
  readonly type = LOAD_CLIENTES_SUCCESS;

  constructor(public payload: Cliente[]) {}
}

// Update actions
export const UPDATE_CLIENTE = '[Cliente] Cliente Update';
export const UPDATE_CLIENTE_FAIL = '[Cliente] Cliente Update Fail';
export const UPDATE_CLIENTE_SUCCESS = '[Cliente] Cliente Update Success';

export class UpdateCliente implements Action {
  readonly type = UPDATE_CLIENTE;
  constructor(public payload: Cliente) {}
}
export class UpdateClienteFail implements Action {
  readonly type = UPDATE_CLIENTE_FAIL;
  constructor(public payload: any) {}
}
export class UpdateClienteSuccess implements Action {
  readonly type = UPDATE_CLIENTE_SUCCESS;
  constructor(public payload: Cliente) {}
}

// Search actions
export const SEARCH_CLIENTES = '[Cliente] Search clientes';
export const SEARCH_CLIENTES_FAIL = '[Cliente] Search  clientes Fail';
export const SEARCH_CLIENTES_SUCCESS = '[Cliente] Search  clientes Success';

export class SearchClientesAction implements Action {
  readonly type = SEARCH_CLIENTES;
  constructor(public payload: string) {}
}
export class SearchClientesActionFail implements Action {
  readonly type = SEARCH_CLIENTES_FAIL;
  constructor(public payload: any) {}
}
export class SearchClientesActionSuccess implements Action {
  readonly type = SEARCH_CLIENTES_SUCCESS;
  constructor(public payload: Cliente[]) {}
}

// Load single cliente
export const LOAD_CLIENTE = '[Cliente] Load a single cliente';

export class LoadClienteAction implements Action {
  readonly type = LOAD_CLIENTE;
  constructor(public payload: Cliente) {}
}

// Action types
export type ClientesAction =
  | LoadClientes
  | LoadClientesFail
  | LoadClientesSuccess
  | UpdateCliente
  | UpdateClienteFail
  | UpdateClienteSuccess
  | SearchClientesAction
  | SearchClientesActionFail
  | SearchClientesActionSuccess
  | LoadClienteAction;
