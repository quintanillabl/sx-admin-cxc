import * as fromBonificaciones from '../actions/bonificacionMC.actions';

import * as _ from 'lodash';

import { BonificacionMC } from '../../models/bonificacionMC';
import { Ejercicio } from 'app/_core/models/ejercicio';

export interface BonificacionesMCState {
  entities: { [id: string]: BonificacionMC };
  loading: boolean;
  loaded: boolean;
  periodo: Ejercicio;
}

export const initalState: BonificacionesMCState = {
  entities: {},
  loading: false,
  loaded: false,
  periodo: Ejercicio.getAnterior(1)
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

    case fromBonificaciones.UPDATE_BONIFICACION_FAIL:
    case fromBonificaciones.LOAD_BONIFICACIONES_MC_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case fromBonificaciones.LOAD_BONIFICACIONES_MC_SUCCESS: {
      const entities = _.keyBy(action.payload, 'id');
      return {
        ...state,
        entities,
        loading: false,
        loaded: true
      };
    }

    case fromBonificaciones.CAMBIAR_PERIODO_BONIFICACIONES_MC: {
      const periodo = action.payload;
      return {
        ...state,
        periodo
      };
    }

    case fromBonificaciones.GENERAR_BONIFICACIONES_MC:
    case fromBonificaciones.AUTORIZAR_BONIFICACION_MC_BATCH:
    case fromBonificaciones.SUSPENDER_BONIFICACION_MC: {
      return {
        ...state,
        loading: true
      };
    }

    case fromBonificaciones.UPDATE_BONIFICACION_SUCCESS: {
      const bonificacion = action.payload;
      const entities = { ...state.entities, [bonificacion.id]: bonificacion };
      return {
        ...state,
        loading: false,
        entities
      };
    }

    /*
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
export const getBonificacionesMCLoaded = (state: BonificacionesMCState) =>
  state.loaded;

export const getPeriodoDeBonificaciones = (state: BonificacionesMCState) =>
  state.periodo;
