import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'sx-solicitud-form',
  templateUrl: 'solicitud-form.component.html'
})
export class SolicitudFormComponent implements OnInit {
  form: FormGroup;

  @Input() solicitud = {};

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SolicitudFormComponent>
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      tipo: ['CRE', Validators.required],
      cliente: [null, Validators.required],
      efectivo: 0.0,
      cheque: 0.0,
      transferencia: 0.0,
      fechaDeposito: [null, Validators.required],
      referencia: [''],
      banco: [null, Validators.required],
      cuenta: [null, Validators.required],
      comentario: [{ value: '', disabled: true }]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const solicitud = this.prepareEntity();
      this.dialogRef.close(solicitud);
    }
  }

  prepareEntity() {
    const efectivo = this.form.get('efectivo').value || 0.0;
    const cheque = this.form.get('cheque').value || 0.0;
    const transferencia = this.form.get('transferencia').value || 0.0;
    const fechaDeposito: Date = this.form.get('fechaDeposito').value;
    const cliente = this.form.get('cliente').value;
    const entity = {
      ...this.form.value,
      cliente: { id: cliente.id, nombre: cliente.nombre },
      banco: this.form.get('banco').value.id,
      cuenta: this.form.get('cuenta').value.id,
      cheque: cheque as number,
      efectivo: efectivo as number,
      transferencia: transferencia as number,
      fechaDeposito: fechaDeposito.toISOString(),
      comentario: null
    };
    return entity;
  }
}
