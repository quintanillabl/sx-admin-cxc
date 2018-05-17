export interface AntiguedadDeSaldo {
  clienteId: string;
  cliente: string;
  plazo: number;
  limiteDeCredito: number;
  tipoVencimiento: string;
  facturas: number;
  atrasoMaximo: number;
  porVencer: number;
  vencido: number;
  de1_30: number;
  de31_60: number;
  de61_90: number;
  mas90: number;
  part: number;
}
