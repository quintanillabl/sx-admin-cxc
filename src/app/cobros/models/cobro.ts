import { Cliente } from '../../clientes/models';
import { Periodo } from '../../_core/models/periodo';

export interface Cobro {
  id?: string;
  cliente: Partial<Cliente>;
  nombre: string;
  sucursal: { id: string; nombre: string };
  tipo: string;
  fecha: string;
  formaDePago: string;
  moneda: string;
  tipoDeCambio: number;
  importe: number;
  disponible: number;
  diferencia?: number;
  referencia?: string;
  primeraAplicacion?: string;
  anticipo?: boolean;
  enviado?: boolean;
  dateCreated?: string;
  lastUpdated?: string;
  createUser?: string;
  updateUser?: string;
  aplicaciones?: Array<any>;
  tarjeta?: CobroTarjeta;
  cheque?: CobroCheque;
  porAplicar?: number;
  aplicado?: number;
  comentario?: string;
  pendientesDeAplicar?: Array<any>;
  fechaDeAplicacion?: string;
  selected?: boolean;
  recibo?: string;
  cfdi?: any;
  sucursalNombre?: string;
}

export interface CobroTarjeta {
  id?: string;
  debitoCredito: boolean;
  visaMaster: boolean;
  validacion: number;
}

export interface CobroCheque {
  id?: string;
  banco: { id: string };
  numero: string;
  numeroDeCuenta: string;
}

export interface CobroFilter {
  fechaInicial?: Date;
  fechaFinal?: Date;
  cliente?: Partial<Cliente>;
  registros?: number;
  pendientes?: boolean;
}

export function build(
  registros: number = 50,
  pendientes: boolean = true
): CobroFilter {
  const periodo = Periodo.fromNow(30);
  return {
    fechaInicial: periodo.fechaInicial,
    fechaFinal: periodo.fechaFinal,
    registros,
    pendientes
  };
}
