import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TdMediaService } from '@covalent/core';

import { Cliente } from '../../models';

@Component({
  selector: 'sx-cliente',
  templateUrl: './cliente.component.html'
})
export class ClienteComponent implements OnInit {
  cliente: Cliente;

  navigation = [
    { path: 'info', title: 'Generales', icon: 'account_box' },
    { path: 'cxc', title: 'Cuentas x Cobrar', icon: 'today' },
    { path: 'facturas', title: 'Facturas', icon: 'file_download' },
    { path: 'cobros', title: 'Cobros', icon: 'attach_money' },
    { path: 'bonificaciones', title: 'Bonificaciones', icon: 'file_upload' },
    { path: 'devoluciones', title: 'Devoluciones', icon: 'file_upload' },
    { path: 'cargos', title: 'Notas de cargo', icon: 'keyboard_tab' },
    {
      path: 'estadoDeCuenta',
      title: 'Estado de cuenta',
      icon: 'account_balance_wallet'
    },
    { path: '/clientes/list', title: 'Clientes', icon: 'arrow_back' }
  ];

  constructor(private route: ActivatedRoute, public media: TdMediaService) {}

  ngOnInit() {
    this.cliente = this.route.snapshot.data.cliente;
  }

  cambiar() {}
}
