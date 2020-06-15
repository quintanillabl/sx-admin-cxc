import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';

import { Store } from '@ngrx/store';
import * as fromRoot from 'app/store';
import * as fromStore from '../../store';

import { Cliente } from '../../models';
import { ClienteCreditoFormComponent } from '../../components';
import { CreditoService } from '../../services';
import * as fromClientes from '../../store/actions/clientes.action';

@Component({
  selector: 'sx-cliente-info',
  templateUrl: `./cliente-info.component.html`
})
export class ClienteInfoComponent implements OnInit {
  cliente$: Observable<Cliente>;

  constructor(
    private dialog: MatDialog,
    private creditoService: CreditoService,
    private store: Store<fromStore.ClientesState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cliente$ = this.store.select(fromStore.getSelectedCliente);
  }

  onEditCliente(event: Cliente) {
    this.store.dispatch(
      new fromRoot.Go({
        path: ['../../edit', event.id],
        query: {},
        extras: { relativeTo: this.route }
      })
    );
  }

  onEditCredito(cliente: Cliente) {
    const dialogRef = this.dialog.open(ClienteCreditoFormComponent, {
      data: { cliente: cliente },
      height: '500px',
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        /*
        const target = {
          id: cliente.id,
          credito: res
        };
        this.store.dispatch(new fromClientes.UpdateCliente(target));
        */
        const { telefonos, ...bean } = cliente;
        const target2 = {
          id: cliente.id,
          ...bean,
          credito: res
        };
        console.log('Actualizando cliente: ', target2);
        this.store.dispatch(new fromClientes.UpdateCliente(target2));



        /*
        this.creditoService.update(cliente, res).subscribe(rr => {
          console.log(rr);
        });
        */
      }
    });
  }
}
