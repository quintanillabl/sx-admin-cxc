import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'sx-antiguedad-detail-table',
  template: `
    <mat-table [dataSource]="dataSource">
      <ng-container matColumnDef="sucursal">
        <mat-header-cell *matHeaderCellDef>Sucursal</mat-header-cell>
        <mat-cell *matCellDef="let cxc">{{cxc.sucursal}}</mat-cell>
      </ng-container>
      <ng-container matColumnDef="nombre">
        <mat-header-cell *matHeaderCellDef>Cliente</mat-header-cell>
        <mat-cell *matCellDef="let cxc">{{cxc.cliente.clave}}</mat-cell>
      </ng-container>
      <ng-container matColumnDef="tipo">
        <mat-header-cell *matHeaderCellDef>Tipo</mat-header-cell>
        <mat-cell *matCellDef="let cxc">{{cxc.tipo}}</mat-cell>
      </ng-container>
      <ng-container matColumnDef="documento">
        <mat-header-cell *matHeaderCellDef>Docto</mat-header-cell>
        <mat-cell *matCellDef="let cxc">{{cxc.documento}}</mat-cell>
      </ng-container>
      <ng-container matColumnDef="fecha">
        <mat-header-cell *matHeaderCellDef>Fecha</mat-header-cell>
        <mat-cell *matCellDef="let cxc">{{cxc.fecha | date: 'dd/MM/yyyy'}}</mat-cell>
      </ng-container>
      <ng-container matColumnDef="vencimiento">
        <mat-header-cell *matHeaderCellDef>Vto</mat-header-cell>
        <mat-cell *matCellDef="let cxc">{{cxc.vencimiento | date: 'dd/MM/yyyy'}}</mat-cell>
      </ng-container>
      <ng-container matColumnDef="plazo">
        <mat-header-cell *matHeaderCellDef>Plazo</mat-header-cell>
        <mat-cell *matCellDef="let cxc">{{cxc.plazo }}</mat-cell>
      </ng-container>
      <ng-container matColumnDef="atraso">
        <mat-header-cell *matHeaderCellDef>Atraso</mat-header-cell>
        <mat-cell *matCellDef="let cxc">{{cxc.atraso}}</mat-cell>
      </ng-container>
      <ng-container matColumnDef="total">
        <mat-header-cell *matHeaderCellDef>Total</mat-header-cell>
        <mat-cell *matCellDef="let cxc">{{cxc.total | currency}}</mat-cell>
      </ng-container>
      <ng-container matColumnDef="pagos">
        <mat-header-cell *matHeaderCellDef>Pagos</mat-header-cell>
        <mat-cell *matCellDef="let cxc">{{cxc.pagos | currency}}</mat-cell>
      </ng-container>
      <ng-container matColumnDef="saldo">
        <mat-header-cell *matHeaderCellDef>Saldo</mat-header-cell>
        <mat-cell *matCellDef="let cxc">{{cxc.saldo | currency}}</mat-cell>
      </ng-container>
      <mat-header-row *matHeaderRowDef="displayColumns"></mat-header-row>
      <mat-row *matRowDef="let cxc; columns: displayColumns" (click)="onSelect(cxc)"></mat-row>
    </mat-table>
  `
})
export class AntiguedadDetailTableComponent implements OnInit, OnChanges {
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  @Output() select = new EventEmitter();
  @Input() facturas = [];

  displayColumns = [
    'sucursal',
    'tipo',
    'documento',
    'fecha',
    'vencimiento',
    'plazo',
    'atraso',
    'total',
    'pagos',
    'saldo'
  ];

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.facturas || changes.facturas.currentValue) {
      this.dataSource.data = changes.facturas.currentValue;
    }
  }

  onSelect(event) {
    console.log('Det: ', event);
  }
}
