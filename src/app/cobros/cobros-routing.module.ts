import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CobrosComponent } from './containers';
import * as fromContainers from './containers';
import { CobroResolver } from './services';

const routes: Routes = [
  {
    path: 'cre',
    component: fromContainers.CobranzaComponent,
    data: { cartera: { clave: 'CRE', descripcion: 'CREDITO' } },
    children: [
      { path: 'cobros', component: fromContainers.CobrosComponent },
      {
        path: 'cobros/:id',
        component: fromContainers.CobroComponent,
        resolve: { cobro: CobroResolver }
      },
      { path: 'devoluciones', component: fromContainers.DevolucionesComponent },
      {
        path: 'devoluciones/show/:id',
        component: fromContainers.NotaViewComponent
      },
      {
        path: 'bonificaciones',
        component: fromContainers.BonificacionesComponent
      },
      {
        path: 'bonificaciones/create',
        component: fromContainers.BonificacionComponent
      },
      {
        path: 'bonificaciones/show/:id',
        component: fromContainers.NotaViewComponent
      },
      {
        path: 'cargos',
        component: fromContainers.CargosComponent
      },
      {
        path: 'cargos/create',
        component: fromContainers.CargoComponent
      },
      {
        path: 'cargos/show/:id',
        component: fromContainers.CargoShowComponent
      },
      {
        path: 'cargos/edit/:id',
        component: fromContainers.CargoEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CobrosRoutingModule {}