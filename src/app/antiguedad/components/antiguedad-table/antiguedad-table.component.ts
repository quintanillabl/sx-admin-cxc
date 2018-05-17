import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { AntiguedadDeSaldo } from '../../models/antiguedadDeSaldo';

@Component({
  selector: 'sx-antiguedad-table',
  templateUrl: './antiguedad-table.component.html',
  styleUrls: ['./antiguedad-table.component.scss']
})
export class AntiguedadTableComponent
  implements OnInit, OnChanges, AfterViewInit {
  @Input() saldos: AntiguedadDeSaldo[];
  @Input() selected: AntiguedadDeSaldo;
  @Input() filter: string;
  @Output() select = new EventEmitter();
  @Output() unSelect = new EventEmitter();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<AntiguedadDeSaldo>([]);

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.saldos && changes.saldos.currentValue) {
      this.dataSource.data = changes.saldos.currentValue;
    }
    if (changes.filter) {
      this.dataSource.filter = changes.filter.currentValue;
    }
  }

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
