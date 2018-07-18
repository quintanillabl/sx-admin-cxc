export interface BonificacionMC {
  id: string;
  ejercicio: number;
  mes: number;
  cliente: { id: string };
  nombre: string;
  fecha: string;
  ventas: number;
  ventasKilos: number;
  facturas: number;
  bono: number;
  importe: number;
  aplicado: number;
  ajuste: number;
  disponible: number;
  vigenciaDias: number;
  vencimiento: string;
  suspendido: string;
  suspendidoComentario: string;
  ultimaVenta: string;
  ultimaAplicacion: string;
  dateCreated: string;
  lastUpdated: string;
  posicion: number;
  chequesDevueltos?: number;
}
