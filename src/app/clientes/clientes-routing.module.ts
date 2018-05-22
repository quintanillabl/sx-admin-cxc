import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';
import * as fromGuards from './guards';

import { ClienteResolver } from './services';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        canActivate: [fromGuards.ClientesGuard],
        component: fromContainers.ClientesComponent
      },
      {
        path: ':id',
        component: fromContainers.ClienteComponent,
        canActivate: [fromGuards.ClientesGuard, fromGuards.ClienteExistsGuard],
        resolve: { cliente: ClienteResolver },
        children: [
          {
            path: 'info/:id',
            component: fromContainers.ClienteInfoComponent
          },
          {
            path: 'edit/:id',
            component: fromContainers.ClienteEditComponent
          },
          {
            path: 'cxc/:id',
            component: fromContainers.ClienteCxcComponent
          },
          {
            path: 'facturas/:id',
            component: fromContainers.ClienteFacturasComponent
          },
          {
            path: 'bonificaciones/:id',
            component: fromContainers.ClienteNotasComponent,
            data: { tipo: 'BONIFICACION' }
          },
          {
            path: 'devoluciones/:id',
            component: fromContainers.ClienteNotasComponent,
            data: { tipo: 'DEVOLUCION' }
          },
          {
            path: 'cobros/:id',
            component: fromContainers.ClienteCobrosComponent
          },
          {
            path: 'cargos/:id',
            component: fromContainers.ClienteCargosComponent
          },
          {
            path: 'socios/:id',
            component: fromContainers.ClienteSociosComponent
          },
          {
            path: 'estadoDeCuenta',
            component: fromContainers.EstadoDeCuentaComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule {}
