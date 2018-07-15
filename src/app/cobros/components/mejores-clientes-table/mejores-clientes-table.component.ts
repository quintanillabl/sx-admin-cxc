import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sx-mejores-clientes-table',
  templateUrl: './mejores-clientes-table.component.html',
  styleUrls: ['./mejores-clientes-table.component.scss']
})
export class MejoresClientesTableComponent implements OnInit {
  @Input() clientes = [];

  constructor() {}

  ngOnInit() {}
}
