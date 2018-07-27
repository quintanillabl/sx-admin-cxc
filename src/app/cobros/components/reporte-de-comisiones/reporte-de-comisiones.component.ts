import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'sx-reporte-de-comisiones',
  template: `
    <h2 mat-dialog-title>Generar comisiones</h2>
    <mat-dialog-content >
      <div layout="column" layout-margin >
        <mat-select [(value)]="tipo" placeholder="Tipo">
          <mat-option value="COB">Cobrador</mat-option>
          <mat-option value="VEN">Vendedor</mat-option>
        </mat-select>
        <div layout class="pad-top">
          <mat-form-field flex>
            <input matInput placeholder="Comisionista" type ="number" autocomplete="off" [(ngModel)]="comisionista"
                   [disabled]="todos">
          </mat-form-field>
          <mat-checkbox [(ngModel)]="todos"> Todos</mat-checkbox>
        </div>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="getData()" [disabled]="!tipo">Aceptar</button>
      <button mat-button mat-dialog-close>Canelar</button>
    </mat-dialog-actions>
  `,
  styles: []
})
export class ReporteDeComisionesComponent implements OnInit {
  tipo = 'COB';
  comisionista;
  todos = false;

  constructor(@Inject(MAT_DIALOG_DATA) private data) {}

  ngOnInit() {}

  getData() {
    return {
      tipo: this.tipo,
      comisionista: this.todos ? 0 : this.comisionista
    };
  }
}
