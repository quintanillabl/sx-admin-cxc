import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/operators';

import { ComisionesService } from '../../services/comisions.service';
import { Periodo } from 'app/_core/models/periodo';
import { PeriodoDialogComponent } from '../../../_shared/components';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'sx-comisiones',
  templateUrl: './comisiones.component.html',
  styleUrls: ['./comisiones.component.scss']
})
export class ComisionesComponent implements OnInit {
  comisiones$: Observable<any[]>;
  factura$ = new BehaviorSubject('');
  cliente$ = new BehaviorSubject('');
  periodo: Periodo;

  displayColumns = [
    'cliente',
    'clave',
    'tipo',
    'documento',
    'fechaDocumento',
    'total',
    'pagoComisionable',
    'comisionImporte'
  ];
  constructor(private service: ComisionesService, private dialog: MatDialog) {}

  ngOnInit() {
    this.periodo = Periodo.mesActual();
    this.comisiones$ = this.service.list(this.periodo.toApiJSON()).pipe(
      combineLatest(this.factura$, (data, factura) => {
        if (factura) {
          return data.filter(item =>
            item.documento.toString().startsWith(factura.toString())
          );
        } else {
          return data;
        }
      }),
      combineLatest(this.cliente$, (data, term) => {
        if (term) {
          return data.filter(item =>
            item.cliente
              .toString()
              .toLowerCase()
              .startsWith(term.toString().toLowerCase())
          );
        } else {
          return data;
        }
      })
    );
  }
  test(event) {
    console.log(event);
  }

  changePeriodo() {
    this.dialog
      .open(PeriodoDialogComponent, { data: { periodo: this.periodo } })
      .afterClosed()
      .subscribe(per => {
        if (per) {
          console.log('Periodo seleccionado:', per);
        }
      });
  }
}
