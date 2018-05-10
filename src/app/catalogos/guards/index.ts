import { DespachosGuard } from './despachos.guard';
import { DespachoExistsGuard } from './despacho-exists.guard';

export const guards: any[] = [DespachosGuard, DespachoExistsGuard];

export * from './despachos.guard';
export * from './despacho-exists.guard';
