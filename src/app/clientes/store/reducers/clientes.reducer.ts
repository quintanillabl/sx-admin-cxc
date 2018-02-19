import { Cliente } from '../../models';

export interface ClientesState {
  data: Cliente[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: ClientesState = {
  data: [],
  loaded: false,
  loading: false
}

export function reducer (
  state = initialState,
  action: any
) {
  return state;
}



