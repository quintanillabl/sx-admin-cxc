import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromActions from '../../store/actions/cobros.actions';

import { Observable, Subject } from 'rxjs';

import { Cobro, CobroFilter } from '../../models/cobro';
import { Cartera } from '../../models/cartera';

@Component({
  selector: 'sx-cobros',
  templateUrl: './cobros.component.html'
})
export class CobrosComponent implements OnInit {
  cobros$: Observable<Cobro[]>;
  search$ = new Subject();
  filter = '';
  cobrosFilter$: Observable<CobroFilter>;
  cartera$: Observable<Cartera>;

  constructor(private store: Store<fromStore.CobranzaState>) {}

  ngOnInit() {
    this.cobros$ = this.store.pipe(select(fromStore.getAllCobros));
    this.cartera$ = this.store.pipe(select(fromStore.getCartera));
    this.filter = localStorage.getItem('sx-cxc.cre.cobros.filter');
    this.cobrosFilter$ = this.store.pipe(select(fromStore.getCobrosFilter));
  }

  onSearch(event: string) {
    if (event.length > 0) {
      localStorage.setItem('sx-cxc.cre.cobros.filter', event);
    } else {
      localStorage.removeItem('sx-cxc.cre.cobros.filter');
    }
    this.filter = event;
  }

  onFilter(event: CobroFilter) {
    this.store.dispatch(new fromActions.SetCobrosFilter(event));
  }
}
