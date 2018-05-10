import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromCobradores from '../../store/actions/cobradores.actions';

import { Observable } from 'rxjs';
import { Cobrador } from '../../models/cobrador';
import { CobradorFormComponent } from '../../components';
import { TdDialogService } from '@covalent/core';

@Component({
  selector: 'sx-cobradores',
  template: `
    <mat-card>
      <mat-card-title>Catálogo de cobradores</mat-card-title>
      <mat-divider></mat-divider>
      <sx-cobradores-table [dataSource]="cobradores$"
        (edit)="onEdit($event)" (delete)="onDelete($event)">
      </sx-cobradores-table>
      <a mat-fab matTooltip="Alta de cobrador" matTooltipPosition="before" color="accent" class="mat-fab-position-bottom-right z-3"
    (click)="onCreate()">
    <mat-icon>add</mat-icon>
  </a>
    </mat-card>
  `
})
export class CobradoresComponent implements OnInit {
  cobradores$: Observable<Cobrador[]>;
  constructor(
    private store: Store<fromStore.CatalogosState>,
    private dialog: MatDialog,
    private dialogService: TdDialogService
  ) {}

  ngOnInit() {
    this.cobradores$ = this.store.select(fromStore.getAllCobradores);
    this.store.dispatch(new fromCobradores.LoadCobradores());
  }

  onCreate() {
    this.onEdit(null);
  }

  onEdit(event: Partial<Cobrador>) {
    this.dialog
      .open(CobradorFormComponent, {
        data: { cobrador: event },
        width: '650px'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          const target = {
            ...event,
            ...res
          };
          if (target.id) {
            this.store.dispatch(new fromCobradores.UpdateCobrador(target));
          } else {
            this.store.dispatch(new fromCobradores.CreateCobrador(target));
          }
        }
      });
  }

  onDelete(event: Cobrador) {
    this.dialogService
      .openConfirm({
        title: 'Eliminar cobrador',
        message: event.nombres,
        acceptButton: 'Eliminar',
        cancelButton: 'Cancelar'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.store.dispatch(new fromCobradores.RemoveCobrador(event));
        }
      });
  }
}
