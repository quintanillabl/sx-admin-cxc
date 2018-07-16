import { Action } from '@ngrx/store';
import { BonificacionMC } from '../../models/bonificacionMC';

export const LOAD_BONIFICACIONES_MC = '[BonificacionMC] Load BonificacionesMC';
export const LOAD_BONIFICACIONES_MC_FAIL =
  '[BonificacionMC] Load BonificacionesMC Fail';
export const LOAD_BONIFICACIONES_MC_SUCCESS =
  '[BonificacionMC] Load BonificacionesMC Success';

export class LoadBonificacionesMC implements Action {
  readonly type = LOAD_BONIFICACIONES_MC;
  constructor(public payload: { ejercicio: number; mes: number }) {}
}

export class LoadBonificacionesMCFail implements Action {
  readonly type = LOAD_BONIFICACIONES_MC_FAIL;
  constructor(public payload: any) {}
}

export class LoadBonificacionesMCSuccess implements Action {
  readonly type = LOAD_BONIFICACIONES_MC_SUCCESS;
  constructor(public payload: BonificacionMC[]) {}
}

export type BonificacionesMCActions =
  | LoadBonificacionesMC
  | LoadBonificacionesMCFail
  | LoadBonificacionesMCSuccess;
