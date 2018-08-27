
import {of as observableOf,  Observable ,  BehaviorSubject } from 'rxjs';

import {switchMap, map, debounceTime, distinctUntilChanged,  catchError } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, CurrencyPipe } from '@angular/common';

import { ITdDataTableColumn } from '@covalent/core';

import { Cliente } from '../../models';
import { ClienteService } from '../../services';
import { ReportesService } from '../../../reportes/services';

@Component({
  selector: 'sx-cliente-facturas',
  templateUrl: './cliente-facturas.component.html',
  providers: [DatePipe, CurrencyPipe]
})
export class ClienteFacturasComponent implements OnInit {
  cliente$: Observable<Cliente>;
  facturas$: Observable<any>;
  selectedRows: any[] = [];
  term = '';
  search$ = new BehaviorSubject<string>('');

  columns: ITdDataTableColumn[] = [
    { name: 'sucursal', label: 'Sucursal', sortable: true, width: 120 },
    { name: 'tipo', label: 'Tipo', sortable: true, width: 60 },
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
      format: date => this.datePipe.transform(date, 'dd/MM/yyyy')
    },
    {
      name: 'total',
      label: 'Total',
      numeric: true,
      sortable: true,
      filter: true,
      format: value => this.currencyPipe.transform(value, 'USD')
    },
    {
      name: 'pagos',
      label: 'Pagos',
      numeric: true,
      sortable: true,
      filter: true,
      format: value => this.currencyPipe.transform(value, 'USD')
    },
    {
      name: 'saldo',
      label: 'Saldo',
      sortable: true,
      numeric: true,
      filter: true,
      format: value => this.currencyPipe.transform(value, 'USD')
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe,
    private service: ClienteService,
    private reportService: ReportesService
  ) {}

  ngOnInit() {
    this.cliente$ = this.route.parent.data.pipe(map(data => data.cliente));
    this.search$.pipe(
      debounceTime(400),
      distinctUntilChanged(),)
      .subscribe(term => {
        this.term = term;
        this.load();
      });
  }

  load() {
    this.facturas$ = this.cliente$.pipe(switchMap(cliente => {
      return this.service
        .facturas(cliente, { term: this.term })
        .pipe(catchError(err => observableOf(err)));
    }));
  }

  onSearch(term) {
    this.search$.next(term);
  }

  generarPagare() {
    if (this.selectedRows.length > 0) {
      const factura = this.selectedRows[0];
      this.reportService.runReport('cuentasPorCobrar/generarPagare', {
        id: factura.id
      });
    }
  }
}
