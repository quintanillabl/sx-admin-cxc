import { Component, OnInit, AfterViewInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromActions from '../../store/actions/cobros.actions';

import { Observable, Subject } from 'rxjs';

import { Cobro, CobroFilter } from '../../models/cobro';

import * as _ from 'lodash';

@Component({
  selector: 'sx-cobros',
  templateUrl: './cobros.component.html'
})
export class CobrosComponent implements OnInit, AfterViewInit {
  cobros$: Observable<Cobro[]>;
  cartera: { clave: string; descripcion: string };
  search$ = new Subject();
  filter = '';
  cobrosFilter$: Observable<CobroFilter>;

  constructor(private store: Store<fromStore.CobranzaState>) {}

  ngOnInit() {
    this.cobros$ = this.store.pipe(select(fromStore.getAllCobros));
    this.filter = localStorage.getItem('sx-cxc.cre.cobros.filter');
    this.cobrosFilter$ = this.store.pipe(select(fromStore.getCobrosFilter));
  }

  ngAfterViewInit() {
    if (this.filter) {
      // this.search$.next(this.filter);
    }
  }

  onSearch(event: string) {
    if (event.length > 0) {
      localStorage.setItem('sx-cxc.cre.cobros.filter', event);
    } else {
      localStorage.removeItem('sx-cxc.cre.cobros.filter');
    }
    // this.search$.next(event);
    this.filter = event;
  }

  onFilter(event: CobroFilter) {
    this.store.dispatch(new fromActions.SetCobrosFilter(event));
  }

  getFilterLabel(filter: CobroFilter) {
    console.log(' Filter: ', filter);
    const keys = _.keys(filter);
    const res = {};
    keys.forEach(key => {
      const value = filter[key];
      if (value) {
        res[key] = value;
      }
    });
    return res;
  }
}
