import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { TdDialogService } from '@covalent/core';
import { MatDialog } from '@angular/material';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromRevision from '../../store/actions/revision.actions';

import { VentaCredito } from '../../models/ventaCredito';
import { RevisionesService } from '../../services';

import {
  RevisionFormComponent,
  VentasCreditoTableComponent
} from '../../components';

@Component({
  selector: 'sx-revisiones',
  templateUrl: './revisiones.component.html'
})
export class RevisionesComponent implements OnInit {
  facturas$: Observable<VentaCredito[]>;
  loading$: Observable<boolean>;

  _selectedRows: any[] = [];

  @ViewChild('table') table: VentasCreditoTableComponent;
  constructor(
    private store: Store<fromStore.CobranzaState>,
    private dialog: MatDialog,
    private service: RevisionesService,
    private dialogService: TdDialogService
  ) {}

  ngOnInit() {
    this.loading$ = this.store.select(fromStore.getRevisionesLoading);
    this.facturas$ = this.store.select(fromStore.getRevisionesSorted);
  }

  load() {
    this.store.dispatch(new fromRevision.LoadRevisionAction());
  }

  onSelection(rows) {
    this.selectedRows = rows;
    // console.log('Selected: ', this.selectedRows.map(item => item.documento));
  }

  search(term) {
    this.table.search(term);
  }

  get selectedRows() {
    return this._selectedRows;
  }

  set selectedRows(rows) {
    this._selectedRows = rows;
  }

  recepcion(valor: boolean) {
    console.log('Registrar revision facturas: ', this.selectedRows);
    this.selectedRows.forEach((item: VentaCredito) => {
      /*
      item.fechaRecepcionCxc = new Date().toISOString();
      this.store.dispatch(new fromRevision.UpdateRevisionAction(item));
      */
      console.log('Actualizando recepcion de factura: ', item);
    });
    this.selectedRows = [];
  }

  revisada() {}

  edit() {
    if (this.selectedRows.length <= 0) {
      return;
    }
    let facturas = this.selectedRows;
    const cliente = facturas[0].cliente;
    facturas = facturas.filter(item => item.cliente === cliente);
    this.dialog
      .open(RevisionFormComponent, { data: { facturas }, width: '700px' })
      .afterClosed()
      .subscribe((res: VentaCredito[]) => {
        if (res) {
          res.forEach(item => {
            console.log('Actualizando: ', item);
            // this.store.dispatch(new fromRevision.UpdateRevisionAction(item));
          });
          this.selectedRows = [];
        }
      });
  }

  generar() {
    this.dialogService
      .openConfirm({
        title: 'Revisón y cobro',
        message:
          'Generar registros a revisión de las cuentas por cobrar pendientes',
        cancelButton: 'Cancelar',
        acceptButton: 'Aceptar'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.service.generar().subscribe(data => {
            this.load();
          });
        }
      });
  }

  recalcular() {
    this.dialogService
      .openConfirm({
        title: 'Revisón y cobro',
        message: 'Recalcular fechas de revisión y cobro pendientes',
        cancelButton: 'Cancelar',
        acceptButton: 'Aceptar'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.service.recalcular().subscribe(data => {
            this.load();
          });
        }
      });
  }

  reporte() {
    this.service.reporte().subscribe(
      res => {
        const blob = new Blob([res], {
          type: 'application/pdf'
        });
        const fileUrl = window.URL.createObjectURL(blob);
        window.open(fileUrl, '_blank');
      },
      error1 => {
        console.log('Error al tratar de imprimir antiguead de saldos');
      }
    );
  }
}
