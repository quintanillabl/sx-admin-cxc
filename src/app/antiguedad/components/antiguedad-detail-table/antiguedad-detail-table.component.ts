import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'sx-antiguedad-detail-table',
  templateUrl: './antiguedad-detail-table.component.html',
  styles: [
    `
    .mat-table {
      overflow: auto;
      max-height: 400px;
    }
    .mat-row {
      cursor: pointer;
      max-height: 20px;
      font-size: 8px;
    }
  `
  ]
})
export class AntiguedadDetailTableComponent
  implements OnInit, OnChanges, AfterViewInit {
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  @Output() select = new EventEmitter();
  @Input() facturas = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
