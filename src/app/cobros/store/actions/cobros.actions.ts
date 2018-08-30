import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Cobro, CobroFilter } from '../../models/cobro';
import { CuentaPorCobrar, AplicacionDeCobro } from '../../models';

export enum CobroActionTypes {
  GetCobro = '[Cobro] GetCobro One Cobro',
  GetCobroFail = '[Cobro] GetCobro One Cobro fail',
  GetCobroSuccess = '[Cobro] GetCobro One Cobro Success',
  LoadCobros = '[Cobro] Load Cobros',
  LoadCobrosFail = '[Cobro] Load Cobros fail',
  LoadCobrosSuccess = '[Cobro] Load Cobros Success',
  AddCobro = '[Cobro] Add Cobro',
  AddCobroFail = '[Cobro] Add Cobro Fail',
  AddCobroSuccess = '[Cobro] Add Cobro Success',
  UpsertCobros = '[Cobro] Upsert many Cobros',
  UpdateCobro = '[Cobro] Update Cobro',
  UpdateCobroFail = '[Cobro] Update Cobro Fail',
  UpdateCobroSuccess = '[Cobro] Update Cobro Success',
  DeleteCobro = '[Cobro] Delete Cobro',
  DeleteCobroFail = '[Cobro] Delete Cobro Fail',
  DeleteCobroSuccess = '[Cobro] Delete Cobro Success',
  ClearCobros = '[Cobro] Clear Cobros',
  AgregarAplicaciones = '[Cobro] Aplicar Cobros',
  EliminarAplicacion = '[Cobro] Eliminar aplicacion de Cobros',
  GenerarRecibo = '[Cobro] Generar recibo electronico',
  TimbradoBatch = '[Cobro] Timbrado batch de recibos electronicos',
  EnvioDeReciboBatch = '[Cobro] Envio batch de recibos electronicos',
  EnvioDeReciboBatchFail = '[Cobro] Envio batch de recibos electronicos fail',
  EnvioDeReciboBatchSuccess = '[Cobro] Envio batch de recibos electronicos success',
  EnvioDeRecibo = '[Cobro] Envio  de recibos electronicos',
  SaldarRecibo = '[Cobro] Saldar recibo electronico',
  PrintRecibo = '[Cobro] Print recibo electronico',
  PrintReciboFail = '[Cobro] Print recibo electronico Fail',
  PrintReciboSuccess = '[Cobro] Print recibo electronico Success',
  SetCobrosFilter = '[Cobro] Set Cobro filter'
}

export class LoadCobros implements Action {
  readonly type = CobroActionTypes.LoadCobros;
}
export class LoadCobrosFail implements Action {
  readonly type = CobroActionTypes.LoadCobrosFail;
  constructor(public payload: any) {}
}
export class LoadCobrosSuccess implements Action {
  readonly type = CobroActionTypes.LoadCobrosSuccess;
  constructor(public payload: Cobro[]) {}
}

export class GetCobro implements Action {
  readonly type = CobroActionTypes.GetCobro;
  constructor(public payload: { cobroId: string }) {}
}
export class GetCobroFail implements Action {
  readonly type = CobroActionTypes.GetCobroFail;
  constructor(public payload: any) {}
}
export class GetCobroSuccess implements Action {
  readonly type = CobroActionTypes.GetCobroSuccess;
  constructor(public payload: { cobro: Cobro }) {}
}

export class AddCobro implements Action {
  readonly type = CobroActionTypes.AddCobro;
  constructor(public payload: Cobro) {}
}
export class AddCobroFail implements Action {
  readonly type = CobroActionTypes.AddCobroFail;
  constructor(public payload: any) {}
}
export class AddCobroSuccess implements Action {
  readonly type = CobroActionTypes.AddCobroSuccess;
  constructor(public payload: Cobro) {}
}

export class UpsertCobros implements Action {
  readonly type = CobroActionTypes.UpsertCobros;

  constructor(public payload: Cobro[]) {}
}

export class UpdateCobro implements Action {
  readonly type = CobroActionTypes.UpdateCobro;
  constructor(public payload: Cobro) {}
}
export class UpdateCobroFail implements Action {
  readonly type = CobroActionTypes.UpdateCobroFail;

