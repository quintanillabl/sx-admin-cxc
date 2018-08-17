import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import * as fromRoot from 'app/store';
import * as fromStore from '../../store';
import * as fromClientes from '../../store/actions/clientes.action';

import { Cliente } from '../../models/cliente';

@Component({
  selector: 'sx-clientes',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './clientes.component.html',
  styles: [
    `
    .table-container {
      min-height: 300px;
    }
  `
  ]
})
export class ClientesComponent implements OnInit {
  clientes$: Observable<Cliente[]>;
  constructor(private store: Store<fromStore.ClientesState>) {}

  ngOnInit() {
    this.clientes$ = this.store.select(fromStore.getAllClientes);
  }

  onSelect(event: Cliente) {
    this.store.dispatch(new fromRoot.Go({ path: ['clientes', event.id] }));
  }

  onSearch(event: string) {
    this.store.dispatch(new fromClientes.SearchClientesAction(event));
  }
}
