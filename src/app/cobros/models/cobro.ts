export interface Cobro {
  id?: string;
  cliente: { id: string; nombre: string };
  sucursal: { id: string; nombre: string };
  tipo: string;
  fecha: string;
  formaDePago: string;
  moneda: string;
  tipoDeCambio: number;
  importe: number;
  disponible: number;
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
