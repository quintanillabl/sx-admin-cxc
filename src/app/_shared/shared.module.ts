import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './_material/material.module';
import { CovalentModule } from './_covalent/covalent.module';

// components
import { components, entyComponents } from './components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CovalentModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CovalentModule,
    ...components
  ],
  declarations: [...components],
  entryComponents: [...entyComponents]
})
export class SharedModule {}
