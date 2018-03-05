export interface SolicitudDeDeposito {
  id: string;
  sucursal: { id: string; nombre: string };
  cliente: { id: string; nombre: string };
  cobro: {};
  banco: any;
  cuenta: any;
  tipo: string;
  folio: number;
  fecha: string;
  fechaDeposito: string;
  referencia: string;
  cheque: number;
  efectivo: number;
  transferencia: number;
  total: number;
  comentario: string;
  cancelacion?: string;
  cancelacionComentario?: string;
  enviado: boolean;
  dateCreated?: string;
  lastUpdated?: string;
  createUser?: string;
  updateUser: string;
}
