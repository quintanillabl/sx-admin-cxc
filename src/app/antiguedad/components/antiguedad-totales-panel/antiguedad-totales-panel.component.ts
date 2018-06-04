import { Component, OnInit, Input } from '@angular/core';

import { AntiguedadDeSaldo } from '../../models/antiguedadDeSaldo';
import * as _ from 'lodash';

@Component({
  selector: 'sx-antiguedad-totales-panel',
  templateUrl: './antiguedad-totales-panel.component.html',
  styles: []
})
export class AntiguedadTotalesPanelComponent implements OnInit {
  @Input() saldos: AntiguedadDeSaldo[];

  constructor() {}

  ngOnInit() {}

  get saldo() {
    return _.sumBy(this.saldos, 'saldo');
  }

  get vencido() {
    return _.sumBy(this.saldos, 'vencido');
  }

  get porVencer() {
    return _.sumBy(this.saldos, 'porVencer');
  }

  get de1_30() {
    return _.sumBy(this.saldos, 'de1_30');
  }

  get de31_60() {
    return _.sumBy(this.saldos, 'de31_60');
  }

  get de61_90() {
    return _.sumBy(this.saldos, 'de61_90');
  }

  get mas90() {
    return _.sumBy(this.saldos, 'mas90');
  }

  get part() {
    return _.sumBy(this.saldos, 'part');
  }
}
