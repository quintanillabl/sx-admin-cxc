export interface Solicitud {
  id?: string;
  sucursal?: { id: string; nombre: string };
  cliente: { id: string; nombre: string };
  banco: { id: string; nombre: string };
  cuenta: { id: string; descripcion: string };
  tipo: 'CRE' | 'CON';
  fecha: string;
  fechaDeposito: string;
  cheque: number;
  efectivo: number;
  transferencia: number;
  total: number;
  referencia: string;
  comentario?: string;
  revisado?: Date;
}
