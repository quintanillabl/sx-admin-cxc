import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Despacho } from '../../models/despacho';

@Component({
  selector: 'sx-despacho-form',
  templateUrl: './despacho-form.component.html',
  styles: [
    `
    .mat-card {
      min-width: 650px;
    }
  `
  ]
})
export class DespachoFormComponent implements OnInit {
  form: FormGroup;
  @Input() despacho: Despacho;
  @Output() save = new EventEmitter();
  @Output() update = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() cancel = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
    if (this.despacho) {
      this.form.patchValue(this.despacho, { emitEvent: false });
    }
  }

  private buildForm() {
    this.form = this.fb.group({
      nombre: [
        null,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(200)
        ]
      ],
      rfc: [
        null,
        [
          Validators.required,
          Validators.pattern(
            '[A-Z&Ñ]{3,4}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[A-Z0-9]{2}[0-9A]'
          )
        ]
      ],
      activo: [true, Validators.required],
      telefono1: [null, Validators.maxLength(25)],
      telefono2: [null, Validators.maxLength(25)]
    });
  }

  onSubmit() {
    const target = {
      ...this.despacho,
      ...this.form.value
    };
    if (target.id) {
      this.update.emit(target);
    } else {
      this.save.emit(target);
    }
  }
}
