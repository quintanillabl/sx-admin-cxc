import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Operador } from '../../models/operador';

@Component({
  selector: 'sx-operadores',
  template: `
    <div layout>
      <mat-card>
        <mat-card-title>Catálogo de operadores</mat-card-title>
        <mat-divider></mat-divider>
        <sx-operadores-list [operadores]="operadores$ | async"></sx-operadores-list>
      </mat-card>
    </div>
  `
})
export class OperadoresComponent implements OnInit {
  operadores$: Observable<Operador[]>;
  constructor() {}

  ngOnInit() {}
}
