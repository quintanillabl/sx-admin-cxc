import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Cliente } from '../../models';
import { ClienteService } from '../../services';
import { catchError, finalize } from 'rxjs/operators';
import { TdDialogService } from '@covalent/core';

@Component({
  selector: 'sx-cliente-cxc',
  templateUrl: './cliente-cxc.component.html'
})
export class ClienteCxcComponent implements OnInit {
  cliente$: Observable<Cliente>;

  cuentasPorCobrar$: Observable<Array<any>>;
  selected: Array<any> = [];
  procesando = false;

  constructor(
    private route: ActivatedRoute,
    private service: ClienteService,
    private dialogService: TdDialogService
  ) {}

  ngOnInit() {
    this.cliente$ = this.route.parent.data.map(data => data.cliente);
    this.load();
  }

  load() {
    this.procesando = true;
    this.cuentasPorCobrar$ = this.cliente$.switchMap(cliente => {
      return this.service
        .cxc(cliente, { term: '' })
        .pipe(
          catchError(err => Observable.of(err)),
          finalize(() => (this.procesando = false))
        );
    });
  }

  saldar() {
    console.log('Saldando cxc : ', this.selected);
    const facturas = this.selected;
    if (facturas.length > 0) {
      const msg = `Saldar ${this.selected.length} facturas seleccionadas`;
      this.dialogService
        .openConfirm({
          title: 'Cuentas por cobrar',
          message: msg,
          acceptButton: 'Aceptar',
          cancelButton: 'Cancelar'
        })
        .afterClosed()
        .subscribe((res: Array<any>) => {
          if (res) {
            this.procesando = true;
            facturas.forEach(item => {
              this.service
                .saldarCxc(item.id)
                .delay(2000)
                .subscribe((cxc: any) => cxc);
              console.log('Saldando cxc: ', item);
            });
            this.procesando = false;
            this.load();
          }
        });
    }
  }
}
