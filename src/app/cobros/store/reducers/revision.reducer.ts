import * as fromRevision from '../actions/revision.actions';

import * as _ from 'lodash';

import { VentaCredito } from '../../models/ventaCredito';

export interface RevisionState {
  entities: { [id: string]: VentaCredito };
  loading: boolean;
  loaded: boolean;
}

export const initalState: RevisionState = {
  entities: {},
  loaded: false,
  loading: false
};

export function reducer(
  state = initalState,
  action: fromRevision.RevisionActions
): RevisionState {
  switch (action.type) {
    case fromRevision.LOAD_REVISION_ACTION: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromRevision.LOAD_REVISION_ACTION_SUCCESS: {
      console.log('Ventas credito obtenidas: ', action.payload.length);
      const entities = _.keyBy(action.payload, 'id');
      return {
        ...state,
        entities,
        loading: false,
        loaded: true
      };
    }

    case fromRevision.LOAD_REVISION_ACTION_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false
      };
    }

    case fromRevision.UPDATE_REVISION_ACTION_SUCCESS: {
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
  }
  return state;
}

export const getRevisionEntities = (state: RevisionState) => state.entities;
export const getRevisionLoading = (state: RevisionState) => state.loading;
export const getRevisionLoaded = (state: RevisionState) => state.loaded;
