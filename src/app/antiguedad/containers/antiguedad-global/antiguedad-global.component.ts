import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromAntiguedad from '../../store/actions/antiguedad.actions';

import { Observable } from 'rxjs/Observable';

import { AntiguedadDeSalgo } from '../../models/antiguedadDeSalgo';
import { AntiguedadService } from '../../services';

@Component({
  selector: 'sx-antiguedad-global',
  templateUrl: './antiguedad-global.component.html',
  styles: [
    `
    .table-container {
      min-width: 600px;
      overflow: auto;
    }
  `
  ]
})
export class AntiguedadGlobalComponent implements OnInit {
  saldos$: Observable<AntiguedadDeSalgo[]>;
  selected: AntiguedadDeSalgo;
  facturas: any[];
  constructor(
    private store: Store<fromStore.AntiguedadDeSaldoState>,
    private service: AntiguedadService
  ) {}

  ngOnInit() {
    this.saldos$ = this.store.select(fromStore.getAllAntiguedad);
    this.store.dispatch(new fromAntiguedad.LoadAntiguedadAction());
  }

  onSelect(event: AntiguedadDeSalgo) {
    this.selected = event;
    this.service.cxc(event.clienteId).subscribe(res => (this.facturas = res));
  }
}
