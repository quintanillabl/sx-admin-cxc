import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromAntiguedad from '../../store/actions/antiguedad.actions';
import { AntiguedadDeSaldo } from '../../models/antiguedadDeSaldo';

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
  saldos$: Observable<AntiguedadDeSaldo[]>;
  selectedFacturas$: Observable<any[]>;
  selected$: Observable<AntiguedadDeSaldo>;
  search$: Observable<string>;

  constructor(private store: Store<fromStore.AntiguedadDeSaldoState>) {}

  ngOnInit() {
    this.saldos$ = this.store.select(fromStore.getAllAntiguedad);
    this.selected$ = this.store.select(fromStore.getAntiguedadSelected);
    this.selectedFacturas$ = this.store.select(
      fromStore.getAntiguedadSelectedFacturas
    );
    this.search$ = this.store.select(fromStore.getAntigueadSearchterm);

    // this.store.dispatch(new fromAntiguedad.LoadAntiguedadAction()); // Mover a un Guard
  }

  onUnselect(event) {
    this.store.dispatch(new fromAntiguedad.SetSelectedAction(null));
  }

  onSelect(event: AntiguedadDeSaldo) {
    this.store.dispatch(new fromAntiguedad.SetSelectedAction(event));
  }
}
