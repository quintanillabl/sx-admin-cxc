import { Component, OnInit } from '@angular/core';

import { Observable, empty } from 'rxjs';
import { switchMap, catchError, finalize } from 'rxjs/operators';

import { Router, ActivatedRoute } from '@angular/router';

import { TdDialogService, TdLoadingService } from '@covalent/core';
import { MatSnackBar } from '@angular/material';

import { NotascxcService } from '../../services';

@Component({
  selector: 'sx-nota-view',
  templateUrl: './nota-view.component.html',
  styles: []
})
export class NotaViewComponent implements OnInit {
  nota: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: NotascxcService,
    private loadingService: TdLoadingService,
    private dialogService: TdDialogService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          console.log('Params: ', params);
          return this.service.get(params.get('id'));
        })
      )
      .subscribe(nota => {
        this.nota = nota;
        console.log('Nota:', nota);
      });
  }

  reload() {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          console.log('Params: ', params);
          return this.service.get(params.get('id'));
        })
      )
      .subscribe(nota => (this.nota = nota));
  }

  print(nota) {
    // this.loadingService.register('procesando');
    this.service.print(nota).subscribe(
      res => {
        const blob = new Blob([res], {
          type: 'application/pdf'
        });
        // this.loadingService.resolve('saving');
        const fileURL = window.URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      },
      error2 => console.log(error2)
    );
  }

  timbrar(nota) {
    if (nota.sw2) {
      this.dialogService.openAlert({
        title: 'Error',
        message: 'Nota de credito CFDI 3.2 no se puede timbrar',
        closeButton: 'Cerrar'
      });
      return;
    }

    this.loadingService.register('procesando');
    if (!nota.cfdi) {
      this.service
        .timbrar(nota)
        .pipe(
          catchError(error2 => this.handelError2(error2)),
          finalize(() => this.loadingService.resolve('procesando'))
        )
        .subscribe(res => {
          console.log('Nota timbrada: ', res);
          this.reload();
        });
    }
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

  aplicar(nota) {
    if (nota.disponible <= 0.0) {
      return;
    }
    this.dialogService
      .openConfirm({
        message: ` Aplicar el disponible: ${
          nota.disponible
        } a las facturas relacionadas`,
        title: `Apliación de nota: ${nota.documento}`,
        acceptButton: 'Aceptar',
        cancelButton: 'Cancelar'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.loadingService.register('procesando');
          this.service
            .aplicar(nota)
            .pipe(
              catchError(error2 => this.handelError2(error2)),
              finalize(() => this.loadingService.resolve('procesando'))
            )
            .subscribe(n => {
              console.log('Nota aplicada: ', n);
              this.reload();
            });
        }
      });
  }

  mandarPorCorreo(nota): void {
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
    this.loadingService.register('procesando');
    this.service
      .enviarPorEmail(nota.cfdi, target)
      .pipe(
        finalize(() => this.loadingService.resolve('procesando')),
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

  delete(nota) {
    console.log('Eliminando nota: ', nota);
    if (nota.cfdi) {
      return;
    }
    this.dialogService
      .openConfirm({
        message: ` Eliminar la nota: ${nota.folio}`,
        title: `Elminación de nota de credito`,
        acceptButton: 'Aceptar',
        cancelButton: 'Cancelar'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.loadingService.register('procesando');
          this.service
            .delete(nota.id)
            .pipe(
              catchError(error2 => this.handelError2(error2)),
              finalize(() => this.loadingService.resolve('procesando'))
            )
            .subscribe(ok => {
              this.goToParent(nota);
            });
        }
      });
  }

  goToParent(nota: any) {
    const tipo = nota.tipo.startsWith('DEV')
      ? 'devoluciones'
      : 'bonificaciones';
    const cartera = nota.tipoCartera.toLowerCase();
    const url = `/cobranza/${cartera}/${tipo}`;
    this.router.navigate([url]);
  }
}
