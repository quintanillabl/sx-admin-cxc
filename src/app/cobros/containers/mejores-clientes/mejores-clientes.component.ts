import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { MejoresClientesService } from '../../services';
import { Mes } from 'app/_core/models/mes';
import { TdDialogService } from '../../../../../node_modules/@covalent/core';

@Component({
  selector: 'sx-mejores-clientes',
  template: `
    <mat-card>
      <sx-search-title title="Mejores clientes">
        <div class="options" layout flex>

          <mat-select placeholder="Ejercicio" [(value)]="ejercicio">
            <mat-option *ngFor="let ejercicio of [2018,2019]" [value]="ejercicio">
              {{ejercicio}}
            </mat-option>
          </mat-select>


          <mat-select placeholder="Mes" [(ngModel)]="mes" class="pad-left">
            <mat-option *ngFor="let mes of meses" [value]="mes">
              {{mes.descripcion}}
            </mat-option>
          </mat-select>

        </div>
        <button mat-menu-item class="actions" (click)="generarRegistros()">Generar</button>
      </sx-search-title>
      <mat-divider></mat-divider>
      <div class="mc-panel">
        <sx-mejores-clientes-table [clientes]="clientes$ | async"></sx-mejores-clientes-table>
      </div>
    </mat-card>
  `,
  styles: [
    `
    .mc-panel {
      height: 70vh;
      width: 100%
    }
  `
  ]
})
export class MejoresClientesComponent implements OnInit {
  clientes$: Observable<any[]>;
  ejercicio = 2018;
  mes: Mes;
  meses = Mes.MESES;
  constructor(
    private service: MejoresClientesService,
    private dialogService: TdDialogService
  ) {}

  ngOnInit() {
    this.mes = this.meses[5];
    this.load();
  }

  load() {
    this.clientes$ = this.service.list(this.ejercicio, this.mes.clave);
  }

  generarRegistros() {
    this.dialogService
      .openConfirm({
        message: ` Periodo: ${this.mes} / ${this.ejercicio}`,
        title: `Generar registro de mejores 200 clientes`,
        acceptButton: 'Aceptar',
        cancelButton: 'Cancelar'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          console.log('Ejecutando...');
        }
      });
  }
}
