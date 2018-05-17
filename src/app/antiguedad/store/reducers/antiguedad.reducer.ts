import * as fromAntiguedad from '../actions/antiguedad.actions';

import { AntiguedadDeSaldo } from '../../models/antiguedadDeSaldo';

import * as _ from 'lodash';

export interface AntiguedadState {
  entities: { [id: string]: AntiguedadDeSaldo };
  loaded: boolean;
  loading: boolean;
  searchTerm: string;
  selected: AntiguedadDeSaldo;
  selectedFacturas: any[];
}

export const initialState: AntiguedadState = {
  entities: {},
  loaded: false,
  loading: false,
  searchTerm: null,
  selected: null,
  selectedFacturas: []
};

export function reducer(
  state = initialState,
  action: fromAntiguedad.AntiguedadActions
): AntiguedadState {
  switch (action.type) {
    case fromAntiguedad.LOAD_ANTIGUEAD_ACTION: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    case fromAntiguedad.LOAD_ANTIGUEAD_ACTION_SUCCESS: {
      const entities = _.keyBy(action.payload, 'clienteId');
      return {
        ...state,
        entities,
        loading: false,
        loaded: true
      };
    }

    case fromAntiguedad.LOAD_ANTIGUEAD_ACTION_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case fromAntiguedad.SET_SEARCHTERM_ACTION: {
      const searchTerm = action.payload;
      return {
        ...state,
        searchTerm
      };
    }

    case fromAntiguedad.SET_SELECTED_ACTION: {
      const selected = action.payload;

      return {
        ...state,
        selected
      };
    }

    case fromAntiguedad.SET_SELECTED_FACTURAS_ACTION: {
      const selectedFacturas = action.payload;

      return {
        ...state,
        selectedFacturas
      };
    }
  }
  return state;
}

export const getAntiguedadEntities = (state: AntiguedadState) => state.entities;
export const getAntiguedadLoading = (state: AntiguedadState) => state.loaded;
export const getAntiguedadLoaded = (state: AntiguedadState) => state.loaded;
export const getSearchTerm = (state: AntiguedadState) => state.searchTerm;
export const getSelected = (state: AntiguedadState) => state.selected;
export const getSelectedFacturas = (state: AntiguedadState) =>
  _.sortBy(state.selectedFacturas, 'atraso').reverse();
