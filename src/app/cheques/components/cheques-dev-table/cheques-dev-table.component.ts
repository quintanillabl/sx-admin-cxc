import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { CuentaPorCobrar } from 'app/cobros/models/cuentaPorCobrar';

@Component({
  selector: 'sx-cxc-table',
  templateUrl: './cheques-dev-table.component.html',
  styleUrls: ['./cheques-dev-table.component.scss']
})
export class ChequesDevTableComponent implements OnInit {

  columnsToDisplay = ['cliente'];
  dataSource = new MatTableDataSource<CuentaPorCobrar>([]);

  constructor() { }

  ngOnInit() {
  }

}
