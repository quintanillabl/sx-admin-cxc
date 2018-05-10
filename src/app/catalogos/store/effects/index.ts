import { CobradoresEffect } from './cobradores.effects';
import { VendedoresEffect } from './vendedores.effects';
import { DespachosEffects } from './despachos.effects';

export const effects: any[] = [
  CobradoresEffect,
  VendedoresEffect,
  DespachosEffects
];

export * from './cobradores.effects';
export * from './vendedores.effects';
export * from './despachos.effects';
