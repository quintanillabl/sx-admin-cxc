import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'sx-reporte-de-revision',
  template: `
    <form [formGroup]="form" novalidate >
      <h4 md-dialog-title>
        Reporte de facturas cobradas
      </h4>

      <div layout="column" class="form-panel">
        <div layout>
          <mat-form-field >
            <input matInput [matDatepicker]="picker" placeholder="Fecha" formControlName="fecha">
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
          </mat-form-field>
          <sx-cobrador-field [parent]="form" flex></sx-cobrador-field>
        </div>
        <sx-cliente-field formControlName="cliente"></sx-cliente-field>
      </div>

      <mat-dialog-actions>
        <button mat-button type="button" mat-dialog-close>Cancelar</button>
        <button mat-button class="accent"  [mat-dialog-close]="getReportCommand()" [disabled]="form.invalid">Aceptar</button>
      </mat-dialog-actions>

    </form>
  `,
  styles: [
    `
    .form-panel {
      min-width: 650px;
    }
  `
  ]
})
export class ReporteDeRevisionComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      fecha: [new Date(), Validators.required],
      cliente: [null],
      cobrador: [null]
    });
  }

  getReportCommand() {
    const fecha: Date = this.form.get('fecha').value;
    const res = {
      ...this.form.value,
      fecha: fecha.toISOString()
    };
    return res;
  }
}
