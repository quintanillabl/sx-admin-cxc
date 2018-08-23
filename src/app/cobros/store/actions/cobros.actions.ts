import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Cobro, CobroFilter } from '../../models/cobro';
import { Cartera } from '../../models/cartera';
import { CuentaPorCobrar } from '../../models';

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
  UpdateCobro = '[Cobro] Update Cobro',
  UpdateCobroFail = '[Cobro] Update Cobro Fail',
  UpdateCobroSuccess = '[Cobro] Update Cobro Success',
  DeleteCobro = '[Cobro] Delete Cobro',
  DeleteCobroFail = '[Cobro] Delete Cobro Fail',
  DeleteCobroSuccess = '[Cobro] Delete Cobro Success',
  ClearCobros = '[Cobro] Clear Cobros',
  AgregarAplicaciones = '[Cobro] Aplicar Cobros',
  GenerarRecibo = '[Cobro] Generar recibo electronico',
  SaldarRecibo = '[Cobro] Saldar recibo electronico',
  PrintRecibo = '[Cobro] Print recibo electronico',
  SetCobrosFilter = '[Cobro] Set Cobro filter',
  SearchCobros = '[Cobro] Search Cobro filter'
}

export class LoadCobros implements Action {
  readonly type = CobroActionTypes.LoadCobros;
  constructor(public payload: Cartera) {}
}
export class LoadCobrosFail implements Action {
  readonly type = CobroActionTypes.LoadCobrosFail;
  constructor(public payload: any) {}
}
export class LoadCobrosSuccess implements Action {
  readonly type = CobroActionTypes.LoadCobrosSuccess;
  constructor(public payload: Cobro[]) {}
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
      fecha: Date;
    }
  ) {}
}

export class GenerarRecibo implements Action {
  readonly type = CobroActionTypes.GenerarRecibo;
  constructor(public payload: Cobro) {}
}

export class PrintRecibo implements Action {
  readonly type = CobroActionTypes.PrintRecibo;
  constructor(public payload: Cobro) {}
}

export class SaldarRecibo implements Action {
  readonly type = CobroActionTypes.SaldarRecibo;
  constructor(public payload: Cobro) {}
}

export class SetCobrosFilter implements Action {
  readonly type = CobroActionTypes.SetCobrosFilter;
  constructor(public payload: CobroFilter) {}
}

export class SearchCobros implements Action {
  readonly type = CobroActionTypes.SearchCobros;
  constructor(public payload: CobroFilter) {}
}

export type CobroActions =
  | LoadCobros
  | LoadCobrosFail
  | LoadCobrosSuccess
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
  | GenerarRecibo
  | PrintRecibo
  | SaldarRecibo
  | SetCobrosFilter;
