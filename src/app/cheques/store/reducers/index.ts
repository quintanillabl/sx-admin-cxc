import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromCheques from './cheque.reducer';

export interface CobranzaChequesDevueltosState {
  cheques: fromCheques.ChequeState;
}

export const reducers: ActionReducerMap<CobranzaChequesDevueltosState> = {
  cheques: fromCheques.reducer
};

export const getCobranzaChequesDevueltosState = createFeatureSelector<
  CobranzaChequesDevueltosState
>('cobranza_che');
