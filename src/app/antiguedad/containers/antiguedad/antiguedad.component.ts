import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';

import { AntiguedadDeSaldo } from '../../models/antiguedadDeSaldo';

@Component({
  selector: 'sx-antiguedad',
  templateUrl: './antiguedad.component.html',
  styles: []
})
export class AntiguedadComponent implements OnInit {
  selected$: Observable<AntiguedadDeSaldo>;

  constructor(private store: Store<fromStore.AntiguedadDeSaldoState>) {}

  ngOnInit() {
    this.selected$ = this.store.select(fromStore.getAntiguedadSelected);
  }

  antiguedadGlobal() {
    this.store.dispatch(new fromStore.PrintAntiguedadAction());
  }

  onSearch(event: string) {
    this.store.dispatch(new fromStore.SetSearchTermAction(event));
  }
}
