import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Operador } from '../../models/operador';

@Component({
  selector: 'sx-operadores-list',
  template: `
    <pre>{{operadores | json}}</pre>
  `
})
export class OperadoresListComponent implements OnInit {
  @Input() operadores: Operador[];
  @Output() select = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
