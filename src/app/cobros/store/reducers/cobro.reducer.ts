import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Cobro, CobroFilter, build } from '../../models/cobro';
import { CobroActions, CobroActionTypes } from '../actions/cobros.actions';

export interface State extends EntityState<Cobro> {
  loading: boolean;
  loaded: boolean;
  filter: CobroFilter;
}

export const adapter: EntityAdapter<Cobro> = createEntityAdapter<Cobro>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false,
  filter: build(200, true)
});

export function reducer(state = initialState, action: CobroActions): State {
  switch (action.type) {
    case CobroActionTypes.EnvioDeReciboBatch:
    case CobroActionTypes.EnvioDeRecibo:
    case CobroActionTypes.TimbradoBatch:
    case CobroActionTypes.SaldarRecibo:
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

    case CobroActionTypes.EnvioDeReciboBatchSuccess:
    case CobroActionTypes.EnvioDeReciboBatchFail:
    case CobroActionTypes.PrintReciboFail:
    case CobroActionTypes.PrintReciboSuccess:
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
      return adapter.removeAll({
        ...state,
        loaded: false,
        loading: false
      });
    }

    case CobroActionTypes.SetCobrosFilter: {
      return {
        ...state,
        filter: action.payload
      };
    }

    case CobroActionTypes.UpsertCobros: {
      return adapter.upsertMany(action.payload, {
        ...state,
        loading: false
      });
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
export const getCobrosFilter = (state: State) => state.filter;
