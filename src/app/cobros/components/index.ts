import { CobrosTableComponent } from './cobros-table/cobros-table.component';
import { FacturasTableComponent } from './facturas-table/facturas-table.component';
import { AplicacionesTableComponent } from './aplicaciones-table/aplicaciones-table.component';
import { FacturasSelectorComponent } from './facturas-selector/facturas-selector.component';
import { FacturasSelectorBtnComponent } from './facturas-selector/facturas-selector-btn/facturas-selector-btn.component';
import { BonificacionFormComponent } from './bonificacion-form/bonificacion-form.component';
import { BonificacionPartidasComponent } from './bonificacion-form/bonificacion-partidas/bonificacion-partidas.component';
import { NotadecargoFormComponent } from './notadecargo-form/notadecargo-form.component';
import { NotadecargoPartidasComponent } from './notadecargo-partidas/notadecargo-partidas.component';

export const components: any[] = [
  CobrosTableComponent,
  AplicacionesTableComponent,
  FacturasTableComponent,
  FacturasSelectorComponent,
  FacturasSelectorBtnComponent,
  BonificacionFormComponent,
  BonificacionPartidasComponent,
  NotadecargoFormComponent,
  NotadecargoPartidasComponent
];
export const entryComponents: any[] = [FacturasSelectorComponent];

export * from './cobros-table/cobros-table.component';
export * from './aplicaciones-table/aplicaciones-table.component';
export * from './facturas-table/facturas-table.component';
export * from './facturas-selector/facturas-selector.component';
export * from './facturas-selector/facturas-selector-btn/facturas-selector-btn.component';
export * from './bonificacion-form/bonificacion-form.component';
export * from './bonificacion-form/bonificacion-partidas/bonificacion-partidas.component';
export * from './notadecargo-form/notadecargo-form.component';
export * from './notadecargo-partidas/notadecargo-partidas.component';
