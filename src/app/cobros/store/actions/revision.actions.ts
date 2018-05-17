import { Action } from '@ngrx/store';

import { CuentaPorCobrar } from '../../models/cuentaPorCobrar';

export const LOAD_REVISION_ACTION = '[RevisionCXC] Load revision action';
export const LOAD_REVISION_ACTION_FAIL =
  '[RevisionCXC] Load revision action Fail';
export const LOAD_REVISION_ACTION_SUCCESS =
  '[RevisionCXC] Load revision action Success';

export class LoadRevisionAction implements Action {
  readonly type = LOAD_REVISION_ACTION;
}

export class LoadRevisionActionFail implements Action {
  readonly type = LOAD_REVISION_ACTION_FAIL;
  constructor(public payload: any) {}
}
export class LoadRevisionActionSuccess implements Action {
  readonly type = LOAD_REVISION_ACTION_SUCCESS;
  constructor(public payload: CuentaPorCobrar[]) {}
}

export type RevisionActions =
  | LoadRevisionAction
  | LoadRevisionActionFail
  | LoadRevisionActionSuccess;
