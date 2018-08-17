import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'app/store';
import * as fromStore from '../../store';

import { Observable } from 'rxjs';
import { of } from 'rxjs/Observable/of';
import { finalize, catchError } from 'rxjs/operators';

import { Mes } from 'app/_core/models/mes';
import { ReportesService } from 'app/reportes/services';

import { TdDialogService } from '@covalent/core';
import { BonificacionMC } from '../../models/bonificacionMC';
import { Ejercicio } from '../../../_core/models/ejercicio';

@Component({
  selector: 'sx-mejores-clientes',
  template: `

  <ng-template tdLoading [tdLoadingUntil]="!(loading$ | async)" tdLoadingStrategy="overlay">
    <mat-card>
      <sx-search-title title="Bonificaciones mejores clientes de contado" (search)="onSearch($event)">
        <div class="options" layout flex>

          <mat-select placeholder="Ejercicio" [(value)]="ejercicio" (selectionChange)="cambiarPeriodo()">
            <mat-option *ngFor="let ejercicio of [2018,2019]" [value]="ejercicio">
              {{ejercicio}}
            </mat-option>
          </mat-select>


          <mat-select placeholder="Mes" [(ngModel)]="mes" class="pad-left" (selectionChange)="cambiarPeriodo()">
            <mat-option *ngFor="let mes of meses" [value]="mes">
              {{mes.descripcion}}
            </mat-option>
          </mat-select>

        </div>
        <button mat-menu-item class="actions" (click)="generarRegistros()">
          <mat-icon>settings</mat-icon> Generar
        </button>
        <button mat-menu-item class="actions" (click)="autorizacionBatch()">
          <mat-icon>verified_user</mat-icon>
          Autorizar periodo
        </button>
        <button mat-menu-item class="actions" (click)="reporte()">
          <mat-icon>picture_as_pdf</mat-icon>
          Reporte
        </button>
      </sx-search-title>
      <mat-divider></mat-divider>
      <div class="mc-panel">
        <sx-mejores-clientes-table
          [clientes]="clientes$ | async" [search]="searchTerm"
          (select)="onSelect($event)"
          (suspender)="onSuspeneder($event)"></sx-mejores-clientes-table>
      </div>
    </mat-card>
  </ng-template>
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
  loading$: Observable<boolean>;
  ejercicio: number;
  mes: Mes;
  meses = Mes.MESES;

  searchTerm: string;
  constructor(
    private store: Store<fromStore.CobranzaState>,
    private dialogService: TdDialogService,
    private reportService: ReportesService
  ) {}

  ngOnInit() {
    const eje = Ejercicio.getAnterior(1);
    this.ejercicio = eje.ejercicio;
    this.mes = Mes.getMes(eje.mes);
    this.clientes$ = this.store.pipe(select(fromStore.getAllBonificaciones));
    this.loading$ = this.store.pipe(
      select(fromStore.getBonificacionesMCLoading)
    );
  }

  onSearch(event: string) {
    this.searchTerm = event;
  }

  cambiarPeriodo(event) {
    const periodo = { ejercicio: this.ejercicio, mes: this.mes.clave };
    this.store.dispatch(new fromStore.CambiarPeriodoBonificaciones(periodo));
  }

  onSelect(event: BonificacionMC) {
    console.log('Editando bonificacion: ', event);
    this.store.dispatch(
      new fromRoot.Go({ path: ['cobranza/con/mejoresClientes', event.id] })
    );
  }

  onSuspeneder(event: BonificacionMC) {
    console.log('Suspendiendo bonificacion: ', event);
  }

  autorizacionBatch() {
    this.dialogService
      .openConfirm({
        message: ` Periodo: ${this.mes} / ${this.ejercicio}`,
        title: `Autorizar los reguistros del periodo`,
        acceptButton: 'Aceptar',
        cancelButton: 'Cancelar'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.store.dispatch(new fromStore.AutorizarBatchBonificacion());
        }
      });
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
          this.store.dispatch(new fromStore.GenerarBonificacion());
        }
      });
  }

  reporte() {
    const params = {
      ejercicio: this.ejercicio,
      mes: this.mes.clave,
      mesNombre: this.mes.descripcion
    };
    this.reportService.runReport('bonificacionesMC/print', params);
  }
}
