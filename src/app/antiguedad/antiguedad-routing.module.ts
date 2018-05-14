import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';

const routes: Routes = [
  {
    path: '',
    component: fromContainers.AntiguedadComponent,
    children: [
      { path: '', redirectTo: 'global', pathMatch: 'full' },
      { path: 'global', component: fromContainers.AntiguedadGlobalComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AntiguedadRoutingModule {}
