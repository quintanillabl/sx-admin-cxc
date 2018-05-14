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

// Action types
export type ClientesAction =
  | LoadClientes
  | LoadClientesFail
  | LoadClientesSuccess
  | UpdateCliente
  | UpdateClienteFail
  | UpdateClienteSuccess;
