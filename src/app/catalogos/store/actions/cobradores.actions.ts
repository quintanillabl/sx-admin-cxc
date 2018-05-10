import { Action } from '@ngrx/store';

import { Cobrador } from '../../models/cobrador';

export const LOAD_COBRADORES = '[Catalogos] Load Cobradores';
export const LOAD_COBRADORES_FAIL = '[Catalogos] Load Cobradores Fail';
export const LOAD_COBRADORES_SUCCESS = '[Catalogos] Load Cobradores Success';

export class LoadCobradores implements Action {
  readonly type = LOAD_COBRADORES;
}

export class LoadCobradoresFail implements Action {
  readonly type = LOAD_COBRADORES_FAIL;
  constructor(public payload: any) {}
}

export class LoadCobradoresSuccess implements Action {
  readonly type = LOAD_COBRADORES_SUCCESS;
  constructor(public payload: Cobrador[]) {}
}

// Create actions
export const CREATE_COBRADOR = '[Catalogos] Create cobrador';
export const CREATE_COBRADOR_FAIL = '[Catalogos] Create cobrador Fail';
export const CREATE_COBRADOR_SUCCESS = '[Catalogos] Create cobrador Success';

export class CreateCobrador implements Action {
  readonly type = CREATE_COBRADOR;
  constructor(public payload: Cobrador) {}
}

export class CreateCobradorFail implements Action {
  readonly type = CREATE_COBRADOR_FAIL;
  constructor(public payload: any) {}
}

export class CreateCobradorSuccess implements Action {
  readonly type = CREATE_COBRADOR_SUCCESS;
  constructor(public payload: Cobrador) {}
}

// Create actions
export const UPDATE_COBRADOR = '[Catalogos] Update cobrador';
export const UPDATE_COBRADOR_FAIL = '[Catalogos] Update cobrador Fail';
export const UPDATE_COBRADOR_SUCCESS = '[Catalogos] Update cobrador Success';

export class UpdateCobrador implements Action {
  readonly type = UPDATE_COBRADOR;
  constructor(public payload: Cobrador) {}
}

export class UpdateCobradorFail implements Action {
  readonly type = UPDATE_COBRADOR_FAIL;
  constructor(public payload: any) {}
}

export class UpdateCobradorSuccess implements Action {
  readonly type = UPDATE_COBRADOR_SUCCESS;
  constructor(public payload: Cobrador) {}
}

// Delete actions
// Create actions
export const REMOVE_COBRADOR = '[Catalogos] Remove cobrador';
export const REMOVE_COBRADOR_FAIL = '[Catalogos] Remove cobrador Fail';
export const REMOVE_COBRADOR_SUCCESS = '[Catalogos] Remove cobrador Success';

export class RemoveCobrador implements Action {
  readonly type = REMOVE_COBRADOR;
  constructor(public payload: Cobrador) {}
}

export class RemoveCobradorFail implements Action {
  readonly type = REMOVE_COBRADOR_FAIL;
  constructor(public payload: any) {}
}

export class RemoveCobradorSuccess implements Action {
  readonly type = REMOVE_COBRADOR_SUCCESS;
  constructor(public payload: Cobrador) {}
}

export type CobradoresActions =
  | LoadCobradores
  | LoadCobradoresFail
  | LoadCobradoresSuccess
  | CreateCobrador
  | CreateCobradorFail
  | CreateCobradorSuccess
  | UpdateCobrador
  | UpdateCobradorFail
  | UpdateCobradorSuccess
  | RemoveCobrador
  | RemoveCobradorFail
  | RemoveCobradorSuccess;
