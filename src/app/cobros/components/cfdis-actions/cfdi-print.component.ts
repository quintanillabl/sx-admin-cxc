import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sx-cfdi-print',
  template: `
    <button mat-button type="button" >
      <mat-icon>print</mat-icon> Imprimir
    </button>
  `
})
export class CfdiPrintComponent implements OnInit {
  @Input() cfdi: { id: string };
  constructor() {}

  ngOnInit() {}
}
