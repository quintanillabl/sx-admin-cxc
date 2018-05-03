import { ClientesTableComponent } from './clientes-table/clientes-table.component';
import { ClienteInfoCardComponent } from './cliente-info-card/cliente-info-card.component';
import { ClienteCreditoCardComponent } from './cliente-credito-card/cliente-credito-card.component';
import { ClienteCreditoFormComponent } from './cliente-credito-form/cliente-credito-form.component';
import { ClienteFieldComponent } from './cliente-field/cliente-field.component';
import { CxcTableComponent } from './cxc-table/cxc-table.component';
import { ClienteCobrosTableComponent } from './cliente-cobros-table/cliente-cobros-table.component';
import { SociosTableComponent } from './socios-table/socios-table.component';
import { SocioFormComponent } from './socio-form/socio-form.component';

export const components = [
  ClientesTableComponent,
  ClienteInfoCardComponent,
  ClienteCreditoCardComponent,
  ClienteCreditoFormComponent,
  ClienteFieldComponent,
  CxcTableComponent,
  ClienteCobrosTableComponent,
  SociosTableComponent,
  SocioFormComponent
];
export const entryComponents = [
  ClienteCreditoFormComponent,
  SocioFormComponent
];

export * from './clientes-table/clientes-table.component';
export * from './cliente-info-card/cliente-info-card.component';
export * from './cliente-credito-card/cliente-credito-card.component';
export * from './cliente-credito-form/cliente-credito-form.component';
export * from './cliente-field/cliente-field.component';
export * from './cxc-table/cxc-table.component';
export * from './cliente-cobros-table/cliente-cobros-table.component';
export * from './socios-table/socios-table.component';
export * from './socio-form/socio-form.component';
