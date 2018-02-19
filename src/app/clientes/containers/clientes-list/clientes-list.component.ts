import { Component, OnInit } from '@angular/core';

import { ClientesDataSource } from './clientes.datasource';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models';

@Component({
  selector: 'sx-clientes-list',
  templateUrl: './clientes-list.component.html',
  styles: [`
    .page {
      /* background-color: antiquewhite; */
      height: 100%;
    }

    mat-row .seleted {
      background-color: aquamarine;
    }

    .spinner-container {
      height: 360px;
      width: 390px;
      position: fixed;
    }

    .spinner-container mat-spinner {
      margin: 130px auto 0 auto;
    }

    .hover {
      background-color: azure;
    }

    /*mat-row:nth-child(even) {
      background-color: white;
    }

    mat-row:nth-child(odd) {
      background-color: rgba(7, 56, 48, 0.04);
    }*/
  `]
})
export class ClientesListComponent implements OnInit {

  columns = ['clave', 'nombre', 'rfc'];
  dataSource: ClientesDataSource;

  selected: Cliente;

  constructor(private  service: ClienteService) { }

  ngOnInit() {
    this.dataSource = new ClientesDataSource(this.service);
    this.dataSource.loadClientes();
  }

  selectRow(cliente) {
    this.selected = cliente;
    console.log('Selected cliente: ', this.selected);
  }

}
