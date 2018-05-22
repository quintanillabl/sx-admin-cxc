import { AntiguedadTableComponent } from './antiguedad-table/antiguedad-table.component';
import { AntiguedadDetailTableComponent } from './antiguedad-detail-table/antiguedad-detail-table.component';
import { AntiguedadTotalesPanelComponent } from './antiguedad-totales-panel/antiguedad-totales-panel.component';
import { ReporteCarteraCodComponent } from './reporte-cartera-cod/reporte-cartera-cod.component';

export const components: any[] = [
  AntiguedadTableComponent,
  AntiguedadDetailTableComponent,
  AntiguedadTotalesPanelComponent,
  ReporteCarteraCodComponent
];

export const componentsEntry: any[] = [ReporteCarteraCodComponent];

export * from './antiguedad-table/antiguedad-table.component';
export * from './antiguedad-detail-table/antiguedad-detail-table.component';
export * from './antiguedad-totales-panel/antiguedad-totales-panel.component';
export * from './reporte-cartera-cod/reporte-cartera-cod.component';
