import { Action } from '@ngrx/store';
import { BonificacionMC } from '../../models/bonificacionMC';

export const LOAD_BONIFICACIONES_MC = '[BonificacionMC] Load BonificacionesMC';
export const LOAD_BONIFICACIONES_MC_FAIL =
  '[BonificacionMC] Load BonificacionesMC Fail';
export const LOAD_BONIFICACIONES_MC_SUCCESS =
  '[BonificacionMC] Load BonificacionesMC Success';

export const AUTORIZAR_BONIFICACION_MC = '[BonificacionMC] Autorizar';
export const AUTORIZAR_BONIFICACION_MC_BATCH =
  '[BonificacionMC] Autorizar Batch';
export const SUSPENDER_BONIFICACION_MC = '[BonificacionMC] Suspender';

export const UPDATE_BONIFICACION_FAIL = '[BonificacionMC] Update fail';
export const UPDATE_BONIFICACION_SUCCESS = '[BonificacionMC] Update success';

export const CAMBIAR_PERIODO_BONIFICACIONES_MC =
  '[BonificacionMC] Cambiar periodo';

export const GENERAR_BONIFICACIONES_MC =
  '[BonificacionMC] Generar bonificaciones';

export class LoadBonificacionesMC implements Action {
  readonly type = LOAD_BONIFICACIONES_MC;
  constructor() {}
}

export class LoadBonificacionesMCFail implements Action {
  readonly type = LOAD_BONIFICACIONES_MC_FAIL;
  constructor(public payload: any) {}
}

export class LoadBonificacionesMCSuccess implements Action {
  readonly type = LOAD_BONIFICACIONES_MC_SUCCESS;
  constructor(public payload: BonificacionMC[]) {}
}

export class AutorizarBonificacion implements Action {
  readonly type = AUTORIZAR_BONIFICACION_MC;
  constructor(public payload: BonificacionMC) {}
}

export class AutorizarBatchBonificacion implements Action {
  readonly type = AUTORIZAR_BONIFICACION_MC_BATCH;
  constructor() {}
}

export class SuspenderBonificacion implements Action {
  readonly type = SUSPENDER_BONIFICACION_MC;
  constructor(public payload: BonificacionMC) {}
}

export class UpdateBonificacionFail implements Action {
  readonly type = UPDATE_BONIFICACION_FAIL;
  constructor(public payload: any) {}
}

export class UpdateBonificacionSuccess implements Action {
  readonly type = UPDATE_BONIFICACION_SUCCESS;
  constructor(public payload: BonificacionMC) {}
}

export class CambiarPeriodoBonificaciones implements Action {
  readonly type = CAMBIAR_PERIODO_BONIFICACIONES_MC;
  constructor(public payload: { ejercicio: number; mes: number }) {}
}

export class GenerarBonificacion implements Action {
  readonly type = GENERAR_BONIFICACIONES_MC;
  constructor() {}
}

export type BonificacionesMCActions =
  | LoadBonificacionesMC
  | LoadBonificacionesMCFail
  | LoadBonificacionesMCSuccess
  | AutorizarBonificacion
  | AutorizarBatchBonificacion
  | SuspenderBonificacion
  | UpdateBonificacionFail
  | UpdateBonificacionSuccess
  | CambiarPeriodoBonificaciones
  | GenerarBonificacion;
