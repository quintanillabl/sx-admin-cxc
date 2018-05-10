import { Component, Inject, OnInit, Input } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material';

import { Cobrador } from '../../models/cobrador';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'sx-cobrador-form',
  templateUrl: './cobrador-form.component.html'
})
export class CobradorFormComponent implements OnInit {
  cobrador: Cobrador;
  form: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.cobrador = data.cobrador;
  }

  ngOnInit() {
    this.buildForm();
    if (this.cobrador) {
      this.form.patchValue(this.cobrador);
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
      comision: [0.0, [Validators.required, Validators.min(0)]]
    });
  }
}
