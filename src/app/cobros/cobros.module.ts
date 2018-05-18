import { NgModule } from '@angular/core';

import { CobrosRoutingModule } from './cobros-routing.module';
import { SharedModule } from '../_shared/shared.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects } from './store';

// Components
import { components, entryComponents } from './components';
// Containers
import { containers } from './containers';
// Services
import { services } from './services';
import { guards } from './guards';

import { DatePipe, CurrencyPipe } from '@angular/common';
import { ClientesModule } from '../clientes/clientes.module';

@NgModule({
  imports: [
    SharedModule,
    CobrosRoutingModule,
    ClientesModule,
    // ngrx Store configuration
    StoreModule.forFeature('cobranza', reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [...components, ...containers],
  entryComponents: [...entryComponents],
  providers: [...services, ...guards, DatePipe, CurrencyPipe]
})
export class CobrosModule {}
