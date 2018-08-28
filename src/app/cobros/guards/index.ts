import { RevisionGuard } from './revision.guard';
import { BonificacionesMCGuard } from './bonificacionesMC.guard';
import { BonificacionMCExistsGuard } from './bonificacionMC-exists.guard';
import { CobrosGuard } from './cobros.guard';
import { CobroExistsGuard } from './cobro-exists.guard';
import { CobranzaGuard } from './cobranza.guard';

export const guards: any[] = [
  RevisionGuard,
  BonificacionesMCGuard,
  BonificacionMCExistsGuard,
  CobrosGuard,
  CobroExistsGuard,
  CobranzaGuard
];

export * from './revision.guard';
export * from './bonificacionesMC.guard';
export * from './bonificacionMC-exists.guard';
export * from './cobros.guard';
export * from './cobro-exists.guard';
export * from './cobranza.guard';
