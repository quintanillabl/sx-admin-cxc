import { ModuleWithProviders, NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store/index';

import { SharedModule } from '../_shared/shared.module';
import { ClientesRoutingModule } from './clientes-routing.module';

// components
import * as fromComponents from './components';
// containers
import * as fromContainers from './containers';
// services
import { services } from './services';
// guards
import { guards } from './guards';

import { CurrencyPipe, DatePipe } from '@angular/common';

@NgModule({
  imports: [
    SharedModule,
    ClientesRoutingModule,
    StoreModule.forFeature('clientes', reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [...fromContainers.containers, ...fromComponents.components],
  exports: [fromComponents.ClienteFieldComponent],
  entryComponents: [...fromComponents.entryComponents],
  providers: [...services, ...guards]
})
export class ClientesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ClientesModule,
      providers: [...services, DatePipe, CurrencyPipe]
    };
  }
}
