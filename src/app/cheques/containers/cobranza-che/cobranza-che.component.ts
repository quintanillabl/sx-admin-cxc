import { Component, OnInit } from '@angular/core';

import { TdMediaService } from '@covalent/core';

import { FechaDialogComponent } from 'app/_shared/components';

@Component({
  selector: 'sx-cobranza-che',
  templateUrl: './cobranza-che.component.html',
  styles: []
})
export class CobranzaCheComponent implements OnInit {
  navigation = [
    {
      path: 'cheques',
      title: 'Cheques',
      description: 'Cheques devueltos',
      icon: 'info'
    },
    {
      path: 'cobros',
      title: 'Cobros',
      description: 'Registro de cobros',
      icon: 'attach_money'
    },
    {
      path: 'cargos',
      title: 'Cargos',
      description: 'Notas de cargo',
      icon: 'event_busy'
    },
    {
      path: 'notas',
      title: 'Notas',
      description: 'Notas de bonificación',
      icon: 'system_update_alt'
    }
  ];

  constructor(public media: TdMediaService) {}

  ngOnInit() {}

  reporteDeCobranza() {
    /*
    const dialogRef = this.dialog.open(FechaDialogComponent, {
      data: { title: 'Reporte de cobranza' }
    });
    dialogRef.afterClosed().subscribe(fecha => {
      if (fecha) {
        this.service.reporteDeCobranza(fecha, this.cartera.clave).subscribe(
          res => {
            const blob = new Blob([res], {
              type: 'application/pdf'
            });
            // this.loadingService.resolve('saving');
            const fileURL = window.URL.createObjectURL(blob);
            window.open(fileURL, '_blank');
          },
          error2 => console.log(error2)
        );
      }
    });
    */
  }
}
