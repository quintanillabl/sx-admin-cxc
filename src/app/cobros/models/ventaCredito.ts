export interface VentaCredito {
  id?: string;
  plazo: number;
  vencimientoFactura: boolean;
  vencimiento: string;
  fechaRecepcionCxc: string;
  diaRevision: number;
  fechaRevision: string;
  fechaRevisionCxc: string;
  descuento: number;
  revision: boolean;
  revisada: boolean;
  diaPago: number;
  fechaPago: string;
  reprogramarPago: string;
  comentarioReprogramarPago: string;
  cobrador?: any;
  socio?: any;
  operador: number;
  comentario?: string;
  dateCreated?: string;
  lastUpdated?: string;
  createUser?: string;
  updateUser?: string;
}
