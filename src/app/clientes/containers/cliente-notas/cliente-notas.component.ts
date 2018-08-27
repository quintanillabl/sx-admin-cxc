
import {of as observableOf,  Observable } from 'rxjs';

import {switchMap, map,  catchError } from 'rxjs/operators';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, CurrencyPipe } from '@angular/common';

import { Cliente } from '../../models';
import { ClienteService } from '../../services';
import { ITdDataTableColumn } from '@covalent/core';

@Component({
  selector: 'sx-cliente-notas',
  templateUrl: 'cliente-notas.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClienteNotasComponent implements OnInit {
  cliente$: Observable<Cliente>;
  notas$: Observable<any[]>;
  term = '';
  tipo: any;

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: ClienteService,
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe
  ) {}

  ngOnInit() {
    this.cliente$ = this.route.parent.data.pipe(map(data => data.cliente));
    this.tipo = this.route.snapshot.data.tipo;
    this.load();
  }

  load() {
    this.notas$ = this.cliente$.pipe(switchMap(cliente => {
      return this.service
        .notas(cliente, { term: this.term, tipo: this.tipo })
        .pipe(catchError(err => observableOf(err)));
    }));
  }

  onSelect(nota) {
    const url = `/cobranza/cre/${
      this.tipo === 'DEVOLUCION' ? 'devoluciones' : 'bonificaciones'
    }/show`;
    this.router.navigate([url, nota.id]);
  }
}
