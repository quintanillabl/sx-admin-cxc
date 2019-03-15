import {
  Component,
  OnInit,
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
  IPageChangeEvent
} from '@covalent/core';

@Component({
  selector: 'sx-juridicos-table',
  templateUrl: './juridicos-table.component.html',
  providers: [DatePipe, CurrencyPipe]
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class JuridicosTableComponent implements OnInit, OnChanges {
  columns: ITdDataTableColumn[] = [
    { name: 'nombre', label: 'Cliente', sortable: true, width: 250 },
    { name: 'cxc.tipo', label: 'Tipo', sortable: true, width: 60 },
    {
      name: 'cxc.documento',
      label: 'Docto',
      filter: true,
      sortable: true,
      width: 90
    },
    {
      name: 'cxc.fecha',
      label: 'Fecha',
      width: 110,
      format: date => this.datePipe.transform(date, 'dd/MM/yyyy')
    },
    {
      name: 'traspaso',
      label: 'Traspaso',
      width: 110,
      format: date => this.datePipe.transform(date, 'dd/MM/yyyy')
    },
    {
      name: 'importe',
      label: 'Total',
      width: 110,
      numeric: true,
      sortable: true,
      filter: true,
      format: value => this.currencyPipe.transform(value, 'USD')
    },
    {
      name: 'cxc.pagos',
      label: 'Pagos',
      numeric: true,
      sortable: true,
      width: 110,
      filter: true,
      format: value => this.currencyPipe.transform(value, 'USD')
    },
    {
      name: 'cxc.saldo',
      label: 'Saldo',
      width: 110,
      sortable: true,
      numeric: true,
      filter: true,
      format: value => this.currencyPipe.transform(value, 'USD')
    },
    {
      name: 'cxc.vencimiento',
      label: 'Vto',
      width: 110,
      format: date => this.datePipe.transform(date, 'dd/MM/yyyy')
    },
    {
      name: 'cxc.atraso',
      label: 'Atraso',
      width: 90
    },
    {
      name: 'comentario',
      label: 'Comentario',
      width: 300
    },
    {
      name: 'operaciones',
      label: '.',
      width: 110
    }
  ];

  @Input() data: any[] = [];

  @Output() selection = new EventEmitter();

  filteredData: any[] = this.data;
  filteredTotal: number = this.data.length;
  selectable = true;
  searchTerm = '';
  fromRow = 1;
  currentPage = 1;
  pageSize = 10;
  sortBy = 'fecha';

  @Input() selectedRows: any[] = [];
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

  constructor(
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe,
    private _dataTableService: TdDataTableService
  ) {}

  ngOnChanges(changes) {
    if (changes.data) {
      // console.log('Detectando cambios: ', changes.data.currentValue);
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
    let newData: any[] = this.data || [];
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
  }
}
