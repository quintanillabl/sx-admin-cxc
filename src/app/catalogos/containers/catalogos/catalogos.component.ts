import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TdMediaService } from '@covalent/core';

@Component({
  selector: 'sx-catalogos-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './catalogos.component.html'
})
export class CatalogosComponent implements OnInit {
  navmenu: Object[] = [
    {
      route: 'operadores',
      title: 'Operadores',
      description: 'Catálogo de operadores',
      icon: 'supervisor_account'
    },
    {
      route: 'cobradores',
      title: 'Cobradores',
      description: 'Catálogo de cobradores',
      icon: 'directions_walk'
    },
    {
      route: 'vendedores',
      title: 'Vendedores',
      description: 'Vendedores',
      icon: 'nature_people'
    },
    {
      route: 'despachos',
      title: 'Abogados',
      description: 'Despachos de abogados',
      icon: 'local_library'
    }
  ];

  constructor(public media: TdMediaService) {}

  ngOnInit() {}
}
