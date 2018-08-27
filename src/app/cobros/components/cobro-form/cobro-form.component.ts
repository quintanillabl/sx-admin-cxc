import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';

import { Cobro } from '../../models';
import { PagosUtils } from 'app/_core/services/pagos-utils.service';

@Component({
  selector: 'sx-cobro-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cobro-form.component.html',
  styles: [
    `
    .small-field {
      max-width: 100px;
    }
    .importes {
      max-width: 130px;
    }
    .moneda-field {
      max-width: 70px;
    }
  `
  ]
})
export class CobroFormComponent implements OnInit {
  @Input() cobro: Cobro;
  constructor(private pagoUtils: PagosUtils) {}
  ngOnInit() {}

  get formaDePago() {
    return this.pagoUtils.slim(this.cobro.formaDePago);
  }
}
