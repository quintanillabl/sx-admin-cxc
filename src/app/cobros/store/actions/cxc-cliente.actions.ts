import { Action } from '@ngrx/store';

import { CuentaPorCobrar } from '../../models/cuentaPorCobrar';
import { Cliente } from 'app/clientes/models';

export enum CuentasPorClienteActionTypes {
  SetCurrentCliente = '[CxC] Load CuentuentasPorCliente Set current cliente',
  LoadCuentasPorCliente = '[CxC] Load CuentuentasPorCliente',
  LoadCuentasPorClienteFail = '[CxC] Load CuentuentasPorCliente fail',
  LoadCuentasPorClienteSuccess = '[CxC] Load CuentuentasPorCliente Success'
}

export class SetCurrentCliente implements Action {
  readonly type = CuentasPorClienteActionTypes.SetCurrentCliente;
  constructor(public payload: Partial<Cliente>) {}
}

export class LoadCuentasPorCliente implements Action {
  readonly type = CuentasPorClienteActionTypes.LoadCuentasPorCliente;
  constructor(public payload: any) {}
}
export class LoadCuentasPorClienteFail implements Action {
  readonly type = CuentasPorClienteActionTypes.LoadCuentasPorClienteFail;
  constructor(public payload: any) {}
}
export class LoadCuentasPorClienteSuccess implements Action {
  readonly type = CuentasPorClienteActionTypes.LoadCuentasPorClienteSuccess;
  constructor(public payload: CuentaPorCobrar[]) {}
}

export type CuentasPorClienteActions =
  | SetCurrentCliente
  | LoadCuentasPorCliente
  | LoadCuentasPorClienteFail
  | LoadCuentasPorClienteSuccess;
