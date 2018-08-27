import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { NotaDeCargo } from '../../models/notaDeCargo';
import { NotadecargoService } from '../../services';
import {
  ITdDataTableColumn,
  TdLoadingService,
  TdDialogService
} from '@covalent/core';

import { Observable, empty } from 'rxjs';
import { switchMap, catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'sx-cargo-show',
  templateUrl: './cargo-show.component.html',
  styles: []
})
export class CargoShowComponent implements OnInit {
  nota: NotaDeCargo;

  columns: ITdDataTableColumn[] = [
    { name: 'documentoTipo', label: 'Tipo', numeric: true, width: 80 },
    { name: 'documento', label: 'Docto', numeric: true, width: 120 },
    { name: 'documentoFecha', label: 'Fecha', numeric: false, width: 100 },
    { name: 'documentoTotal', label: 'Total Dcto', numeric: true, width: 150 },
    { name: 'documentoSaldo', label: 'Saldo Dcto', numeric: true, width: 150 },
    { name: 'total', label: 'Cargo', numeric: true }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: NotadecargoService,
    private _loadingService: TdLoadingService,
    private dialogService: TdDialogService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          return this.service.get(params.get('id'));
        })
      )
      .subscribe(nota => (this.nota = nota));
  }

  onCancel() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  onDelete(nota) {
    const ref = this.dialogService.openConfirm({
      title: 'Eliminar nota?',
      message: `Serie: ${nota.serie} Folio: ${nota.folio} Total: ${nota.total}`,
      acceptButton: 'Aceptar',
      cancelButton: 'Cancelar'
    });
    ref.afterClosed().subscribe(res => {
      if (res) {
        this._loadingService.register('processing');
        this.service
          .delete(nota.id)
          .pipe(finalize(() => this._loadingService.resolve('processing')))
          .subscribe(data => {
            console.log('Nota de cargo eliminada');
            this.router.navigate(['../../'], { relativeTo: this.route });
          });
      }
    });
  }

  print(nota) {
    this._loadingService.register('processing');
    this.service.print(nota).subscribe(
      res => {
        const blob = new Blob([res], {
          type: 'application/pdf'
        });
        this._loadingService.resolve('processing');
        const fileURL = window.URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      },
      error2 => console.log(error2)
    );
  }

  mostrarXml(nota) {
    this.service.mostrarXml(nota).subscribe(res => {
      const blob = new Blob([res], {
        type: 'text/xml'
      });
      const fileURL = window.URL.createObjectURL(blob);
      window.open(fileURL, '_blank');
    });
  }

  email(nota): void {
    this.dialogService
      .openPrompt({
        message: 'Mandar la Cfdi (PDF y XML) al clente',
        disableClose: true,
        title: 'Email',
        value: nota.cliente.cfdiMail,
        cancelButton: 'Cancelar',
        acceptButton: 'Enviar'
      })
      .afterClosed()
      .subscribe((newValue: string) => {
        if (newValue) {
          this.doEmil(nota, newValue);
        }
      });
  }

  doEmil(nota, target: string) {
    this._loadingService.register('processing');
    this.service
      .enviarPorEmail(nota.cfdi, target)
      .pipe(
        finalize(() => this._loadingService.resolve('processing')),
        catchError(error2 => this.handelError2(error2))
      )
      .subscribe((val: any) => {
        console.log('Val: ', val);
        this.toast('Factura enviada a: ' + val.target, '');
      });
  }

  handelError2(response) {
    const message = response.error
      ? response.error.message
      : 'Error en servidor';
    const ref = this.dialogService.openAlert({
      title: `Error ${response.status}`,
      message: message,
      closeButton: 'Cerrar'
    });
    return empty();
  }

  toast(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 5000
    });
  }

  isEditable() {
    return this.nota.cfdi === null;
  }
}
