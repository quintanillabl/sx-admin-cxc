import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import { Cobrador } from '../../models/cobrador';

@Component({
  selector: 'sx-cobradores-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cobradores-table.component.html',
  styles: [
    `.mat-table {
      min-height: 200px;
      max-height: 400px;
      overflow: auto;
    }
    `
  ]
})
export class CobradoresTableComponent implements OnInit {
  @Input() dataSource;
  @Output() select = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  columnsToDisplay = ['nombres', 'activo', 'comision', 'edit'];

  constructor() {}

  ngOnInit() {}
}
