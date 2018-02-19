import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SharedModule } from './_shared/shared.module';
import { CoreModule } from './_core/core.module';
import { ConfigService } from './utils/config.service';
import { ClientesModule } from './clientes/clientes.module';
import { HttpClientModule } from '@angular/common/http';

export function onAppInit(configService: ConfigService): () => Promise<any> {
  return () => configService.load();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    ClientesModule.forRoot()
  ],
  providers: [
    ConfigService,
    {provide: APP_INITIALIZER, useFactory: onAppInit, multi: true, deps: [ConfigService]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
