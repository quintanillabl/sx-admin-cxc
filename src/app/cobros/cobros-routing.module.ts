import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CobrosComponent } from './containers';
import * as fromContainers from './containers';
import { CobroResolver } from './services';

const routes: Routes = [
  {
    path: '',
    component: fromContainers.CobranzaComponent,
    children: [
      // { path: '', redirectTo: 'list' },
      { path: 'list', component: fromContainers.CobrosComponent },
      {
        path: ':id',
        component: fromContainers.CobroComponent,
        resolve: { cobro: CobroResolver }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CobrosRoutingModule {}
