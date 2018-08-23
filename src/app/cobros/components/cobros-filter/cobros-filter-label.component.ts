import { Component, OnInit, Input } from '@angular/core';
import { CobroFilter } from '../../models';

@Component({
  selector: 'sx-cobros-filter-label',
  template: `
  <div layout layout-align="center center" class="pad-bottom text-sm tc-indigo-500">
    <span *ngIf="filter.cliente" >{{filter.cliente.nombre}}</span>
    <span *ngIf="filter.fechaInicial" class="pad-left">Del: {{filter.fechaInicial | date: 'dd/MM/yyyy'}}</span>
    <span *ngIf="filter.fechaFinal" class="pad-left">al: {{filter.fechaFinal | date: 'dd/MM/yyyy'}}</span>
  <div>
  `
})
export class CobrosFilterLabelComponent implements OnInit {
  @Input() filter: CobroFilter;
  constructor() {}

  ngOnInit() {}
}
