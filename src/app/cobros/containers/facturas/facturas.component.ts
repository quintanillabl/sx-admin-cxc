import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { finalize, catchError } from 'rxjs/operators';

import { FacturasService } from '../../services';
import { CuentaPorCobrar } from '../../models/cuentaPorCobrar';

import * as _ from 'lodash';
import { TdDialogService, TdLoadingService } from '@covalent/core';

@Component({
  selector: 'sx-factras',
  template: `
  <mat-card>
    <div layout layout-align="start center" flex class="pad-left-sm pad-right-sm filtros-panel">
      <span class="push-left-sm pad-left pad-right" flex>
        <span class="mat-title">Registro de facturas</span>
      </span>
      <mat-form-field flex class="pad-left">
        <input matInput placeholder="Cliente" [(ngModel)]="filtro.nombre" (input)="search()" autocomplete="off">
      </mat-form-field>
      <mat-form-field flex class="pad-left">
        <input matInput placeholder="Sucursal" [(ngModel)]="filtro.sucursal" (input)="search()" autocomplete="off">
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
          <button mat-menu-item (click)="envioBatch()" [disabled]="selected.length<= 0">
            <mat-icon>email</mat-icon> Enviar
          </button>
        </mat-menu>
        </span>
    </div>
    <mat-divider></mat-divider>
    <div class="facturas-container" *tdLoading="'procesando'; strategy:'overlay'; color:'accent'">
      <sx-facturas-table2 [data]="facturas$ | async" [selectedRows]="selected"
      (print)="printCfdi($event)"
      (download)="downloadCfdi($event)">
      </sx-facturas-table2>
    </div>
  </mat-card>
  `,
  styles: [
    `
    .facturas-container {
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
export class FacturasComponent implements OnInit {
  facturas$: Observable<CuentaPorCobrar[]>;

  selected: CuentaPorCobrar[] = [];

  cartera: { clave: string; descripcion: string };

  filtro: any = {};

  constructor(
    private service: FacturasService,
    private route: ActivatedRoute,
    private dialogService: TdDialogService,
    private loadingService: TdLoadingService
  ) {}

  ngOnInit() {
    this.route.parent.data.subscribe(data => {
      this.cartera = data.cartera;
      this.filtro.cartera = this.cartera.clave;
      this.load();
    });
  }

  load() {
    this.facturas$ = this.service.list(this.filtro);
  }

  search() {
    this.load();
  }

  printCfdi(event: CuentaPorCobrar) {
    const cfdi = event.cfdi;
    // console.log('Imprimiento cfdi: ', cfdi);
    this.service
      .imprimirCfdi(cfdi)
      .pipe(finalize(() => console.log('End')))
      .subscribe(
        res => {
          const blob = new Blob([res], {
            type: 'application/pdf'
          });
          const fileURL = window.URL.createObjectURL(blob);
          window.open(fileURL, '_blank');
        },
        error => console.log('Error ', error)
      );
  }

  downloadCfdi(event: CuentaPorCobrar) {
    const cfdi: any = event.cfdi;
    this.service
      .descargarXml(cfdi)
      .pipe(finalize(() => console.log('End')))
      .subscribe(
        res => {
          const blob = new Blob([res], {
            type: 'text/xml'
          });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.style.visibility = 'hidden';
          link.setAttribute('style', 'display: none');
          link.setAttribute('href', url);
          link.setAttribute('download', cfdi.fileName);
          link.href = url;
          link.download = cfdi.fileName;
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(link);
        },
        error => console.log('Error ', error)
      );
  }

  envioBatch() {
    const first = _.find(this.selected, (item: any) => item.cliente.nombre);
    const cliente = first.cliente;
    const filtered = _.filter(
      this.selected,
      (item: any) => item.cliente.id === cliente.id
    );
    this.dialogService
      .openPrompt({
        title: `Enviar ${filtered.length} factura(s) electrónica(s) a `,
        message: `${cliente.nombre} ${
          cliente.cfdiMailValidado ? '' : '(Email Sin Validar)'
        }: `,
        value: cliente.cfdiMail,
        acceptButton: 'Aceptar',
        cancelButton: 'Cancelar'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.loadingService.register('procesando');
          this.service
            .envioBatch(cliente, filtered, res)
            .pipe(finalize(() => this.loadingService.resolve('procesando')))
            .subscribe(response => {
              // console.log('Response: ', response);
              if (response.status) {
                this.dialogService
                  .openAlert({
                    title: 'Envio batch',
                    message: 'Error en el envio de correos ' + response.status,
                    closeButton: 'Cerrar'
                  })
                  .afterClosed()
                  .subscribe(() => {});
              } else {
                this.dialogService
                  .openAlert({
                    title: 'Envio batch',
                    message: 'Correo enviado satisfactoriamente',
                    closeButton: 'Cerrar'
                  })
                  .afterClosed()
                  .subscribe(() => {});
              }
            });
        }
      });
  }
}
