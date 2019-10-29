import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CuentaPorCobrar } from '../../models';

@Component({
  selector: 'sx-to-juridico-dialog',
  templateUrl: './to-juridico-dialog.component.html'
})
export class ToJuridicoDialogComponent implements OnInit {
  form: FormGroup;
  // cxc: CuentaPorCobrar;
  facturas: CuentaPorCobrar[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialoRef: MatDialogRef<ToJuridicoDialogComponent>,
    private fb: FormBuilder
  ) {
    // this.cxc = data.cxc;
    this.facturas = data.facturas;
  }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.fb.group({
      traspaso: [new Date()],
      despacho: [null, Validators.required],
      abogado: [null, Validators.required],
      // cxc: [this.cxc.id, Validators.required],
      comentario: [null]
    });
  }

  submit() {
    if (this.form.valid) {
      const traspaso: Date = this.form.get('traspaso').value;
      const entity = {
        ...this.form.value,
        traspaso: traspaso.toISOString(),
        facturas: this.facturas.map(item => item.id)
      };
      this.dialoRef.close(entity);
    }
  }
}
