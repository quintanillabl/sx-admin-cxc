import { NgModule } from '@angular/core';

import { SharedModule } from '../_shared/shared.module';
import { SolicitudesRoutingModule } from './solicitudes-routing.module';
import { containers } from './containers';
import { components, entryComponents } from './components';
import { ClientesModule } from '../clientes/clientes.module';

@NgModule({
  imports: [SharedModule, SolicitudesRoutingModule, ClientesModule],
  declarations: [...components, ...containers],
  entryComponents: [...entryComponents]
})
export class SolicitudesModule {}
