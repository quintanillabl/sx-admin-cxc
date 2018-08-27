import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CxCSelectorDialogComponent } from './cxc-selector-dialog.component';

@Component({
  selector: 'sx-cxc-selector',
  template: `
    <button mat-button (click)="lookup()" type="button" [disabled]="disabled">
      <span>{{title}}</span>
      <mat-icon>add</mat-icon>
    </button>
  `,
  styles: []
})
export class CxCSelectorComponent implements OnInit {
  @Input() title = 'Buscar cuentas por cobrar';

  @Output() select = new EventEmitter();

  @Input() cliente: any;

  @Input() cartera = 'CRE';

  @Input() disabled = false;

  @Input() maximoPermitido = -1;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  lookup() {
    const dialogRef = this.dialog.open(CxCSelectorDialogComponent, {
      width: '850px',
      minHeight: '600px',
      maxHeight: '750px',
      data: {
        cliente: this.cliente,
        cartera: this.cartera,
        maximoPermitido: this.maximoPermitido
      }
    });
    dialogRef.afterClosed().subscribe(facturas => {
      if (facturas !== null) {
        this.select.emit(facturas);
      }
    });
  }
}
