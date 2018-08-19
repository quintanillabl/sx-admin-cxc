import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';

import { Observable, Subject } from 'rxjs';

import { Cobro } from '../../models/cobro';

@Component({
  selector: 'sx-cobros',
  templateUrl: './cobros.component.html'
})
export class CobrosComponent implements OnInit {
  cobros$: Observable<Cobro[]>;
  cartera: { clave: string; descripcion: string };
  search$ = new Subject();

  constructor(private store: Store<fromStore.CobranzaState>) {}

  ngOnInit() {
    this.cobros$ = this.store.pipe(select(fromStore.getAllCobros));
  }

  load() {}

  onSearch(event: string) {
    this.search$.next(event);
  }
}
