import { ActionReducerMap } from '@ngrx/store';

import * as _ from 'lodash';

import * as fromCheques from '../actions/cheques.actions';

import { ChequeDevuelto } from '../../models/chequeDevuelto';

export interface ChequeState {
  entities: { [id: string]: ChequeDevuelto };
  loaded: boolean;
  loading: boolean;
}

export const initialState: ChequeState = {
  entities: {},
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromCheques.ChequesActions
): ChequeState {
  switch (action.type) {
    case fromCheques.LOAD_CHEQUES_ACTION: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    case fromCheques.LOAD_CHEQUES_ACTION_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
    case fromCheques.LOAD_CHEQUES_ACTION_SUCCESS: {
      const entities = _.keyBy(action.payload, 'id');
      return {
        ...state,
        entities,
        loaded: true,
        loading: false
      };
    }
  }
  return state;
}

export const getChequeEntities = (state: ChequeState) => state.entities;
export const getChequeLoaded = (state: ChequeState) => state.loaded;
export const getChequeLoading = (state: ChequeState) => state.loading;
