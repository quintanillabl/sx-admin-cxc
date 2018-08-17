
import {of as observableOf,  Observable } from 'rxjs';

import {switchMap, map,  catchError } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Cliente } from '../../models';
import { ClienteService } from '../../services';
import { MatDialog } from '@angular/material';
import { SocioFormComponent } from '../../components';

@Component({
  selector: 'sx-cliente-socios',
  templateUrl: './cliente-socios.component.html',
  styles: [
    `.socios-container {
        max-height: 400px;
        overflow: auto
      }
    `
  ]
})
export class ClienteSociosComponent implements OnInit {
  cliente$: Observable<Cliente>;
  socios$: Observable<any[]>;
  term = '';

  constructor(
    private route: ActivatedRoute,
    private service: ClienteService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.cliente$ = this.route.parent.data.pipe(map(data => data.cliente));
    this.load();
  }

  load() {
    this.socios$ = this.cliente$.pipe(switchMap(cliente => {
      return this.service
        .socios(cliente)
        .pipe(catchError(err => observableOf(err)));
    }));
  }

  onSelect(row) {
    const dialogRef = this.dialog.open(SocioFormComponent, {
      data: {
        cliente: row.cliente,
        socio: row
      },
      width: '700px',
      height: '600px'
    });
    dialogRef.afterClosed().subscribe(socio => {
      if (socio) {
        console.log('Actualizando socio: ', socio);
        this.service
          .updateSocio(row.cliente, socio)
          .pipe(catchError(error => observableOf(error)))
          .subscribe(socioRes => this.load());
      }
    });
  }
}
