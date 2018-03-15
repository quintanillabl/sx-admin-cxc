import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RevisionesService } from '../../services';
import { finalize } from 'rxjs/operators';
import { VentasCreditoTableComponent } from '../../components';
import { TdDialogService } from '@covalent/core';

@Component({
  selector: 'sx-revisiones',
  templateUrl: './revisiones.component.html'
})
export class RevisionesComponent implements OnInit {
  facturas = [];
  _selectedRows: any[] = [];
  procesando = false;
  @ViewChild('table') table: VentasCreditoTableComponent;
  constructor(
    private service: RevisionesService,
    private dialogService: TdDialogService
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.procesando = true;
    this.service
      .list({})
      .pipe(finalize(() => (this.procesando = false)))
      .subscribe(data => (this.facturas = data));
  }

  onSelection(rows) {
    this.selectedRows = rows;
    console.log('Selected: ', this.selectedRows.length);
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

  recepcion(valor: boolean) {}
  revisada() {}

  edit() {}

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
          console.log('Generar.....');
          this.procesando = true;
          this.service
            .generar()
            .pipe(finalize(() => (this.procesando = false)))
            .subscribe(data => {
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
          this.procesando = true;
          this.service
            .recalcular()
            .pipe(finalize(() => (this.procesando = false)))
            .subscribe(data => {
              this.load();
            });
        }
      });
  }
}
