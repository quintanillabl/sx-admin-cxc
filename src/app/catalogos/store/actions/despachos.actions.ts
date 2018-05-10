import { Action } from '@ngrx/store';

import { Despacho } from '../../models/despacho';

export const LOAD_DESPACHOS = '[Catalogos] Load Despachos';
export const LOAD_DESPACHOS_FAIL = '[Catalogos] Load Despachos Fail';
export const LOAD_DESPACHOS_SUCCESS = '[Catalogos] Load Despachos Success';

export class LoadDespachos implements Action {
  readonly type = LOAD_DESPACHOS;
}

export class LoadDespachosFail implements Action {
  readonly type = LOAD_DESPACHOS_FAIL;
  constructor(public payload: any) {}
}

export class LoadDespachosSuccess implements Action {
  readonly type = LOAD_DESPACHOS_SUCCESS;
  constructor(public payload: Despacho[]) {}
}

// Create actions
export const CREATE_DESPACHO = '[Catalogos] Create despacho';
export const CREATE_DESPACHO_FAIL = '[Catalogos] Create despacho Fail';
export const CREATE_DESPACHO_SUCCESS = '[Catalogos] Create despacho Success';

export class CreateDespacho implements Action {
  readonly type = CREATE_DESPACHO;
  constructor(public payload: Despacho) {}
}

export class CreateDespachoFail implements Action {
  readonly type = CREATE_DESPACHO_FAIL;
  constructor(public payload: any) {}
}

export class CreateDespachoSuccess implements Action {
  readonly type = CREATE_DESPACHO_SUCCESS;
  constructor(public payload: Despacho) {}
}

// Update actions
export const UPDATE_DESPACHO = '[Catalogos] Update despacho';
export const UPDATE_DESPACHO_FAIL = '[Catalogos] Update despacho Fail';
export const UPDATE_DESPACHO_SUCCESS = '[Catalogos] Update despacho Success';

export class UpdateDespacho implements Action {
  readonly type = UPDATE_DESPACHO;
  constructor(public payload: Despacho) {}
}

export class UpdateDespachoFail implements Action {
  readonly type = UPDATE_DESPACHO_FAIL;
  constructor(public payload: any) {}
}

export class UpdateDespachoSuccess implements Action {
  readonly type = UPDATE_DESPACHO_SUCCESS;
  constructor(public payload: Despacho) {}
}

// Delete actions
export const REMOVE_DESPACHO = '[Catalogos] Remove despacho';
export const REMOVE_DESPACHO_FAIL = '[Catalogos] Remove despacho Fail';
export const REMOVE_DESPACHO_SUCCESS = '[Catalogos] Remove despacho Success';

export class RemoveDespacho implements Action {
  readonly type = REMOVE_DESPACHO;
  constructor(public payload: Despacho) {}
}

export class RemoveDespachoFail implements Action {
  readonly type = REMOVE_DESPACHO_FAIL;
  constructor(public payload: any) {}
}

export class RemoveDespachoSuccess implements Action {
  readonly type = REMOVE_DESPACHO_SUCCESS;
  constructor(public payload: Despacho) {}
}

export type DespachosActions =
  | LoadDespachos
  | LoadDespachosFail
  | LoadDespachosSuccess
  | CreateDespacho
  | CreateDespachoFail
  | CreateDespachoSuccess
  | UpdateDespacho
  | UpdateDespachoFail
  | UpdateDespachoSuccess
  | RemoveDespacho
  | RemoveDespachoFail
  | RemoveDespachoSuccess;
