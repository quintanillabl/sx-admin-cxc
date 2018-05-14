import { ClientesGuard } from './clientes.guard';
import { ClienteExistsGuard } from './cliente-exists.guard';

export const guards: any[] = [ClientesGuard, ClienteExistsGuard];

export * from './clientes.guard';
export * from './cliente-exists.guard';
