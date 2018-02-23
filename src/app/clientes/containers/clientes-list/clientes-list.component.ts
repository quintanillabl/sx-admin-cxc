import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import { ClientesDataSource } from './clientes.datasource';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models';

@Component({
  selector: 'sx-clientes-list',
  templateUrl: './clientes-list.component.html',
  styles: [
    `
    .page {
      /* background-color: antiquewhite; */
      height: 100%;
    }
    .spinner-container {
      height: 360px;
      width: 390px;
      position: fixed;
    }
    .spinner-container mat-spinner {
      margin: 130px auto 0 auto;
    }
  `
  ]
})
export class ClientesListComponent implements OnInit {
  columns = ['clave', 'nombre', 'rfc'];
  dataSource: ClientesDataSource;

  selected: Cliente;

  constructor(
    private service: ClienteService,
    private router: Router,
    private store: Store<fromStore.ClientesState>
  ) {}

  ngOnInit() {
    this.dataSource = new ClientesDataSource(this.service);
    this.dataSource.loadClientes();
    this.store.select('clientes').subscribe(state => console.log(state));
  }

  onSelect(cliente: Cliente) {
    this.selected = cliente;
    this.router.navigate(['clientes', cliente.id]);
  }
}
