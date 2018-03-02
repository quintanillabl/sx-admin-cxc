import { NgModule } from '@angular/core';

import { CobrosRoutingModule } from './cobros-routing.module';
import { SharedModule } from '../_shared/shared.module';

// Components
import { components } from './components';
// Containers
import { containers } from './containers';
// Services
import { services } from './services';

@NgModule({
  imports: [SharedModule, CobrosRoutingModule],
  declarations: [...components, ...containers],
  providers: [...services]
})
export class CobrosModule {}
