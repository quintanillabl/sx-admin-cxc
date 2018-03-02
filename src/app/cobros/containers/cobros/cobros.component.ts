import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Cobro } from '../../models/cobro';
import { CobrosService } from '../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'sx-cobros',
  templateUrl: './cobros.component.html'
})
export class CobrosComponent implements OnInit {
  cobros$: Observable<Cobro[]>;
  term = '';

  constructor(private servie: CobrosService, private router: Router) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.cobros$ = this.servie.cobrosMonetarios({
      cartera: 'CRE',
      term: this.term
    });
  }

  onSearch(event) {
    this.term = event;
    this.load();
  }

  onSelect(cobro: Cobro) {
    this.router.navigate(['cobros', cobro.id]);
  }
}
