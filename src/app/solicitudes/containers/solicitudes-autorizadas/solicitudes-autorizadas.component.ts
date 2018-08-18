import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { SolicitudFormComponent } from '../../components';
import { SolicitudService } from '../../services/solicitud.service';
import { TdLoadingService } from '@covalent/core';

import { Observable, of } from 'rxjs';
import { finalize, delay, catchError } from 'rxjs/operators';

import { SolicitudDeDeposito } from '../../models';

@Component({
  selector: 'sx-solicitudes-autorizadas',
  templateUrl: './solicitudes-autorizadas.component.html'
})
export class SolicitudesAutorizadasComponent implements OnInit {
  solicitudes$: Observable<SolicitudDeDeposito[]>;
  term = '';
  constructor(
    private service: SolicitudService,
    private _loadingService: TdLoadingService
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this._loadingService.register('loading');
    this.solicitudes$ = this.service
      .autorizadas({ term: this.term, cartera: 'CRE' })
      .pipe(
        finalize(() => this._loadingService.resolve('loading')),
        catchError(err => this.handleError(err))
      );
  }

  onSearch(term) {
    this.term = term;
    this.load();
  }

  handleError(error) {
    console.error(error);
    return of([]);
  }
}
