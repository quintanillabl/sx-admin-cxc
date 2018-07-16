import * as fromBonificaciones from '../actions/bonificacionMC.actions';

import * as _ from 'lodash';

import { BonificacionMC } from '../../models/bonificacionMC';

export interface BonificacionesMCState {
  entities: { [id: string]: BonificacionMC };
  loading: boolean;
}

export const initalState: BonificacionesMCState = {
  entities: {},
  loading: false
};

export function reducer(
  state = initalState,
  action: fromBonificaciones.BonificacionesMCActions
): BonificacionesMCState {
  switch (action.type) {
    case fromBonificaciones.LOAD_BONIFICACIONES_MC: {
      return {
        ...state,
        loading: true
      };
    }

    case fromBonificaciones.LOAD_BONIFICACIONES_MC_FAIL: {
      return {
        ...state,
        loading: false
      };
    }

    case fromBonificaciones.LOAD_BONIFICACIONES_MC_SUCCESS: {
      const entities = _.keyBy(action.payload, 'id');
      return {
        ...state,
        entities,
        loading: false
      };
    }
    /*
    case fromBonificaciones.UPDATE_REVISION_ACTION_SUCCESS: {
      const cxc = action.payload;
      const entities = { ...state.entities, [cxc.id]: cxc };
      return {
        ...state,
        entities
      };
    }

    case fromRevision.BATCH_UPDATE_ACTION_SUCCESS: {
      const updatedEntities = _.keyBy(action.payload, 'id');
      const entities = { ...state.entities, ...updatedEntities };
      return {
        ...state,
        entities
      };
    }
    */
  }
  return state;
}

export const getBonificacionesMCEntities = (state: BonificacionesMCState) =>
  state.entities;
export const getBonificacionesMCLoading = (state: BonificacionesMCState) =>
  state.loading;
