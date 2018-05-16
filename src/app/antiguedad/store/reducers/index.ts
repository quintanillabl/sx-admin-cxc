import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromAntguedad from './antiguedad.reducer';

export interface AntiguedadDeSaldoState {
  antiguedad: fromAntguedad.AntiguedadState;
}

export const reducers: ActionReducerMap<AntiguedadDeSaldoState> = {
  antiguedad: fromAntguedad.reducer
};

// Feature module state slace
export const getAntigueadDeSaldosState = createFeatureSelector<
  AntiguedadDeSaldoState
>('antiguedadDeSaldos');
