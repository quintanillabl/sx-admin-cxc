import { NgModule } from '@angular/core';

import { CatalogosRoutingModule } from './catalogos-routing.module';
import { SharedModule } from '../_shared/shared.module';

// ngrx Store
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store';

// components
import { components, entryComponents } from './components';

// containers
import { containers } from './containers';

// services
import { services } from './services';
// guards
import { guards } from './guards';

@NgModule({
  imports: [
    SharedModule,
    CatalogosRoutingModule,
    StoreModule.forFeature('catalogos', reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [...components, ...containers],
  entryComponents: [...entryComponents],
  providers: [...services, ...guards]
})
export class CatalogosModule {}
