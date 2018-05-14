import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { AntiguedadDeSalgo } from '../../models/antiguedadDeSalgo';
import { AntiguedadService } from '../../services';

@Component({
  selector: 'sx-antiguedad-global',
  templateUrl: './antiguedad-global.component.html',
  styles: [
    `
    .table-container {
      min-width: 600px;
      overflow: auto;
    }
  `
  ]
})
export class AntiguedadGlobalComponent implements OnInit {
  registros$: Observable<AntiguedadDeSalgo[]>;
  constructor(private service: AntiguedadService) {}

  ngOnInit() {
    this.registros$ = this.service.list();
    // this.registros$.subscribe(res => console.log('Rows: ', res));
    // this.service.list().subscribe(res => console.log('Rows: ', res.length));
  }
}
