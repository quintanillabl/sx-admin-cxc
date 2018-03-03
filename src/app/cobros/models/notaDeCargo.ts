export interface NotaDeCargo {
  id?: string;
  cliente: any;
  folio?: number;
  tipo: string;
  fecha: string;
  moneda: string;
  tipoDeCambio: number;
  cargo?: number;
  importe: number;
  impuesto: number;
  total: number;
  saldo: number;
  dateCreated?: string;
  lastUpdated?: string;
  createUser?: string;
  updateUser?: string;
  partidas?: Array<any>;
  cuentaPorCobrar: any;
  formaDePago?: any;
  usoDeCfdi?: any;
  comentario?: any;
  tipoDeCalculo?: any;
  uuid?: any;
  cfdi?: any;
}
