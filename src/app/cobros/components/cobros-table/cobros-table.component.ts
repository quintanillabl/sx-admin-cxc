import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

import { Cobro } from '../../models/cobro';
import { PagosUtils } from 'app/_core/services/pagos-utils.service';

import * as _ from 'lodash';

import { SelectionModel } from '@angular/cdk/collections';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sx-cobros-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cobros-table.component.html',
  styleUrls: ['./cobros-table.component.scss']
})
export class CobrosTableComponent implements OnInit, OnChanges, OnDestroy {
  @Input() cobros: Cobro[] = [];
  @Input() filter: string;
  dataSource = new MatTableDataSource<Cobro>([]);

  displayColumns = [
    'select',
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

  @Input() allowMultiSelection = true;
  @Input() selection = new SelectionModel<Cobro>(this.allowMultiSelection, []);
  subscription: Subscription;

  constructor(private pagosUtils: PagosUtils) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.subscription = this.selection.onChange.subscribe(res =>
      this.select.next(this.selection.selected)
    );
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
      this.selection.clear();
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.filteredData.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.filteredData.forEach(row => this.selection.select(row));
  }
}
