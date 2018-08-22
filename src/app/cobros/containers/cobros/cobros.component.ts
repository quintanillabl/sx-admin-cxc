import { Component, OnInit, AfterViewInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';

import { Observable, Subject } from 'rxjs';

import { Cobro } from '../../models/cobro';

@Component({
  selector: 'sx-cobros',
  templateUrl: './cobros.component.html'
})
export class CobrosComponent implements OnInit, AfterViewInit {
  cobros$: Observable<Cobro[]>;
  cartera: { clave: string; descripcion: string };
  search$ = new Subject();
  filter = '';

  constructor(private store: Store<fromStore.CobranzaState>) {}

  ngOnInit() {
    this.cobros$ = this.store.pipe(select(fromStore.getAllCobros));
    this.filter = localStorage.getItem('sx-cxc.cre.cobros.filter');
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
}
