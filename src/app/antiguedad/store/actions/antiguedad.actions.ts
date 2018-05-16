import { Action } from '@ngrx/store';

import { AntiguedadDeSalgo } from '../../models/antiguedadDeSalgo';

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
  constructor(public payload: AntiguedadDeSalgo[]) {}
}

export type AntiguedadActions =
  | LoadAntiguedadAction
  | LoadAntiguedadActionFail
  | LoadAntiguedadActionSuccess;
