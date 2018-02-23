import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Cliente } from '../../models';

@Component({
  selector: 'sx-cliente-facturas',
  templateUrl: 'cliente-facturas.component.html'
})
export class ClienteFacturasComponent implements OnInit {
  cliente$: Observable<Cliente>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.cliente$ = this.route.parent.data.map(data => data.cliente);
  }
}
