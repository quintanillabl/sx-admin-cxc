import { Component, OnInit } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import {
  ITdDataTableColumn,
  TdDataTableSortingOrder,
  TdDataTableService,
  TdDialogService,
  TdLoadingService,
  ITdDataTableSortChangeEvent
} from '@covalent/core';

import { NotascxcService } from '../../services';
import { Cartera } from '../../models/cartera';

@Component({
  selector: 'sx-bonificaciones',
  templateUrl: './bonificaciones.component.html',
  styles: []
})
export class BonificacionesComponent implements OnInit {
  cartera: Cartera;

  columns: ITdDataTableColumn[] = [
    { name: 'serie', label: 'Serie', sortable: true, numeric: true, width: 70 },
    {
      name: 'folio',
      label: 'Folio',
      sortable: true,
      nested: true,
      numeric: true,
      width: 100
    },
    {
      name: 'fecha',
      label: 'Fecha',
      width: 100,
      format: date => this.datePipe.transform(date, 'dd/MM/yyyy')
    },
    {
      name: 'cliente.nombre',
      label: 'Cliente',
      numeric: false,
      nested: true,
      width: 300
    },
    { name: 'timbrado', label: 'Timbrado', numeric: false, width: 100 },
    {
      name: 'total',
      label: 'Total',
      numeric: true,
      format: value => this.currencyPipe.transform(value, 'USD')
    },
    {
      name: 'disponible',
      label: 'Disponible',
      numeric: true,
      format: value => this.currencyPipe.transform(value, 'USD')
    }
  ];

  data: any[] = [];
  filteredData: any[] = this.data;
  sortBy = 'folio';
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

  notas$: Observable<any[]>;
  term = '';

  constructor(
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe,
    private _dataTableService: TdDataTableService,
    private dialogService: TdDialogService,
    private loadingService: TdLoadingService,
    private service: NotascxcService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.parent.data.subscribe(data => {
      this.cartera = data.cartera;
      this.load();
    });
  }

  search(term) {
    this.term = term || '';
    this.load();
  }

  load() {
    this.notas$ = this.service
      .list({
        term: this.term,
        tipo: 'BONIFICACION',
        cartera: this.cartera.clave
      })
      .catch(error => this.handelError2(error));
  }

  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
    let newData: any[] = this.data;
    newData = this._dataTableService.sortData(
      newData,
      this.sortBy,
      this.sortOrder
    );
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
    return Observable.empty();
  }
}
