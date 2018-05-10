import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import { Vendedor } from '../../models/vendedor';

@Component({
  selector: 'sx-vendedores-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './vendedores-table.component.html',
  styles: [
    `.mat-table {
      min-height: 200px;
      max-height: 400px;
      overflow: auto;
    }
    `
  ]
})
export class VendedoresTableComponent implements OnInit {
  @Input() dataSource;
  @Output() select = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  columnsToDisplay = [
    'nombres',
    'activo',
    'comisionContado',
    'comisionCredito',
    'edit'
  ];

  constructor() {}

  ngOnInit() {}
}
