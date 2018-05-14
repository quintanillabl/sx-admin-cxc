import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPageComponent } from './_core/containers/main-page/main-page.component';
import { HomePageComponent } from './_core/containers/home-page/home-page.component';
import { AntiguedadModule } from './antiguedad/antiguedad.module';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      { path: '', component: HomePageComponent },
      {
        path: 'clientes',
        loadChildren: './clientes/clientes.module#ClientesModule'
      },
      {
        path: 'catalogos',
        loadChildren: './catalogos/catalogos.module#CatalogosModule'
      },
      {
        path: 'solicitudes',
        loadChildren: './solicitudes/solicitudes.module#SolicitudesModule'
      },
      {
        path: 'cobranza',
        loadChildren: './cobros/cobros.module#CobrosModule'
      },
      {
        path: 'antiguedad',
        loadChildren: './antiguedad/antiguedad.module#AntiguedadModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
