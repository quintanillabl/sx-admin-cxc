import { NgModule } from '@angular/core';

import { SharedModule } from '../_shared/shared.module';
import { AntiguedadRoutingModule } from './antiguedad-routing.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store';

// services
import { services } from './services';

// components
import { components, componentsEntry } from './components';
// containers
import { containers } from './containers';

@NgModule({
  imports: [
    SharedModule,
    AntiguedadRoutingModule,
    StoreModule.forFeature('antiguedadDeSaldos', reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [...components, ...componentsEntry, ...containers],
  providers: [...services]
})
export class AntiguedadModule {}
