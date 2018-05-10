import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';
import * as fromGuards from './guards';

const routes: Routes = [
  {
    path: '',
    component: fromContainers.CatalogosComponent,
    children: [
      { path: 'operadores', component: fromContainers.OperadoresComponent },
      { path: 'cobradores', component: fromContainers.CobradoresComponent },
      { path: 'vendedores', component: fromContainers.VendedoresComponent },
      {
        path: 'despachos',
        canActivate: [fromGuards.DespachosGuard],
        children: [
          { path: '', component: fromContainers.DespachosComponent },
          { path: 'create', component: fromContainers.DespachoComponent },
          {
            path: ':despachoId',
            canActivate: [fromGuards.DespachoExistsGuard],
            component: fromContainers.DespachoComponent
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
export class CatalogosRoutingModule {}
