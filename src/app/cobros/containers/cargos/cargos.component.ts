import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';

import { NotaDeCargo } from '../../models/notaDeCargo';
import { NotadecargoService } from '../../services';
import { ITdDataTableColumn } from '@covalent/core';
import { Cartera } from '../../models/cartera';
import { MatDialog } from '@angular/material';
import { PeriodoDialogComponent } from '../../../_shared/components';
import { Periodo } from '../../../_core/models/periodo';

@Component({
  selector: 'sx-cargos',
  templateUrl: './cargos.component.html'
})
export class CargosComponent implements OnInit {
  cargos$: Observable<NotaDeCargo[]>;

  term = '';

  cartera: Cartera;

  columns: ITdDataTableColumn[] = [
    { name: 'folio', label: 'Folio', numeric: true, width: 100 },
    {
      name: 'fecha',
      label: 'Fecha',
      numeric: false,
      format: date => this.datePipe.transform(date, 'dd/MM/yyyy'),
      width: 90
    },
    {
      name: 'cliente.nombre',
      label: 'Cliente',
      sortable: true,
      numeric: false,
      nested: true
    },
    { name: 'cfdi', label: 'CFDI', numeric: false, sortable: false, width: 70 },
    {
      name: 'total',
      label: 'Total',
      sortable: true,
      numeric: false,
      format: value => this.currencyPipe.transform(value, 'USD'),
      width: 100
    }
  ];

  constructor(
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe,
    private router: Router,
    private route: ActivatedRoute,
    private service: NotadecargoService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.parent.data.subscribe(data => {
      this.cartera = data.cartera;
      this.load();
    });
  }

  load() {
    this.cargos$ = this.service.list({
      cartera: this.cartera.clave.toLowerCase(),
      term: this.term
    });
  }

  reporteDeNotasDeCargo() {
    const ref = this.dialog.open(PeriodoDialogComponent, {});
    ref.afterClosed().subscribe((periodo: Periodo) => {
      if (periodo) {
        // console.log('Periodo: ', periodo);
        // console.log('Cartera: ', this.cartera.clave);
        this.service
          .reporteDeNotasDeCargo(
            periodo.fechaInicial,
            periodo.fechaFinal,
            this.cartera.clave
          )
          .subscribe(
            res => {
              const blob = new Blob([res], {
                type: 'application/pdf'
              });
              // this.loadingService.resolve('saving');
              const fileURL = window.URL.createObjectURL(blob);
              window.open(fileURL, '_blank');
            },
            error2 => console.log(error2)
          );
      }
    });
  }

  search(term) {
    this.load();
  }

  handleError(error) {
    console.error(error);
    return of([]);
  }
}
