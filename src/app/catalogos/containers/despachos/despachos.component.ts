import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromDespachos from '../../store/actions/despachos.actions';

import { Observable } from 'rxjs';

import { Despacho } from '../../models/despacho';

@Component({
  selector: 'sx-despachos',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-title>Despachos de cobranza</mat-card-title>
      <mat-divider></mat-divider>
      <div class="despachos-container" [style.min-height.px]="100">
        <sx-despachos-list [despachos]="despachos$ | async"></sx-despachos-list>
      </div>
    </mat-card>
    <a mat-fab class="mat-fab-position-bottom-right z-3"
      matTooltip="Alta de despacho"
      matTooltipPosition="before" color="accent" [routerLink]="['create']">
      <mat-icon>add</mat-icon>
    </a>

  `
})
export class DespachosComponent implements OnInit {
  despachos$: Observable<Despacho[]>;
  constructor(private store: Store<fromStore.CatalogosState>) {}

  ngOnInit() {
    this.despachos$ = this.store.select(fromStore.getAllDespachos);
    // this.store.dispatch(new fromDespachos.LoadDespachos());
  }
}
