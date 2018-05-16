import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AntiguedadDeSalgo } from '../../models/antiguedadDeSalgo';

@Component({
  selector: 'sx-antiguedad-table',
  templateUrl: './antiguedad-table.component.html',
  styleUrls: ['./antiguedad-table.component.scss']
})
export class AntiguedadTableComponent implements OnInit {
  @Input() dataSource;
  @Input() selected: AntiguedadDeSalgo;
  @Output() select = new EventEmitter();
  displayColumns = [
    'cliente',
    'plazo',
    'limiteDeCredito',
    'tipoVencimiento',
    'facturas',
    'atrasoMaximo',
    'saldo',
    'porVencer',
    'vencido',
    'de1_30',
    'de31_60',
    'de61_90',
    'mas90',
    'part'
  ];

  constructor() {}

  ngOnInit() {}
}
