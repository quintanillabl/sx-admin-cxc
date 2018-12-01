import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, CurrencyPipe } from '@angular/common';

import { Observable, empty } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';

import { NotascxcService } from '../../services/notascxc.service';
import {
  ITdDataTableColumn,
  TdDataTableSortingOrder,
  TdDataTableService,
  TdDialogService,
  TdLoadingService,
  ITdDataTableSortChangeEvent,
  IPageChangeEvent
} from '@covalent/core';

@Component({
  selector: 'sx-devoluciones',
  templateUrl: './devoluciones.component.html',
  styles: []
})
export class DevolucionesComponent implements OnInit {
  procesando = false;

  private _pendientes = true;

  cartera: { clave: string; descripcion: string };

  term = '';

  columns: ITdDataTableColumn[] = [
    {
      name: 'documento',
      label: 'RMD',
      sortable: true,
      numeric: true,
      width: 70
    },
    {
      name: 'nota',
      label: 'Nota',
      sortable: true,
      nested: true,
      hidden: !this.pendientes,
      numeric: true,
      width: 150
    },
    {
      name: 'fecha',
      label: 'Fecha',
      width: 100,
      format: date => this.datePipe.transform(date, 'dd/MM/yyyy')
    },
    {
      name: 'sucursal.nombre',
      label: 'Sucursal',
      numeric: false,
      nested: true,
      width: 150
    },
    {
      name: 'venta.cliente.nombre',
      label: 'Cliente',
      numeric: false,
      width: 300
    },
    { name: 'factura', label: 'Factura', numeric: true, width: 150 },
    {
      name: 'cobro.fecha',
      label: 'Atendida',
      nested: true,
      numeric: false,
      hidden: true,
      width: 100,
      format: date => this.datePipe.transform(date, 'dd/MM/yyyy')
    },
    {
      name: 'venta.moneda',
      label: 'Mon',
      numeric: false,
      width: 100
    },
    {
      name: 'venta.tipoDeCambio',
      label: 'T.C.',
      numeric: true,
      width: 100
    },
    {
      name: 'total',
      label: 'Total',
      numeric: true,
      format: value => this.currencyPipe.transform(value, 'USD')
    }
  ];

  data: any[] = [];
  filteredData: any[] = this.data;
  filteredTotal: number = this.data.length;

  searchTerm = '';
  fromRow = 1;
  currentPage = 1;
  pageSize = 20;
  sortBy = 'documento';
  selectedRows: any[] = [];
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;
  selectable = true;

  constructor(
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe,
    private _dataTableService: TdDataTableService,
    private service: NotascxcService,
    private dialogService: TdDialogService,
    private loadingService: TdLoadingService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.cartera = route.parent.parent.snapshot.data.cartera;
  }

  ngOnInit() {
    this.route.parent.data.subscribe(data => {
      this.cartera = data.cartera;
      this.load();
    });
  }

  load() {
    this.loadingService.register('procesando');
    this.service
      .buscarRmd({
        pendientes: this.pendientes,
        cartera: this.cartera.clave,
        term: this.term
      })
      .pipe(
        tap(() => (this.procesando = true)),
        catchError(error => this.handelError2(error)),
        finalize(() => this.loadingService.resolve('procesando'))
      )
      .subscribe(res => {
        this.data = res;
        this.filteredData = res;
        this.filteredTotal = res.length;
        console.log('Data: ', res);
      });
  }

  search(term) {
    if (term !== undefined) {
      this.term = term;
      this.load();
    }
  }

  atender() {
    console.log('Generando nota de devolucin: ', this.selectedRows.length);
    if (this.selectedRows.length) {
      const ref = this.dialogService.openConfirm({
        title: 'Nota de crédito',
        message: `Generar nota de crédito a ${
          this.selectedRows.length
        } devoluciones seleccionadas?`,
        acceptButton: 'Aceptar',
        cancelButton: 'Cancelar'
      });
      ref.afterClosed().subscribe(val => {
        if (val) {
          // console.log('Generando nota de devolucion: ', this.selectedRows[0]);
          this.generarNota(this.selectedRows[0]);
        }
      });
    }
  }

  generarNota(nota) {
    this.service
      .generarNotaDeDevolucion(nota, this.cartera.clave)
      .pipe(
        tap(() => (this.procesando = true)),
        catchError(error => this.handelError2(error)),
        finalize(() => (this.procesando = false))
      )
      .subscribe((res: any) => {
        console.log('Notas generadas: ', res);
        this.router.navigate(['show', res.id], { relativeTo: this.route });
      });
  }

  timbrar(nota) {
    this.loadingService.register('procesando');
    this.service
      .timbrar(nota)
      .pipe(
        finalize(() => this.loadingService.resolve('procesando')),
        catchError(error => this.handelError2(error))
      )
      .subscribe(res => {
        console.log('Nota timbrada: ', res);
        // this.pendientes = false
      });
  }

  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
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
  }

  get pendientes() {
    return this._pendientes;
  }
  set pendientes(val) {
    this._pendientes = val;
    this.load();
  }

  handelError2(response) {
    const message = response.error
      ? response.error.message
      : 'Error en servidor';
    const ref = this.dialogService.openAlert({
      title: `Error ${response.status}`,
      message: message,
      closeButton: 'Cerrar'
    });
    return empty();
  }
}
