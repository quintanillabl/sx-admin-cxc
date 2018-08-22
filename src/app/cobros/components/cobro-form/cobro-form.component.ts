import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';

import { Cobro } from '../../models';

@Component({
  selector: 'sx-cobro-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cobro-form.component.html',
  styles: [
    `
    .small-field {
      max-width: 100px;
    }
  `
  ]
})
export class CobroFormComponent implements OnInit {
  @Input() cobro: Cobro;
  constructor() {}
  ngOnInit() {}
}