  constructor(public payload: any) {}
}
export class UpdateCobroSuccess implements Action {
  readonly type = CobroActionTypes.UpdateCobroSuccess;
  constructor(public payload: Cobro) {}
}

export class DeleteCobro implements Action {
  readonly type = CobroActionTypes.DeleteCobro;
  constructor(public payload: Cobro) {}
}
export class DeleteCobroFail implements Action {
  readonly type = CobroActionTypes.DeleteCobroFail;
  constructor(public payload: any) {}
}
export class DeleteCobroSuccess implements Action {
  readonly type = CobroActionTypes.DeleteCobroSuccess;
  constructor(public payload: Cobro) {}
}

export class ClearCobros implements Action {
  readonly type = CobroActionTypes.ClearCobros;
}

export class AgregarAplicaciones implements Action {
  readonly type = CobroActionTypes.AgregarAplicaciones;
  constructor(
    public payload: {
      cobro: Cobro;
      cuentas: CuentaPorCobrar[];
    }
  ) {}
}
export class EliminarAplicacion implements Action {
  readonly type = CobroActionTypes.EliminarAplicacion;
  constructor(
    public payload: {
      cobro: Cobro;
      aplicacion: AplicacionDeCobro;
    }
  ) {}
}

export class GenerarRecibo implements Action {
  readonly type = CobroActionTypes.GenerarRecibo;
  constructor(public payload: Cobro) {}
}

export class TimbradoBatch implements Action {
  readonly type = CobroActionTypes.TimbradoBatch;
  constructor(public payload: { cobros: Cobro[] }) {}
}

export class PrintRecibo implements Action {
  readonly type = CobroActionTypes.PrintRecibo;
  constructor(public payload: Cobro) {}
}
export class PrintReciboFail implements Action {
  readonly type = CobroActionTypes.PrintReciboFail;
  constructor(public payload: any) {}
}
export class PrintReciboSuccess implements Action {
  readonly type = CobroActionTypes.PrintReciboSuccess;
  constructor(public payload: any) {}
}

export class SaldarRecibo implements Action {
  readonly type = CobroActionTypes.SaldarRecibo;
  constructor(public payload: Cobro) {}
}

export class SetCobrosFilter implements Action {
  readonly type = CobroActionTypes.SetCobrosFilter;
  constructor(public payload: CobroFilter) {}
}

export class EnvioDeReciboBatch implements Action {
  readonly type = CobroActionTypes.EnvioDeReciboBatch;
  constructor(public payload: { cobros: Cobro[]; target?: string }) {}
}
export class EnvioDeReciboBatchFail implements Action {
  readonly type = CobroActionTypes.EnvioDeReciboBatchFail;
  constructor(public payload: any) {}
}
export class EnvioDeReciboBatchSuccess implements Action {
  readonly type = CobroActionTypes.EnvioDeReciboBatchSuccess;
  constructor(public payload: any[]) {}
}

export class EnvioDeRecibo implements Action {
  readonly type = CobroActionTypes.EnvioDeRecibo;
  constructor(public payload: { cobro: Cobro; target?: string }) {}
}

export type CobroActions =
  | LoadCobros
  | LoadCobrosFail
  | LoadCobrosSuccess
  | GetCobro
  | GetCobroFail
  | GetCobroSuccess
  | UpsertCobros
  | AddCobro
  | AddCobroFail
  | AddCobroSuccess
  | UpdateCobro
  | UpdateCobroFail
  | UpdateCobroSuccess
  | DeleteCobro
  | DeleteCobroFail
  | DeleteCobroSuccess
  | ClearCobros
  | AgregarAplicaciones
  | EliminarAplicacion
  | GenerarRecibo
  | TimbradoBatch
  | PrintRecibo
  | PrintReciboFail
  | PrintReciboSuccess
  | SaldarRecibo
  | SetCobrosFilter
  | EnvioDeRecibo
  | EnvioDeReciboBatch
  | EnvioDeReciboBatchFail
  | EnvioDeReciboBatchSuccess;
