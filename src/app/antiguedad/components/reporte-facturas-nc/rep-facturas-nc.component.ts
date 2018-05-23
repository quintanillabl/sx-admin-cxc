import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'sx-rep-facturas-nc',
  template: `
    <form [formGroup]="form" novalidate (ngSubmit)="doAccept()">
      <h4 md-dialog-title>
        Facturas con nota de devolución
      </h4>

      <div layout="column" class="selector-form">
        <sx-sucursal-field [parent]="form"></sx-sucursal-field>
        <mat-form-field flex>
          <input matInput [matDatepicker]="picker" placeholder="Fecha ini" formControlName="fechaIni">
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
        </mat-form-field>
        <mat-form-field flex>
          <input matInput [matDatepicker]="picker2" placeholder="Fecha fin" formControlName="fechaFin">
          <mat-datepicker-toggle matSuffix [for]="picker2"></mat-datepicker-toggle>
          <mat-datepicker #picker2></mat-datepicker>
        </mat-form-field>

        <mat-form-field>
          <mat-select formControlName="origen">
            <mat-option value="option1">CRE</mat-option>
            <mat-option value="option2">CON</mat-option>
            <mat-option value="option3">COD</mat-option>
          </mat-select>
        </mat-form-field>

      </div>

      <mat-dialog-actions>
        <button mat-button class="accent" type="submit" [disabled]="form.invalid">Aceptar</button>
        <button mat-button type="button" (click)="close()">Cancelar</button>
      </mat-dialog-actions>

    </form>
  `,
  styles: []
})
export class RepFacturasNcComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RepFacturasNcComponent>
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      fechaIni: [new Date(), Validators.required],
      fechaFin: [new Date(), Validators.required],
      sucursal: [null, Validators.required],
      origen: ['CRE', Validators.required]
    });
  }

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    const fechaIni: Date = this.form.get('fechaIni').value;
    const fechaFin: Date = this.form.get('fechaFin').value;
    const res = {
      fechaIni: fechaIni.toISOString(),
      fechaFin: fechaFin.toISOString(),
      sucursal: this.form.get('sucursal').value.id
    };
    this.dialogRef.close(res);
  }
}
