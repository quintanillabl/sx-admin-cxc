export interface Cobrador {
  id?: string;
  clave: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  nombres: string;
  activo: boolean;
  curp?: string;
  rfc?: string;
  comision: number;
  sw2: number;
}
