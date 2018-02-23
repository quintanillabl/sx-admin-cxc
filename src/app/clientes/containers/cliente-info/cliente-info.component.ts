import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';

import { Cliente } from '../../models';
import { ClienteCreditoFormComponent } from '../../components';
import { ClienteService, CreditoService } from '../../services';

@Component({
  selector: 'sx-cliente-info',
  templateUrl: `./cliente-info.component.html`
})
export class ClienteInfoComponent implements OnInit {
  cliente: Cliente;
  cliente$: Observable<Cliente>;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private clienteService: ClienteService,
    private creditoService: CreditoService
  ) {}

  ngOnInit() {
    this.route.parent.data.subscribe(data => {
      this.cliente = data.cliente;
    });

    this.cliente$ = this.route.parent.data.map(data => data.cliente);
  }

  onEditCliente(cliente: Cliente) {}

  onEditCredito(cliente: Cliente) {
    const dialogRef = this.dialog.open(ClienteCreditoFormComponent, {
      data: { cliente: cliente },
      height: '500px',
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        console.log('Actualizando credito: ', res);
        this.creditoService
          .update(cliente, res)
          .subscribe(rr => console.log(rr));
      }
    });
  }
}
