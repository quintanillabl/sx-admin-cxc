import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sx-antiguedad-table',
  templateUrl: './antiguedad-table.component.html',
  styleUrls: ['./antiguedad-table.component.scss']
})
export class AntiguedadTableComponent implements OnInit {
  @Input() dataSource;
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
