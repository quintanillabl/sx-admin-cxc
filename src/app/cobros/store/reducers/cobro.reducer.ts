import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Cobro } from '../../models';
import { CobroActions, CobroActionTypes } from '../actions/cobros.actions';

export interface State extends EntityState<Cobro> {
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<Cobro> = createEntityAdapter<Cobro>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false
});

export function reducer(state = initialState, action: CobroActions): State {
  switch (action.type) {
    case CobroActionTypes.PrintRecibo:
    case CobroActionTypes.GenerarRecibo:
    case CobroActionTypes.AgregarAplicaciones:
    case CobroActionTypes.DeleteCobro:
    case CobroActionTypes.AddCobro:
    case CobroActionTypes.LoadCobros: {
      return {
        ...state,
        loading: true
      };
    }

    case CobroActionTypes.DeleteCobroFail:
    case CobroActionTypes.UpdateCobroFail:
    case CobroActionTypes.AddCobroFail:
    case CobroActionTypes.LoadCobrosFail: {
      return {
        ...state,
        loading: false
      };
    }
    case CobroActionTypes.LoadCobrosSuccess: {
      return adapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });
    }

    case CobroActionTypes.AddCobroSuccess: {
      return adapter.addOne(action.payload, {
        ...state,
        loading: false
      });
    }

    case CobroActionTypes.UpdateCobroSuccess: {
      const cobro = action.payload;
      return adapter.updateOne(
        {
          id: cobro.id,
          changes: cobro
        },
        {
          ...state,
          loading: false
        }
      );
    }

    case CobroActionTypes.DeleteCobroSuccess: {
      return adapter.removeOne(action.payload.id, {
        ...state,
        loading: false
      });
    }

    case CobroActionTypes.ClearCobros: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

export const getCobrosLoading = (state: State) => state.loading;
export const getCobrosLoaded = (state: State) => state.loaded;
