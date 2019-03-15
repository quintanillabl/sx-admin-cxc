import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';
import * as fromGuards from './guards';

const routes: Routes = [
  {
    path: 'cre',
    component: fromContainers.CobranzaCreComponent,
    data: { cartera: { clave: 'CRE', descripcion: 'CREDITO' } },
    canActivate: [fromGuards.CobranzaGuard],
    children: [
      { path: 'facturas', component: fromContainers.FacturasComponent },
      {
        path: 'cobros',
        canActivate: [fromGuards.CobrosGuard],
        // canDeactivate: [fromGuards.CobrosExitGuard],
        component: fromContainers.CobrosComponent
      },
      {
        path: 'cobros/:cobroId',
        canActivate: [fromGuards.CobrosGuard, fromGuards.CobroExistsGuard],
        component: fromContainers.CobroComponent
      },
      {
        path: 'revisiones',
        component: fromContainers.RevisionesComponent
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
      },
      {
        path: 'comisiones',
        component: fromContainers.ComisionesComponent
      }
    ]
  },
  {
    path: 'con',
    component: fromContainers.CobranzaConComponent,
    data: { cartera: { clave: 'CON', descripcion: 'CONTADO' } },
    canActivate: [fromGuards.CobranzaGuard],
    children: [
      { path: 'facturas', component: fromContainers.FacturasComponent },
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
      },
      {
        path: 'mejoresClientes',
        canActivate: [fromGuards.BonificacionesMCGuard],
        component: fromContainers.MejoresClientesComponent
      },
      {
        path: 'mejoresClientes/:bonificacionId',
        canActivate: [fromGuards.BonificacionMCExistsGuard],
        component: fromContainers.BonificacionMCComponent
      },
      {
        path: 'cobros',
        canActivate: [fromGuards.CobrosGuard],
        // canDeactivate: [fromGuards.CobrosExitGuard],
        component: fromContainers.CobrosComponent
      },
      {
        path: 'cobros/:cobroId',
        canActivate: [fromGuards.CobrosGuard, fromGuards.CobroExistsGuard],
        component: fromContainers.CobroComponent
      }
    ]
  },
  {
    path: 'che',
    component: fromContainers.CobranzaCheComponent,
    data: { cartera: { clave: 'CHE', descripcion: 'CHEQUES DEVUELTOS' } },
    canActivate: [fromGuards.CobranzaGuard],
    children: [
      {
        path: 'cobros',
        canActivate: [fromGuards.CobrosGuard],
        component: fromContainers.CobrosComponent
      },
      {
        path: 'cobros/:cobroId',
        canActivate: [fromGuards.CobroExistsGuard],
        component: fromContainers.CobroComponent
      },
      { path: 'facturas', component: fromContainers.FacturasComponent },
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
  },
  {
    path: 'jur',
    component: fromContainers.CobranzaJurComponent,
    data: { cartera: { clave: 'JUR', descripcion: 'JURIDICO' } },
    canActivate: [fromGuards.CobranzaGuard],
    children: [
      {
        path: 'cobros',
        canActivate: [fromGuards.CobrosGuard],
        component: fromContainers.CobrosComponent
      },
      {
        path: 'cobros/:cobroId',
        canActivate: [fromGuards.CobroExistsGuard],
        component: fromContainers.CobroComponent
      },
      { path: 'facturas', component: fromContainers.JuridicosComponent },
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
