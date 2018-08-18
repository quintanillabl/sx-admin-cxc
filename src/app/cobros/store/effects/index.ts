import { RevisionEffects } from './revision.effects';
import { BonificacionesMCEffects } from './bonificacionesMC.effects';
import { CobrosEffects } from './cobros.effects';

export const effects: any[] = [
  RevisionEffects,
  BonificacionesMCEffects,
  CobrosEffects
];

export * from './revision.effects';
export * from './bonificacionesMC.effects';
export * from './cobros.effects';
