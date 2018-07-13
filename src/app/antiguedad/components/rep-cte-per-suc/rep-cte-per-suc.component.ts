import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Periodo } from 'app/_core/models/periodo';

@Component({
  selector: 'sx-rep-cte-per-suc',
  template: `
    <form [formGroup]="form" novalidate (ngSubmit)="doAccept()">
      <h4 md-dialog-title>
        {{title}}
      </h4>

      <div layout="column" class="selector-form">
        <sx-cliente-field formControlName="cliente" tipo="TODOS"></sx-cliente-field>
        <sx-sucursal-field [parent]="form"></sx-sucursal-field>

        <mat-form-field>
          <mat-select placeholder="Origen" formControlName="origen">
            <mat-option *ngFor="let origen of ORIGENES" [value]="origen.clave">
              {{ origen.descripcion }}
            </mat-option>
          </mat-select>
        </mat-form-field>

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
      </div>

      <mat-dialog-actions>
        <button mat-button class="accent" type="submit" [disabled]="form.invalid">Aceptar</button>
        <button mat-button type="button" (click)="close()">Cancelar</button>
      </mat-dialog-actions>

    </form>
  `,
  styles: []
})
export class RepCtePerSucComponent implements OnInit {
  form: FormGroup;
  periodo: Periodo;
  title;
  sucursalOpcional: boolean;

  ORIGENES = [
    { clave: '%', descripcion: 'TODOS' },
    { clave: 'CRE', descripcion: 'CREDITO' },
    { clave: 'CON', descripcion: 'CONTADO' },
    { clave: 'COD', descripcion: 'COD' }
  ];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RepCtePerSucComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title || 'Seleccione parametros';
    this.sucursalOpcional = data.sucursalOpcional || true;
  }

  ngOnInit() {
    const periodo = this.data.periodo || Periodo.mesActual();
    this.form = this.fb.group({
      fechaIni: [periodo.fechaInicial, Validators.required],
      fechaFin: [new Date(), Validators.required],
      cliente: [null, Validators.required],
      origen: [null, Validators.required],
      sucursal: [null]
    });
    if (!this.sucursalOpcional) {
      console.log('Sucursal obligatoria');
      this.form.get('sucursal').setValidators([Validators.required]);
    }
  }

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    const fechaIni: Date = this.form.get('fechaIni').value;
    const fechaFin: Date = this.form.get('fechaFin').value;
    const cliente = this.form.get('cliente').value;
    const sucursal = this.form.get('sucursal').value;
    const res = {
      ...this.form.value,
      fechaIni: fechaIni.toISOString(),
      fechaFin: fechaFin.toISOString(),
      sucursal: sucursal ? sucursal.id : '%',
      cliente: cliente.id
    };
    // console.log('Val: ', res);
    this.dialogRef.close(res);
  }
}
