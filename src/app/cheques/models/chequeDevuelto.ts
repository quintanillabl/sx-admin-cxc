import { CuentaPorCobrar } from 'app/cobros/models/cuentaPorCobrar';

export interface ChequeDevuelto {
  id?: string;
  folio?: number;
  nombre?: string;
  cheque: Object;
  cxc: CuentaPorCobrar;
  comentario?: string;
}
