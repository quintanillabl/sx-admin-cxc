import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ITdDataTableColumn,
  TdDataTableSortingOrder,
  TdDataTableService,
  ITdDataTableSortChangeEvent,
  IPageChangeEvent
} from '@covalent/core';

@Component({
  selector: 'sx-socios-table',
  templateUrl: './socios-table.component.html',
  styles: [
    `
    mat-row .seleted {
      background-color: aquamarine;
    }
    .hover {
      background-color: azure;
    }
  `
  ]
})
export class SociosTableComponent implements OnInit {
  columns: ITdDataTableColumn[] = [
    { name: 'nombre', label: 'Nombre', sortable: true },
    { name: 'direccionLabel', label: 'Dirección' },
    { name: 'clave', label: 'Clave', filter: true, sortable: true, width: 200 }
  ];

  @Input() data: any[] = [];

  @Output() select = new EventEmitter();

  @Input() selectable = false;
  @Input() multiple = false;

  filteredData: any[] = this.data;
  filteredTotal: number = this.data.length;

  searchTerm: string = '';
  fromRow: number = 1;
  currentPage: number = 1;
  pageSize: number = 50;
  sortBy: string = 'nombre';
  selectedRows: any[] = [];
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Ascending;

  constructor(private _dataTableService: TdDataTableService) {}

  ngOnInit() {
    this.filter();
  }

  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
    this.filter();
  }

  search(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filter();
  }

  page(pagingEvent: IPageChangeEvent): void {
    this.fromRow = pagingEvent.fromRow;
    this.currentPage = pagingEvent.page;
    this.pageSize = pagingEvent.pageSize;
    this.filter();
  }

  filter(): void {
    let newData: any[] = this.data;
    let excludedColumns: string[] = this.columns
      .filter((column: ITdDataTableColumn) => {
        return (
          (column.filter === undefined && column.hidden === true) ||
          (column.filter !== undefined && column.filter === false)
        );
      })
      .map((column: ITdDataTableColumn) => {
        return column.name;
      });
    newData = this._dataTableService.filterData(
      newData,
      this.searchTerm,
      true,
      excludedColumns
    );
    this.filteredTotal = newData.length;
    newData = this._dataTableService.sortData(
      newData,
      this.sortBy,
      this.sortOrder
    );
    newData = this._dataTableService.pageData(
      newData,
      this.fromRow,
      this.currentPage * this.pageSize
    );
    this.filteredData = newData;
  }
}
