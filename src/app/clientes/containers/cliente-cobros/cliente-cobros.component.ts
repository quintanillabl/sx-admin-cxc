
import {of as observableOf,  Observable } from 'rxjs';

import {switchMap, map,  catchError } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';

import { Cobro } from '../../../cobros/models/cobro';
import { Cliente } from '../../models';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from '../../services';

@Component({
  selector: 'sx-cliente-cobros',
  templateUrl: './cliente-cobros.component.html'
})
export class ClienteCobrosComponent implements OnInit {
  cliente$: Observable<Cliente>;
  cobros$: Observable<Cobro[]>;

  constructor(private route: ActivatedRoute, private service: ClienteService) {}

  ngOnInit() {
    this.cliente$ = this.route.parent.data.pipe(map(data => data.cliente));
    this.cobros$ = this.cliente$.pipe(switchMap(cliente => {
      return this.service
        .cobros(cliente, { term: '' })
        .pipe(catchError(err => observableOf(err)));
    }));
  }
}
