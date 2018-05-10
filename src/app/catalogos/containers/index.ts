import { CatalogosComponent } from './catalogos/catalogos.component';
import { OperadoresComponent } from './operadores/operadores.component';
import { CobradoresComponent } from './cobradores/cobradores.component';
import { VendedoresComponent } from './vendedores/vendedores.component';
import { DespachosComponent } from './despachos/despachos.component';
import { DespachoComponent } from './despacho/despacho.component';

export const containers: any[] = [
  CatalogosComponent,
  OperadoresComponent,
  CobradoresComponent,
  VendedoresComponent,
  DespachosComponent,
  DespachoComponent
];

export * from './catalogos/catalogos.component';
export * from './cobradores/cobradores.component';
export * from './operadores/operadores.component';
export * from './vendedores/vendedores.component';
export * from './despachos/despachos.component';
export * from './despacho/despacho.component';
