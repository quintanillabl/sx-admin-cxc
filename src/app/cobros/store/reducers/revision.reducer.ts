import * as fromRevision from '../actions/revision.actions';

import { CuentaPorCobrar } from '../../models/cuentaPorCobrar';

import * as _ from 'lodash';

export interface RevisionState {
  entities: { [id: string]: CuentaPorCobrar };
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
  }
  return state;
}

export const getRevisionEntities = (state: RevisionState) => state.entities;
export const getRevisionLoading = (state: RevisionState) => state.loading;
export const getRevisionLoaded = (state: RevisionState) => state.loaded;
