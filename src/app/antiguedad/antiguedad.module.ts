import { NgModule } from '@angular/core';

import { SharedModule } from '../_shared/shared.module';
import { AntiguedadRoutingModule } from './antiguedad-routing.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store';

// services
import { services } from './services';
// guards
import { guards } from './guards';
// components
import { components, componentsEntry } from './components';
// containers
import { containers } from './containers';
import { ClientesModule } from '../clientes/clientes.module';
import { ReportesModule } from '../reportes/reportes.module';

@NgModule({
  imports: [
    SharedModule,
    AntiguedadRoutingModule,
    ClientesModule,
    ReportesModule,
    StoreModule.forFeature('antiguedadDeSaldos', reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [...components, ...componentsEntry, ...containers],
  entryComponents: [...componentsEntry],
  providers: [...services, ...guards]
})
export class AntiguedadModule {}
