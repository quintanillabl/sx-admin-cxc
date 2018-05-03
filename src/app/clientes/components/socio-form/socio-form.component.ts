import {
  Component,
  OnInit,
  Inject,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Cliente } from '../../models';

@Component({
  selector: 'sx-socio-form',
  templateUrl: './socio-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocioFormComponent implements OnInit {
  cliente: Cliente;
  socio: any;
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder
  ) {
    this.cliente = data.cliente;
    this.socio = data.socio;
  }

  ngOnInit() {
    this.buildForm();
    if (this.socio) {
      this.form.patchValue(this.socio);
    }
  }

  buildForm() {
    this.form = this.fb.group({
      id: [],
      clave: [
        null,
        [Validators.required, Validators.minLength(4), Validators.maxLength(20)]
      ],
      nombre: [null, Validators.required],
      direccionFiscal: this.fb.group({
        calle: [null, Validators.required],
        numeroExterior: [null, Validators.required],
        numeroInterior: [null],
        colonia: [null, Validators.required],
        municipio: [null, Validators.required],
        estado: [null, Validators.required],
        pais: [{ value: 'MEXICO', disabled: true }, Validators.required],
        codigoPostal: [null, Validators.required]
      })
    });
  }
}
