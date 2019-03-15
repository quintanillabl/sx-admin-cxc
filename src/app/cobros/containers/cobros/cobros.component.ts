import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromActions from '../../store/actions/cobros.actions';

import { Observable, Subject } from 'rxjs';

import { Cobro, CobroFilter } from '../../models/cobro';
import { Cartera } from '../../models/cartera';
import { TdDialogService } from '@covalent/core';
import { Cliente } from '../../../clientes/models';

@Component({
  selector: 'sx-cobros',
  templateUrl: './cobros.component.html'
})
export class CobrosComponent implements OnInit {
  cobros$: Observable<Cobro[]>;
  search$ = new Subject();
  filter = '';
  cobrosFilter$: Observable<CobroFilter>;
  cartera$: Observable<Cartera>;
  selected: Cobro[] = [];

  constructor(
    private store: Store<fromStore.CobranzaState>,
    private dialogService: TdDialogService
  ) {}

  ngOnInit() {
    this.cobros$ = this.store.pipe(select(fromStore.getAllCobros));
    this.cartera$ = this.store.pipe(select(fromStore.getCartera));
    this.filter = localStorage.getItem('sx-cxc.cre.cobros.filter');
    this.cobrosFilter$ = this.store.pipe(select(fromStore.getCobrosFilter));
  }

  onSearch(event: string) {
    if (event.length > 0) {
      localStorage.setItem('sx-cxc.cre.cobros.filter', event);
    } else {
      localStorage.removeItem('sx-cxc.cre.cobros.filter');
    }
    this.filter = event;
  }

  onFilter(event: CobroFilter) {
    this.store.dispatch(new fromActions.SetCobrosFilter(event));
  }

  onSelect(event) {
    this.selected = event;
  }

  isRecibosBatch() {
    return (
      this.selected.length > 0 &&
      !this.selected.find(item => item.disponible > 0) &&
      !this.selected.find(item => item.recibo != null)
    );
  }

  onRecibosBatch(cobros: Cobro[]) {
    this.confirm(
      'Recibo electrónico de pago',
      `Generar CFDI para ${cobros.length} cobros`
    ).subscribe(res => {
      if (res) {
        this.store.dispatch(new fromActions.TimbradoBatch({ cobros }));
      }
    });
  }

  isEnvioBatch() {
    return (
      this.selected.length > 0 &&
      this.selected.find(item => item.recibo !== null)
    );
  }

  envioBatch(cobros: Cobro[]) {
    const selected: Cobro[] = cobros.filter(item => item.recibo);
    this.confirm(
      'Envío de correo electrónico',
      `Enviar ${selected.length} recibos`
    ).subscribe(res => {
      if (res) {
        this.store.dispatch(new fromActions.EnvioDeReciboBatch({ cobros }));
      }
    });
  }

  confirm(title: string, message: string): Observable<any> {
    const acceptButton = 'Aceptar';
    const cancelButton = 'Cancelar';
    return this.dialogService
      .openConfirm({
        title,
        message,
        acceptButton,
        cancelButton
      })
      .afterClosed();
  }

  reload() {
    this.store.dispatch(new fromStore.LoadCobros());
  }
}
