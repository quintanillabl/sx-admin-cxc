import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';
import { NotaDeCargo } from '../../models/notaDeCargo';
import { Cartera } from '../../models/cartera';
import { NotadecargoService } from '../../services';
import { TdLoadingService, TdDialogService } from '@covalent/core';

@Component({
  selector: 'sx-cargo-edit',
  template: `
    <div layout="flex" layout-align="center"
      *tdLoading="'processing'; mode:'indeterminate'; type:'circle'; strategy:'overlay'; color:'accent'">
      <sx-notadecargo-form [nota]="nota$ | async" flex
        (cancel)="onCancel($event)"
        (timbrar)="timbrar($event)"
        (save)="onSave($event)">
      </sx-notadecargo-form>
    </div>
  `,
  styles: []
})
export class CargoEditComponent implements OnInit {
  cartera: Cartera;

  nota$: Observable<NotaDeCargo>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: NotadecargoService,
    private _loadingService: TdLoadingService,
    private dialogService: TdDialogService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.nota$ = this.route.paramMap.switchMap(params => {
      return this.service.get(params.get('id'));
    });
  }

  onCancel(nota) {
    this.router.navigate(['../../show', nota.id], {
      relativeTo: this.route
    });
  }

  onSave(nota) {
    console.log('Actualizando nota de cargo: ');
    this._loadingService.register('processing');
    this.service
      .update(nota)
      .finally(() => this._loadingService.resolve('processing'))
      .subscribe(res => {
        console.log('Res: ', res);
        this.router.navigate(['../../show', nota.id], {
          relativeTo: this.route
        });
      });
  }

  timbrar(nota) {
    if (!nota.cfdi) {
      console.log('Timbrando: ', nota);
      this._loadingService.register('processing');
      this.service
        .timbrar(nota)
        .catch(error2 => this.handelError2(error2))
        .finally(() => this._loadingService.resolve('processing'))
        .subscribe(res => {
          console.log('Nota timbrada: ', res);
          this.router.navigate(['../../show', nota.id], {
            relativeTo: this.route
          });
          // this.reload();
        });
    }
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
    return Observable.empty();
  }

  toast(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 5000
    });
  }
}
