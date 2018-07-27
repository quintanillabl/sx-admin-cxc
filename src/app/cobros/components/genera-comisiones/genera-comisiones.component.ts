import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'sx-genera-comisiones',
  template: `
    <h2 mat-dialog-title>Generar comisiones</h2>
    <mat-dialog-content layout="column">
      <mat-select [(value)]="tipo" placeholder="Tipo">
        <mat-option value="COB">Cobrador</mat-option>
        <mat-option value="VEN">Vendedor</mat-option>
      </mat-select>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="tipo" [disabled]="!tipo">Aceptar</button>
      <button mat-button mat-dialog-close>Canelar</button>
    </mat-dialog-actions>
  `,
  styles: []
})
export class GeneraComisionesComponent implements OnInit {
  tipo = 'COB';

  constructor(@Inject(MAT_DIALOG_DATA) private data) {}

  ngOnInit() {}
}
