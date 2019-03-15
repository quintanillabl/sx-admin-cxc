import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { finalize, catchError, tap } from 'rxjs/operators';

import { FacturasService, JuridicoService } from '../../services';
import { CuentaPorCobrar } from '../../models/cuentaPorCobrar';

import * as _ from 'lodash';
import { TdDialogService, TdLoadingService } from '@covalent/core';
import { MatDialog } from '@angular/material';
import { ToJuridicoDialogComponent } from 'app/cobros/components';
import { Juridico } from 'app/cobros/models';

@Component({
  selector: 'sx-juridicos',
  template: `
  <mat-card>
    <div layout layout-align="start center" flex class="pad-left-sm pad-right-sm filtros-panel">
      <span class="push-left-sm pad-left pad-right" flex>
        <span class="mat-title">Cuentas por cobrar en Jurídico</span>
      </span>
      <mat-form-field flex class="pad-left">
        <input matInput placeholder="Cliente" [(ngModel)]="filtro.nombre" (input)="search()" autocomplete="off">
      </mat-form-field>

      <mat-form-field flex class="pad-left">
        <input matInput type="number" placeholder="Factura" [(ngModel)]="filtro.documento" (input)="search()" autocomplete="off">
      </mat-form-field>
      <mat-form-field flex class="pad-left">
        <input matInput type="date" placeholder="Fecha ini" [(ngModel)]="filtro.fechaInicial" (input)="search()" autocomplete="off">
      </mat-form-field>
      <mat-form-field flex class="pad-left">
        <input matInput type="date" placeholder="Fecha fin" [(ngModel)]="filtro.fechaFinal" (input)="search()" autocomplete="off">
      </mat-form-field>
      <span>
        <button mat-icon-button [matMenuTriggerFor]="toolbarMenu">
          <mat-icon>more_vert</mat-icon>
        </button>
        <mat-menu #toolbarMenu="matMenu" >
          <button mat-menu-item (click)="load()">
            <mat-icon>refresh</mat-icon> Re cargar
          </button>
        </mat-menu>
        </span>
    </div>
    <mat-divider></mat-divider>
    <div class="juridicos-container" *tdLoading="'procesando'; strategy:'overlay'; color:'accent'">
      <sx-juridicos-table
      [data]="juridicos"
      [selectedRows]="selected">
      </sx-juridicos-table>
    </div>
  </mat-card>
  `,
  styles: [
    `
    .juridicos-container {
      min-height: 400px;
      max-height: 600px;
      overflow: auto;
    }
  `,
    `
   .filtros-panel {
     overflow: auto
   }
  `
  ]
})
export class JuridicosComponent implements OnInit {
  juridicos: Juridico[];

  selected: Juridico[] = [];

  cartera: { clave: string; descripcion: string };

  filtro: any = { max: 100, sort: 'traspaso', order: 'desc' };

  private procesando = false;

  constructor(
    private route: ActivatedRoute,
    private dialogService: TdDialogService,
    private loadingService: TdLoadingService,
    private juridicoService: JuridicoService
  ) {}

  ngOnInit() {
    this.route.parent.data.subscribe(data => {
      this.cartera = data.cartera;
      this.filtro.cartera = this.cartera.clave;
      this.load();
    });
  }

  load() {
    // this.juridicos$ = this.service.list(this.filtro);
    this.procesando = true;
    this.juridicoService
      .list(this.filtro)
      .pipe(finalize(() => (this.procesando = false)))
      .subscribe(res => {
        this.juridicos = res;
      });
    /*
    this.service
      .list(this.filtro)
      .pipe(finalize(() => (this.procesando = false)))
      .subscribe(res => (this.juridicos = res));
      */
  }

  search() {
    this.load();
  }
}
