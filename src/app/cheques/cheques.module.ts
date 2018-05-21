import { NgModule } from '@angular/core';

import { SharedModule } from '../_shared/shared.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store';

import { ChequesRoutingModule } from './cheques-routing.module';

import { services } from './services';
import { components } from './components';
import { containers } from './containers';
import { guards } from './guards';

@NgModule({
  imports: [
    SharedModule,
    ChequesRoutingModule,
    StoreModule.forFeature('cobranza_che', reducers),
    EffectsModule.forFeature(effects),
  ],
  declarations: [...components, ...containers],
  providers: [...services, ...guards],
})
export class ChequesModule {}
