import { Action } from '@ngrx/store';
import { ChequeDevuelto } from '../../models/chequeDevuelto';

export const LOAD_CHEQUES_ACTION = '[Cheques devueltos] Load cheques';
export const LOAD_CHEQUES_ACTION_FAIL = '[Cheques devueltos] Load cheques fail';
export const LOAD_CHEQUES_ACTION_SUCCESS =
  '[Cheques devueltos] Load cheques Success';

export class LoadChequesAction implements Action {
  readonly type = LOAD_CHEQUES_ACTION;
}

export class LoadChequesActionFail implements Action {
  readonly type = LOAD_CHEQUES_ACTION_FAIL;
  constructor(public payload: any) {}
}
export class LoadChequesActionSuccess implements Action {
  readonly type = LOAD_CHEQUES_ACTION_SUCCESS;
  constructor(public payload: ChequeDevuelto[]) {}
}

export type ChequesActions =
  | LoadChequesAction
  | LoadChequesActionFail
  | LoadChequesActionSuccess;
