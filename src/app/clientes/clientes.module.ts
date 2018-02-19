import { ModuleWithProviders, NgModule } from '@angular/core';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesListComponent } from './containers/clientes-list/clientes-list.component';
import { SharedModule } from '../_shared/shared.module';
import { services } from './services';

@NgModule({
  imports: [
    SharedModule,
    ClientesRoutingModule
  ],
  declarations: [ClientesListComponent]
})
export class ClientesModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ClientesModule,
      providers: [ services ]
    };
  }
}
