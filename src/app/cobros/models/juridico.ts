import { CuentaPorCobrar } from './cuentaPorCobrar';

export interface Juridico {
  id: string;
  nombre: string;
  cxc: CuentaPorCobrar;
  importe: number;
  saldo: number;
  comentario: string;
  despacho: string;
  abogado: string;
  traspaso: string;
  asignacion: string;
  dateCreated: string;
  lastUpdated: string;
  createUser: string;
  updateUser: string;
}
