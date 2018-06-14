import { NgModule, ModuleWithProviders } from '@angular/core';

import { ReportesRoutingModule } from './reportes-routing.module';
import { SharedModule } from '../_shared/shared.module';

import { components, entryComponents } from './components';
import { services } from './services';

@NgModule({
  imports: [SharedModule, ReportesRoutingModule],
  declarations: [...components],
  entryComponents: [...entryComponents],
  exports: [...components]
})
export class ReportesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ReportesModule,
      providers: [...services]
    };
  }
}
