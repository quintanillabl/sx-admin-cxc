import { CuentaPorCobrar } from './cuentaPorCobrar';
import { Cobro } from './cobro';

export interface AplicacionDeCobro {
  id?: string;
  cxc: Partial<CuentaPorCobrar>;
  cobro: Partial<Cobro>;
  import: number;
  fecha: string;
  formaDePago: string;
  recibo: string;
}
