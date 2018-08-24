import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';

import { CobrosFilterDialogComponent } from './cobros-filter-dialog.component';
import { CobroFilter } from '../../models';
import { Cartera } from '../../models/cartera';

@Component({
  selector: 'sx-cobros-filter',
  template: `
  <button mat-button mat-icon-button (click)="openFilter()" ><mat-icon [color]="color">filter_list</mat-icon></button>
  `
})
export class CobrosFilterComponent implements OnInit {
  @Input() color = 'primary';
  @Input() filter: CobroFilter;
  @Input() cartera: Cartera;
  @Output() change = new EventEmitter<CobroFilter>();
  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  openFilter() {
    this.dialog
      .open(CobrosFilterDialogComponent, {
        data: { filter: this.filter, tipo: this.cartera.clave }
      })
      .afterClosed()
      .subscribe(command => {
        if (command) {
          this.change.emit(command);
        }
      });
  }
}
