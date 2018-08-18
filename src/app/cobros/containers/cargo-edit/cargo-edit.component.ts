import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { TdLoadingService, TdDialogService } from '@covalent/core';

import { Observable, empty } from 'rxjs';
import { switchMap, finalize, catchError } from 'rxjs/operators';

import { NotaDeCargo } from '../../models/notaDeCargo';
import { Cartera } from '../../models/cartera';
import { NotadecargoService } from '../../services';

@Component({
  selector: 'sx-cargo-edit',
  template: `
    <div layout="flex" layout-align="center"
      *tdLoading="'processing'; mode:'indeterminate'; type:'circle'; strategy:'overlay'; color:'accent'">
      <ng-container *ngIf="nota$ | async as nota">
        <sx-notadecargo-form [nota]="nota" flex
         (cancel)="onCancel(nota)"
         (timbrar)="timbrar($event)"
         (save)="onSave($event)">
        </sx-notadecargo-form>
      </ng-container>
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
    this.nota$ = this.route.paramMap.pipe(
      switchMap(params => {
        return this.service.get(params.get('id'));
      })
    );
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
      .pipe(finalize(() => this._loadingService.resolve('processing')))
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
        .pipe(
          catchError(error2 => this.handelError2(error2)),
          finalize(() => this._loadingService.resolve('processing'))
        )
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
    return empty();
  }

  toast(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 5000
    });
  }
}
