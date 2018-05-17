import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';
import * as fromGuards from './guards';

const routes: Routes = [
  {
    path: '',
    component: fromContainers.AntiguedadComponent,
    canActivate: [fromGuards.AntiguedadGuard],
    children: [
      { path: '', component: fromContainers.AntiguedadGlobalComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AntiguedadRoutingModule {}
