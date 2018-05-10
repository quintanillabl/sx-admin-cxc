import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromVendedores from '../../store/actions/vendedores.actions';

import { Observable } from 'rxjs';
import { Vendedor } from '../../models/vendedor';

import { TdDialogService } from '@covalent/core';
import { VendedorFormComponent } from '../../components';

@Component({
  selector: 'sx-vendedores',
  template: `
    <mat-card>
      <mat-card-title>Catálogo de vendedores</mat-card-title>
      <mat-divider></mat-divider>
      <sx-vendedores-table [dataSource]="vendedores$"
        (edit)="onEdit($event)" (delete)="onDelete($event)">
      </sx-vendedores-table>
      <a mat-fab matTooltip="Alta de vendedor" matTooltipPosition="before" color="accent" class="mat-fab-position-bottom-right z-3"
    (click)="onCreate()">
    <mat-icon>add</mat-icon>
  </a>
    </mat-card>
  `
})
export class VendedoresComponent implements OnInit {
  vendedores$: Observable<Vendedor[]>;
  constructor(
    private store: Store<fromStore.CatalogosState>,
    private dialog: MatDialog,
    private dialogService: TdDialogService
  ) {}

  ngOnInit() {
    this.vendedores$ = this.store.select(fromStore.getAllVendedores);
    this.store.dispatch(new fromVendedores.LoadVendedores());
  }

  onCreate() {
    this.onEdit(null);
  }

  onEdit(event: Partial<Vendedor>) {
    this.dialog
      .open(VendedorFormComponent, {
        data: { vendedor: event },
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
            this.store.dispatch(new fromVendedores.UpdateVendedor(target));
          } else {
            this.store.dispatch(new fromVendedores.CreateVendedor(target));
          }
        }
      });
  }

  onDelete(event: Vendedor) {
    this.dialogService
      .openConfirm({
        title: 'Eliminar vendedor',
        message: event.nombres,
        acceptButton: 'Eliminar',
        cancelButton: 'Cancelar'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.store.dispatch(new fromVendedores.RemoveVendedor(event));
        }
      });
  }
}
