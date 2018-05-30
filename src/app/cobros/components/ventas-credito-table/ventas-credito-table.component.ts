import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ViewChild
} from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import {
  TdDataTableSortingOrder,
  ITdDataTableColumn,
  TdDataTableService,
  ITdDataTableSortChangeEvent,
  IPageChangeEvent,
  TdDataTableComponent
} from '@covalent/core';

@Component({
  selector: 'sx-ventas-credito-table',
  templateUrl: './ventas-credito-table.component.html',
  providers: [DatePipe, CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VentasCreditoTableComponent implements OnInit, OnChanges {
  columns: ITdDataTableColumn[] = [
    {
      name: 'nombre',
      label: 'Nombre',
      filter: true,
      sortable: true,
      width: 300
    },
    {
      name: 'cobrador.sw2',
      label: 'Cobrador',
      filter: true,
      sortable: true,
      width: 60
    },
    {
      name: 'sucursal',
      label: 'Sucursal',
      sortable: true,
      filter: true,
      width: 150
    },
    {
      name: 'documento',
      label: 'Docto',
      filter: true,
      sortable: true,
      width: 60
    },
    {
      name: 'fecha',
      label: 'Fecha',
      sortable: false,
      filter: true,
      format: date => this.datePipe.transform(date, 'dd/MM/yyyy')
    },
    {
      name: 'fechaRecepcionCxc',
      label: 'Recibida'
    },
    {
      name: 'revisada',
      label: 'Revisada'
    },
    {
      name: 'revision',
      label: 'Revisión'
    },
    {
      name: 'vencimiento',
      label: 'Vencimiento',
      sortable: true,
      filter: true,
      nested: true,
      format: date => this.datePipe.transform(date, 'dd/MM/yyyy')
    },
    /*{
      name: 'fechaRevisionCxc',
      label: 'F. Rev CxC',
      nested: true,
      format: date => this.datePipe.transform(date, 'dd/MM/yyyy')
    },*/
    {
      name: 'fechaRevision',
      label: 'F. Rev',
      nested: true,
      format: date => this.datePipe.transform(date, 'dd/MM/yyyy')
    },

    {
      name: 'reprogramarPago',
      label: 'Rep. Pago',
      nested: true,
      format: date => this.datePipe.transform(date, 'dd/MM/yyyy')
    },
    {
      name: 'saldo',
      label: 'Saldo',
      sortable: true,
      numeric: true,
      filter: true,
      width: 150,
      format: value => this.currencyPipe.transform(value, 'USD')
    },
    {
      name: 'atraso',
      label: 'Atraso',
      sortable: true,
      numeric: true,
      filter: true
    }
  ];

  @Input() data: any[] = [];
  @Output() selection = new EventEmitter();
  @ViewChild(TdDataTableComponent) dataTable: TdDataTableComponent;

  filteredData: any[] = this.data;
  filteredTotal: number = this.data.length;
  selectable = true;
  searchTerm = '';
  fromRow = 1;
  currentPage = 1;
  pageSize = 100;
  sortBy = 'nombre';
  @Input() selectedRows: any[] = [];
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Ascending;

  constructor(
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe,
    private _dataTableService: TdDataTableService
  ) {}

  ngOnChanges(changes) {
    if (changes.data) {
      this.filter();
    }
  }
  ngOnInit() {
    this.filter();
  }

  selectionChange() {
    this.selection.emit(this.selectedRows);
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
    const excludedColumns: string[] = this.columns
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

    this.dataTable.refresh();
  }
}
