import { AntiguedadTableComponent } from './antiguedad-table/antiguedad-table.component';
import { AntiguedadDetailTableComponent } from './antiguedad-detail-table/antiguedad-detail-table.component';
import { AntiguedadTotalesPanelComponent } from './antiguedad-totales-panel/antiguedad-totales-panel.component';
import { ReporteCarteraCodComponent } from './reporte-cartera-cod/reporte-cartera-cod.component';
import { RepAntigueadCteComponent } from './reporte-antiguedad-cte/rep-antiguead-cte.component';
import { RepFacturasNcComponent } from './reporte-facturas-nc/rep-facturas-nc.component';
import { RepExcepcionesDescComponent } from './reporte-excepciones-desc/rep-excepciones-desc.component';
import { RepAntigueadComponent } from './reporte-antiguedad/reporte-antiguedad.component';
import { RepCtePerSucComponent } from './rep-cte-per-suc/rep-cte-per-suc.component';

export const components: any[] = [
  AntiguedadTableComponent,
  AntiguedadDetailTableComponent,
  AntiguedadTotalesPanelComponent,
  ReporteCarteraCodComponent,
  RepAntigueadComponent,
  RepAntigueadCteComponent,
  RepFacturasNcComponent,
  RepExcepcionesDescComponent,
  RepCtePerSucComponent
];

export const componentsEntry: any[] = [
  ReporteCarteraCodComponent,
  RepAntigueadComponent,
  RepAntigueadCteComponent,
  RepFacturasNcComponent,
  RepExcepcionesDescComponent,
  RepCtePerSucComponent
];

export * from './antiguedad-table/antiguedad-table.component';
export * from './reporte-antiguedad/reporte-antiguedad.component';
export * from './antiguedad-detail-table/antiguedad-detail-table.component';
export * from './antiguedad-totales-panel/antiguedad-totales-panel.component';
export * from './reporte-cartera-cod/reporte-cartera-cod.component';
export * from './reporte-antiguedad-cte/rep-antiguead-cte.component';
export * from './reporte-facturas-nc/rep-facturas-nc.component';
export * from './reporte-excepciones-desc/rep-excepciones-desc.component';
export * from './rep-cte-per-suc/rep-cte-per-suc.component';
