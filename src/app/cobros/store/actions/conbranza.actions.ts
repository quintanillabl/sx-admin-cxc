import { Action } from '@ngrx/store';
import { Cartera } from '../../models/cartera';

export enum CobranzaActionTypes {
  SetCartera = '[CXC Cobranza] Set cartera'
}

export class SetCartera implements Action {
  readonly type = CobranzaActionTypes.SetCartera;
  constructor(public payload: { cartera: Cartera }) {}
}

export type CobranzaActions = SetCartera;
