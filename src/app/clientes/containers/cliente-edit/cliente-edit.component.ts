import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromClientes from '../../store/actions/clientes.action';

import { Cliente } from '../../models/cliente';

import { Observable } from 'rxjs';

@Component({
  selector: 'sx-cliente-edit',
  template: `
  <sx-cliente-form [cliente]="cliente$ | async"
    (update)="onUpdate($event)">
  </sx-cliente-form>
  `
})
export class ClienteEditComponent implements OnInit {
  cliente$: Observable<Cliente>;
  constructor(private store: Store<fromStore.ClientesState>) {}

  ngOnInit() {
    this.cliente$ = this.store.select(fromStore.getSelectedCliente);
  }

  onUpdate(event: Cliente) {
    // console.log('Salvando cliente: ', event);
    this.store.dispatch(new fromClientes.UpdateCliente(event));
  }
}
