import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

import { Cobro } from '../../models/cobro';
import { PagosUtils } from 'app/_core/services/pagos-utils.service';

import * as _ from 'lodash';

@Component({
  selector: 'sx-cobros-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cobros-table.component.html',
  styleUrls: ['./cobros-table.component.scss']
})
export class CobrosTableComponent implements OnInit, OnChanges {
  @Input() cobros: Cobro[] = [];
  @Input() filter: string;
  dataSource = new MatTableDataSource<Cobro>([]);

  displayColumns = [
    'nombre',
    'sucursal',
    'tipo',
    'fecha',
    'formaDePago',
    'referencia',
    'moneda',
    'importe',
    'aplicado',
    'recibo',
    'disponible'
  ];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output() print = new EventEmitter();
  @Output() select = new EventEmitter<Cobro[]>();
  @Output() edit = new EventEmitter<Cobro>();
  @Output() delete = new EventEmitter<Cobro>();

  constructor(private pagosUtils: PagosUtils) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.cobros && changes.cobros.currentValue) {
      this.dataSource.data = changes.cobros.currentValue;
    }
    if (changes.filter) {
      const text = changes.filter.currentValue
        ? changes.filter.currentValue
        : '';
      this.dataSource.filter = text.toLowerCase();
    }
  }
  toogleSelect(event: Cobro) {
    event.selected = !event.selected;
    const data = this.cobros.filter(item => item.selected);
    this.select.emit([...data]);
  }

  onEdit($event: Event, row) {
    $event.preventDefault();
    this.edit.emit(row);
  }

  getTotal(property: string) {
    return _.sumBy(this.dataSource.filteredData, property);
  }

  getFormaDePago(cobro: Cobro) {
    return this.pagosUtils.slim(cobro.formaDePago);
  }
}
