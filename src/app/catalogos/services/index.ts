import { OperadoresService } from './operadores.service';
import { CobradoresService } from './cobradores.service';
import { VendedoresService } from './vendedores.service';
import { DespachosService } from './despachos.service';

export const services: any[] = [
  OperadoresService,
  CobradoresService,
  VendedoresService,
  DespachosService
];

export * from './operadores.service';
export * from './cobradores.service';
export * from './vendedores.service';
export * from './despachos.service';
