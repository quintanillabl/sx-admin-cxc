import {
  CobranzaActions,
  CobranzaActionTypes
} from '../actions/conbranza.actions';

import { Cartera } from '../../models/cartera';

export interface State {
  loading: boolean;
  loaded: boolean;
  cartera: Cartera;
}

export const initialState: State = {
  loading: false,
  loaded: false,
  cartera: undefined
};

export function reducer(state = initialState, action: CobranzaActions): State {
  switch (action.type) {
    case CobranzaActionTypes.SetCartera: {
      const cartera = action.payload.cartera;
      return {
        ...state,
        cartera
      };
    }
    default: {
      return state;
    }
  }
}

export const getCartera = (state: State) => state.cartera;
export const getCobranzaLoading = (state: State) => state.loading;
export const getCobranzaLoaded = (state: State) => state.loaded;
