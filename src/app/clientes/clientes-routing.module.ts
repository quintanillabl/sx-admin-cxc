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
        path: 'edit/:clienteId',
        component: fromContainers.ClienteEditComponent
      },
      {
        path: ':id',
        component: fromContainers.ClienteComponent,
        resolve: { cliente: ClienteResolver },
        children: [
          { path: '', redirectTo: 'info', pathMatch: 'full' },
          { path: 'info', component: fromContainers.ClienteInfoComponent },
          {
            path: 'cxc',
            component: fromContainers.ClienteCxcComponent
          },
          {
            path: 'facturas',
            component: fromContainers.ClienteFacturasComponent
          },
          {
            path: 'bonificaciones',
            component: fromContainers.ClienteNotasComponent,
            data: { tipo: 'BONIFICACION' }
          },
          {
            path: 'devoluciones',
            component: fromContainers.ClienteNotasComponent,
            data: { tipo: 'DEVOLUCION' }
          },
          {
            path: 'cobros',
            component: fromContainers.ClienteCobrosComponent
          },
          {
            path: 'cargos',
            component: fromContainers.ClienteCargosComponent
          },
          {
            path: 'socios',
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
