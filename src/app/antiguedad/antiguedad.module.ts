import { NgModule } from '@angular/core';

import { SharedModule } from '../_shared/shared.module';
import { AntiguedadRoutingModule } from './antiguedad-routing.module';

// services
import { services } from './services';

// components
import { components, componentsEntry } from './components';
// containers
import { containers } from './containers';

@NgModule({
  imports: [SharedModule, AntiguedadRoutingModule],
  declarations: [...components, ...componentsEntry, ...containers],
  providers: [...services]
})
export class AntiguedadModule {}
