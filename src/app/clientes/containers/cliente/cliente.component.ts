import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TdMediaService } from '@covalent/core';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';

import { Cliente } from '../../models';
import { FechaDialogComponent } from '../../../_shared/components';
import { CobrosService } from '../../../cobros/services';
import { MatDialog } from '@angular/material';
import { ClienteService } from '../../services';
import { EstadoDeCuentaComponent } from '../estado-de-cuenta/estado-de-cuenta.component';

@Component({
  selector: 'sx-cliente',
  templateUrl: './cliente.component.html'
})
export class ClienteComponent implements OnInit {
  cliente$: Observable<Cliente>;
  miniNav = false;

  navigation = [
    { path: 'info', title: 'Generales', icon: 'account_box' },
    { path: 'cxc', title: 'Cuentas x Cobrar', icon: 'today' },
    { path: 'facturas', title: 'Facturas', icon: 'file_download' },
    { path: 'cobros', title: 'Cobros', icon: 'attach_money' },
    { path: 'bonificaciones', title: 'Bonificaciones', icon: 'file_upload' },
    { path: 'devoluciones', title: 'Devoluciones', icon: 'file_upload' },
    { path: 'cargos', title: 'Notas de cargo', icon: 'keyboard_tab' }
    // { path: '/clientes', title: 'Clientes', icon: 'arrow_back' }
  ];

  constructor(
    private store: Store<fromStore.ClientesState>,
    public media: TdMediaService,
    private service: ClienteService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.cliente$ = this.store.pipe(select(fromStore.getSelectedCliente));
  }

  cambiar() {}

  estadoDeCuenta(cliente: Cliente) {
    const dialogRef = this.dialog.open(EstadoDeCuentaComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        const { fecha, cartera } = data;
        this.service.estadoDeCuenta(cliente, fecha, cartera).subscribe(
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
}
