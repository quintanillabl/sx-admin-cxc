import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'sx-main-page',
  templateUrl: './main-page.component.html',
  styles: []
})
export class MainPageComponent implements OnInit {
  navigation: Array<{ icon: string; route: string; title: string }> = [
    {
      icon: 'home',
      route: '/',
      title: 'Inicio'
    },
    {
      icon: 'format_list_numbered',
      route: '/catalogos',
      title: 'Catálogos'
    },
    {
      icon: 'group',
      route: '/clientes',
      title: 'Clientes'
    },
    {
      icon: 'insert_invitation',
      route: '/solicitudes',
      title: 'Solicitudes'
    },
    {
      icon: 'file_download',
      route: '/cobranza/cre',
      title: 'Cobranza (Crédito)'
    },
    {
      icon: 'file_download',
      route: '/cobranza/con',
      title: 'Cobranza (Contado)'
    },
    {
      icon: 'my_library_books',
      route: 'antiguedad',
      title: 'Antigüedad de saldos'
    }

    // {
    //   icon: 'list',
    //   route: '/cxc/contado',
    //   title: 'CXC (Contado)'
    // },
    // {
    //   icon: 'color_lens',
    //   route: '/tableros',
    //   title: 'Tableros'
    // },
    // {
    //   icon: 'settings',
    //   route: '/configuracion',
    //   title: 'Configuración'
    // }
  ];

  usermenu: Array<{ icon: string; route: string; title: string }> = [
    {
      icon: 'swap_horiz',
      route: '.',
      title: 'Cambio de usuario'
    },
    {
      icon: 'tune',
      route: '.',
      title: 'Cuenta'
    },
    {
      icon: 'exit_to_app',
      route: '.',
      title: 'Salir del sistema'
    }
  ];

  modulo$: Observable<string>;

  sidenavWidth = 300;

  constructor() {}

  ngOnInit() {
    this.modulo$ = Observable.of('PENDIENTE');
  }
}
