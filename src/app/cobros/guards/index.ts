import { RevisionGuard } from './revision.guard';
import { BonificacionesMCGuard } from './bonificacionesMC.guard';
import { BonificacionMCExistsGuard } from './bonificacionMC-exists.guard';

export const guards: any[] = [
  RevisionGuard,
  BonificacionesMCGuard,
  BonificacionMCExistsGuard
];

export * from './revision.guard';
export * from './bonificacionesMC.guard';
export * from './bonificacionMC-exists.guard';
