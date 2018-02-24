import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SolicitudFormComponent } from '../../components';

@Component({
  selector: 'sx-solicitudes-pendientes',
  templateUrl: './solicitudes-pendientes.component.html'
})
export class SolicitudesPendientesComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  load() {}

  onSearch() {}

  insert() {
    const dialogRef = this.dialog.open(SolicitudFormComponent, {
      width: '650px'
    });
    dialogRef.afterClosed().subscribe(val => {
      if (val) {
        console.log('Generando solicitud: ', val);
      }
    });
  }
}
