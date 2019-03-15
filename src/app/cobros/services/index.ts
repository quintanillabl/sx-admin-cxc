import { CobrosService } from './cobros.service';
import { CobroResolver } from './cobro.resolver';
import { NotascxcService } from './notascxc.service';
import { NotadecargoService } from './notadeCargo.service';
import { RevisionesService } from './revisiones.service';
import { ComisionesService } from './comisions.service';
import { FacturasService } from './facturas.service';
import { BonificacionesMCService } from './bonificacionesMC.service';
import { CxCService } from './cxc.service';
import { CfdiService } from './cfdi.service';
import { JuridicoService } from './juridico.service';

export const services: any[] = [
  CobrosService,
  CobroResolver,
  NotascxcService,
  NotadecargoService,
  RevisionesService,
  ComisionesService,
  FacturasService,
  BonificacionesMCService,
  CxCService,
  CfdiService,
  JuridicoService
];

export * from './cobros.service';
export * from './cobro.resolver';
export * from './notascxc.service';
export * from './notadeCargo.service';
export * from './revisiones.service';
export * from './comisions.service';
export * from './facturas.service';
export * from './bonificacionesMC.service';
export * from './cxc.service';
export * from './cfdi.service';
export * from './juridico.service';
