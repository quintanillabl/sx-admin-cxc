import { OperadoresListComponent } from './operadores-list/operadores-list.component';
import { CobradoresTableComponent } from './cobradores-table/cobradores-table.component';
import { CobradorFormComponent } from './cobrador-form/cobrador-form.component';
import { VendedorFormComponent } from './vendedor-form/vendedor-form.component';
import { VendedoresTableComponent } from './vendedores-table/vendedores-table.component';
import { DespachosListComponent } from './despachos-list/despachos-list.component';
import { DespachoFormComponent } from './despacho-form/despacho-form.component';

export const components: any[] = [
  OperadoresListComponent,
  CobradoresTableComponent,
  CobradorFormComponent,
  VendedorFormComponent,
  VendedoresTableComponent,
  DespachosListComponent,
  DespachoFormComponent
];

export const entryComponents: any[] = [
  CobradorFormComponent,
  VendedorFormComponent
];

export * from './operadores-list/operadores-list.component';
export * from './cobradores-table/cobradores-table.component';
export * from './cobrador-form/cobrador-form.component';
export * from './vendedor-form/vendedor-form.component';
export * from './vendedores-table/vendedores-table.component';
export * from './despachos-list/despachos-list.component';
export * from './despacho-form/despacho-form.component';
