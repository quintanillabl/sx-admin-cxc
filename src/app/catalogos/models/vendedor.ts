export interface Vendedor {
  id?: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
  nombres: string;
  activo: boolean;
  comisionContado: number;
  comisionCredito: number;
  rfc?: string;
}
