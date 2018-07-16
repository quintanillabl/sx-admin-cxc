import { CobrosService } from './cobros.service';
import { CobroResolver } from './cobro.resolver';
import { NotascxcService } from './notascxc.service';
import { NotadecargoService } from './notadeCargo.service';
import { RevisionesService } from './revisiones.service';
import { ComisionesService } from './comisions.service';
import { FacturasService } from './facturas.service';
import { BonificacionesMCService } from './bonificacionesMC.service';


export const services: any[] = [
  CobrosService,
  CobroResolver,
  NotascxcService,
  NotadecargoService,
  RevisionesService,
  ComisionesService,
  FacturasService,
  BonificacionesMCService
];

export * from './cobros.service';
export * from './cobro.resolver';
export * from './notascxc.service';
export * from './notadeCargo.service';
export * from './revisiones.service';
export * from './comisions.service';
export * from './facturas.service';
export * from './bonificacionesMC.service';


