import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable ,  Subject ,  BehaviorSubject } from 'rxjs';

import { TdDialogService } from '@covalent/core';
import { MatDialog } from '@angular/material';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromRevision from '../../store/actions/revision.actions';

import { VentaCredito } from '../../models/ventaCredito';
import { RevisionesService } from '../../services';

import {
  ReporteDeRevisionComponent,
  RevisionFormComponent,
  VentasCreditoTableComponent
} from '../../components';
import { combineLatest } from 'rxjs/operators';

import * as moment from 'moment';

@Component({
  selector: 'sx-revisiones',
  templateUrl: './revisiones.component.html'
})
export class RevisionesComponent implements OnInit {
  facturas$: Observable<VentaCredito[]>;
  loading$: Observable<boolean>;
  porRecibir$ = new BehaviorSubject(false);
  porRevisar$ = new BehaviorSubject(false);
  fechaRevision$ = new BehaviorSubject(null);
  sucursal$ = new BehaviorSubject(null);
  cobrador$ = new BehaviorSubject(null);
  factura$ = new BehaviorSubject(null);

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

    this.facturas$ = this.store.select(fromStore.getRevisionesSorted).pipe(
      combineLatest(this.porRecibir$, (facturas, pendientes) => {
        if (pendientes) {
          return facturas.filter(item => !item.fechaRecepcionCxc);
        }
        return facturas;
      }),
      combineLatest(this.porRevisar$, (facturas, pendientes) => {
        if (pendientes) {
          return facturas.filter(item => !item.revisada);
        }
        return facturas;
      }),
      combineLatest(this.fechaRevision$, (facturas, value) => {
        if (value) {
          const fecha = moment(value, 'YYYY-MM-DD');
          if (fecha.isValid()) {
            const res = facturas.filter(item => {
              const frevision = moment(item.fechaRevision);
              const fpago = moment(item.reprogramarPago);
              return (
                frevision.isSame(fecha, 'day') || fpago.isSame(fecha, 'day')
              );
            });
            return res;
          }
        }

        return facturas;
      }),
      combineLatest(this.sucursal$, (facturas, sucursal) => {
        if (sucursal) {
          return facturas.filter((item: any) => {
            return item.sucursal
              .toLowerCase()
              .startsWith(sucursal.toLowerCase());
          });
        }
        return facturas;
      }),
      combineLatest(this.cobrador$, (facturas, cobrador) => {
        if (cobrador) {
          return facturas.filter((item: any) => {
            return item.cobrador.sw2.toString() === cobrador.toString();
          });
        }
        return facturas;
      }),
      combineLatest(this.factura$, (facturas, factura) => {
        if (factura) {
          return facturas.filter((item: any) => {
            return item.documento.toString() === factura.toString();
          });
        }
        return facturas;
      })
    );
    this.store.dispatch(new fromRevision.LoadRevisionAction());
  }

  test(event) {
    console.log(event);
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

  recepcion() {
    const facturas = this.selectedRows.filter(item => !item.fechaRecepcionCxc);
    console.log('Registrar revision facturas: ', facturas);
    if (facturas.length > 0) {
      const command = {
        facturas: facturas,
        type: fromRevision.BatchType.RECEPCION_CXC
      };
      this.store.dispatch(new fromRevision.BatchUpdateAction(command));
      this.selectedRows = [];
    }
  }

  cancelarRecepcion() {
    let facturas = this.selectedRows.filter(item => item.fechaRecepcionCxc);
    facturas = facturas.filter(item => !item.revisada);
    if (facturas.length > 0) {
      const command = {
        facturas: facturas,
        type: fromRevision.BatchType.CANCELAR_RECEPCION_CXC
      };
      this.store.dispatch(new fromRevision.BatchUpdateAction(command));
      this.selectedRows = [];
    }
  }

  revisada() {
    let facturas = this.selectedRows.filter(item => item.fechaRecepcionCxc);
    facturas = facturas.filter(item => !item.revisada);
    console.log('Registrar revision facturas: ', facturas);
    if (facturas.length > 0) {
      const command = {
        facturas: facturas,
        type: fromRevision.BatchType.REVISADA
      };
      this.store.dispatch(new fromRevision.BatchUpdateAction(command));
      this.selectedRows = [];
    }
  }

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
      .subscribe(res => {
        if (res) {
          this.store.dispatch(
            new fromRevision.BatchUpdateAction({
              facturas: facturas,
              template: res,
              type: fromRevision.BatchType.NORMAL
            })
          );
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
    this.dialog
      .open(ReporteDeRevisionComponent, { data: {} })
      .afterClosed()
      .subscribe(command => {
        if (command) {
          this.service.reporteDeRevision(command).subscribe(
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
      });
  }

  isSelectionEditable() {
    return this.selectedRows.filter(item => !item.revisada).length > 0;
  }
}
