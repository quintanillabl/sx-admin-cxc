import { Action } from '@ngrx/store';

import { Operador } from '../../models/operador';

export const LOAD_OPERADORES = '[Catalogos] Load Operadores';
export const LOAD_OPERADORES_FAIL = '[Catalogos] Load Operadores Fail';
export const LOAD_OPERADORES_SUCCESS = '[Catalogos] Load Operadores Success';

export class LoadOperadores implements Action {
  readonly type = LOAD_OPERADORES;
}

export class LoadOperadoresFail implements Action {
  readonly type = LOAD_OPERADORES_FAIL;
  constructor(public payload: any) {}
}

export class LoadOperadoresSuccess implements Action {
  readonly type = LOAD_OPERADORES_SUCCESS;
  constructor(public payload: Operador[]) {}
}

export type OperadoresActions =
  | LoadOperadores
  | LoadOperadoresFail
  | LoadOperadoresSuccess;
