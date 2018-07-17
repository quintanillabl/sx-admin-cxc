import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

import { BonificacionMC } from '../../models/bonificacionMC';

@Component({
  selector: 'sx-mejores-clientes-table',
  templateUrl: './mejores-clientes-table.component.html',
  styleUrls: ['./mejores-clientes-table.component.scss']
})
export class MejoresClientesTableComponent
  implements OnInit, AfterViewInit, OnChanges {
  @Input() clientes = [];
  @Input()
  displayColumns = [
    'cliente',
    'ventas',
    'bono',
    'importe',
    'aplicado',
    'ajuste',
    'disponible',
    'autorizado',
    'vencimiento',
    'operaciones'
  ];
  @Input() search: string;
  dataSource = new MatTableDataSource<BonificacionMC>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() select = new EventEmitter();
  @Output() editar = new EventEmitter();
  @Output() suspender = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.clientes && changes.clientes.currentValue) {
      this.dataSource.data = changes.clientes.currentValue;
    }
    if (changes.search && changes.search.currentValue) {
      this.dataSource.filter = this.search;
    }
  }

  editarBonificacion(event: Event, bonificacion: BonificacionMC) {
    event.stopPropagation();
    this.editar.emit(bonificacion);
  }

  suspenderBonificacion(event: Event, bonificacion: BonificacionMC) {
    event.stopPropagation();
    this.suspender.emit(bonificacion);
  }
}
