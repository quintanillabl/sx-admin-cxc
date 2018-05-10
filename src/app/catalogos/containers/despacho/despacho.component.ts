import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { TdDialogService } from '@covalent/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromDespacho from '../../store/actions/despachos.actions';
import * as fromRoot from 'app/store';

import { Despacho } from '../../models/despacho';

@Component({
  selector: 'sx-despacho',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div layout>
      <sx-despacho-form
        [despacho]="despacho$ | async"
        (save)="onSave($event)"
        (update)="onUpdate($event)"
        (cancel)="onCancel($event)"
        (delete)="onDelete($event)">
        </sx-despacho-form>
    </div>
  `
})
export class DespachoComponent implements OnInit {
  despacho$: Observable<Despacho>;
  constructor(
    private store: Store<fromStore.CatalogosState>,
    private dialogService: TdDialogService
  ) {}

  ngOnInit() {
    this.despacho$ = this.store.select(fromStore.getSelectedDespacho);
  }

  onSave(event: Despacho) {
    this.store.dispatch(new fromDespacho.CreateDespacho(event));
  }
  onUpdate(event: Despacho) {
    this.store.dispatch(new fromDespacho.UpdateDespacho(event));
  }

  onDelete(event: Despacho) {
    this.dialogService
      .openConfirm({
        title: 'Eliminar registro:',
        message: event.nombre,
        acceptButton: 'Eliminar',
        cancelButton: 'Cancelar'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.store.dispatch(new fromDespacho.RemoveDespacho(event));
        }
      });
  }

  onCancel(event: Despacho) {
    this.store.dispatch(new fromRoot.Go({ path: ['catalogos/despachos'] }));
  }
}
