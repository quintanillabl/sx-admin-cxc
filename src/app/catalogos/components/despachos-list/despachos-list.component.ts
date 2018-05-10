import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { Despacho } from '../../models/despacho';

@Component({
  selector: 'sx-despachos-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './despachos-list.component.html'
})
export class DespachosListComponent implements OnInit {
  @Input() despachos: Despacho[];
  constructor() {}

  ngOnInit() {}
}
