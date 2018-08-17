import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Cobro } from '../../models/cobro';
import { CobrosService } from '../../services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sx-cobros',
  templateUrl: './cobros.component.html'
})
export class CobrosComponent implements OnInit {
  cobros$: Observable<Cobro[]>;
  term = '';
  cartera: { clave: string; descripcion: string };
  _disponibles = true;

  constructor(
    private servie: CobrosService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.parent.data.subscribe(data => {
      // console.log('Parent data: ', data);
      this.cartera = data.cartera;
      this.load();
    });
  }

  load() {
    if (this.disponibles) {
      this.cobros$ = this.servie.disponibles({
        cartera: this.cartera.clave,
        term: this.term
      });
    } else {
      this.cobros$ = this.servie.list({
        cartera: this.cartera.clave,
        term: this.term
      });
    }
  }

  onSearch(event) {
    this.term = event;
    this.load();
  }

  onSelect(cobro: Cobro) {
    const path = `cobranza/${this.cartera.clave.toLowerCase()}/cobros`;
    this.router.navigate([path, cobro.id]);
  }

  get disponibles() {
    return this._disponibles;
  }
  set disponibles(val) {
    this._disponibles = val;
    this.load();
  }
}
