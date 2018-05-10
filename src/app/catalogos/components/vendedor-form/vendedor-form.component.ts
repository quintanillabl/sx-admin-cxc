import { Component, Inject, OnInit, Input } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material';

import { Vendedor } from '../../models/vendedor';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'sx-vendedor-form',
  templateUrl: './vendedor-form.component.html'
})
export class VendedorFormComponent implements OnInit {
  vendedor: Vendedor;
  form: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.vendedor = data.vendedor;
  }

  ngOnInit() {
    this.buildForm();
    if (this.vendedor) {
      this.form.patchValue(this.vendedor);
    }
  }

  private buildForm() {
    this.form = this.fb.group({
      nombres: [
        null,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(200)
        ]
      ],
      activo: [true, Validators.required],
      comisionCredito: [
        0.0,
        [Validators.required, Validators.min(0), Validators.max(0.5)]
      ],
      comisionContado: [
        0.0,
        [Validators.required, Validators.min(0), Validators.max(0.5)]
      ]
    });
  }
}
