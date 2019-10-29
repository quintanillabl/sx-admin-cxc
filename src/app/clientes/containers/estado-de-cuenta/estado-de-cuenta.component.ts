import {
  Component,
  OnInit,
  Inject,
  ChangeDetectionStrategy
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'sx-estado-de-cuenta',
  template: `
  <form [formGroup]="form">
    <h2 mat-dialog-title>Reporte de Estado de Cuenta</h2>
    <mat-dialog-content>
      <div layout="column">
        <mat-form-field >
          <input matInput
            [matDatepicker]="myDatepicker" placeholder="Fecha" formControlName="fecha">
          <mat-datepicker-toggle matSuffix [for]="myDatepicker"></mat-datepicker-toggle>
          <mat-datepicker #myDatepicker></mat-datepicker>
          </mat-form-field>

        <mat-form-field>
          <mat-select  formControlName="cartera" >
            <mat-option value="CON">CONTADO</mat-option>
            <mat-option value="CRE">CREDITO</mat-option>
            <mat-option value="JUR">JURIDICO</mat-option>
            <mat-option value="CHE">CHEQUES</mat-option>
          </mat-select>
        </mat-form-field>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="submit()" [disabled]="!form.valid">Aceptar</button>
      <button mat-button mat-dialog-close>Canelar</button>
    </mat-dialog-actions>
  </form>
`
})
export class EstadoDeCuentaComponent implements OnInit {
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EstadoDeCuentaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    fb: FormBuilder
  ) {
    this.form = fb.group({
      fecha: [new Date(), Validators.required],
      cartera: ['CRE', Validators.required]
    });
  }

  ngOnInit() {}

  submit() {
    this.dialogRef.close(this.form.value);
  }
}
