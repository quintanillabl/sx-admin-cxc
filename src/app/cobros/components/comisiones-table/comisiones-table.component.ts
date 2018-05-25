import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit
} from '@angular/core';

import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'sx-comisiones-table',
  templateUrl: './comisiones-table.component.html',
  styleUrls: ['./comisiones-table.component.scss']
})
export class ComisionesTableComponent
  implements OnInit, OnChanges, AfterViewInit {
  dataSource = new MatTableDataSource<any>([]);

  @Input() comisiones: any[];

  @Output() select = new EventEmitter();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayColumns = [
    'cliente',
    'clave',
    'tipo',
    'documento',
    'fechaDocumento',
    'total',
    'pagoComisionable',
    'comisionImporte'
  ];
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.comisiones && changes.comisiones.currentValue) {
      this.dataSource.data = changes.comisiones.currentValue;
    }
  }
}
