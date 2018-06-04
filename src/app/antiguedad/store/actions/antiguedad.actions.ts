import { Action } from '@ngrx/store';

import { AntiguedadDeSaldo } from '../../models/antiguedadDeSaldo';

export const LOAD_ANTIGUEAD_ACTION = '[Antiguedad] Load antigueadad';
export const LOAD_ANTIGUEAD_ACTION_FAIL = '[Antiguedad] Load antiguedad Fail';
export const LOAD_ANTIGUEAD_ACTION_SUCCESS =
  '[Antiguedad] Load antiguedad Success';

export class LoadAntiguedadAction implements Action {
  readonly type = LOAD_ANTIGUEAD_ACTION;
}
export class LoadAntiguedadActionFail implements Action {
  readonly type = LOAD_ANTIGUEAD_ACTION_FAIL;
  constructor(public payload: any) {}
}
export class LoadAntiguedadActionSuccess implements Action {
  readonly type = LOAD_ANTIGUEAD_ACTION_SUCCESS;
  constructor(public payload: AntiguedadDeSaldo[]) {}
}

// Filtering actions
export const SET_SEARCHTERM_ACTION = '[Antiguedad] Set searchterm ';
export const SET_SELECTED_ACTION = '[Antiguedad] Set selected ';

export const SET_SELECTED_FACTURAS_ACTION = '[Antiguedad] Set factras';
export const SET_SELECTED_FACTURAS_ACTION_FAIL =
  '[Antiguedad] Set factras Fail';

export class SetSearchTermAction implements Action {
  readonly type = SET_SEARCHTERM_ACTION;
  constructor(public payload: string) {}
}
export class SetSelectedAction implements Action {
  readonly type = SET_SELECTED_ACTION;
  constructor(public payload: AntiguedadDeSaldo) {}
}

export class SetSelectedFacturasAction implements Action {
  readonly type = SET_SELECTED_FACTURAS_ACTION;
  constructor(public payload: any[]) {}
}

export class SetSelectedFacturasActionFail implements Action {
  readonly type = SET_SELECTED_FACTURAS_ACTION_FAIL;
  constructor(public payload: any) {}
}

// Print actions
export const PRINT_ANTIGUEDAD_ACTION = '[Antiguedad] Print antiguedad action';
export const PRINT_CARTERA_COD = '[Antiguedad] Print cartera cod';
export const PRINT_ANTIGUEDAD_POR_CLIENTE_ACTION =
  '[Antiguedad] Print antiguedad por cliente action';
export const PRINT_CLIENTES_SUSPENEIDOS_ACTION =
  '[Antiguedad] Clientes suspendidos';

export const PRINT_FACTURAS_CON_DEVOLUCION_ACTION =
  '[Antiguedad] Facturas con nota de devolucion action';
export const PRINT_EXCEPCIONES_DESCUENTOS_ACTION =
  '[Antiguedad] Excepciones en descuentos action';

export class PrintAntiguedadAction implements Action {
  readonly type = PRINT_ANTIGUEDAD_ACTION;
  constructor(public payload: any) {}
}
export class PrintCarteraCodAction implements Action {
  readonly type = PRINT_CARTERA_COD;
  constructor(public payload: any) {}
}
export class PrintAntiguedadPorClienteAction implements Action {
  readonly type = PRINT_ANTIGUEDAD_POR_CLIENTE_ACTION;
  constructor(public payload: any) {}
}

export class PrintClientesSuspendidosAction implements Action {
  readonly type = PRINT_CLIENTES_SUSPENEIDOS_ACTION;
}

export class PrintFacturasConDevolucionAction implements Action {
  readonly type = PRINT_FACTURAS_CON_DEVOLUCION_ACTION;
  constructor(public payload: any) {}
}

export class PrintExceptionesDescuentosAction implements Action {
  readonly type = PRINT_EXCEPCIONES_DESCUENTOS_ACTION;
  constructor(public payload: any) {}
}

export type AntiguedadActions =
  | LoadAntiguedadAction
  | LoadAntiguedadActionFail
  | LoadAntiguedadActionSuccess
  | SetSearchTermAction
  | SetSelectedAction
  | SetSelectedFacturasAction
  | SetSelectedFacturasActionFail
  | PrintAntiguedadAction
  | PrintCarteraCodAction
  | PrintAntiguedadPorClienteAction
  | PrintClientesSuspendidosAction
  | PrintFacturasConDevolucionAction
  | PrintExceptionesDescuentosAction;
