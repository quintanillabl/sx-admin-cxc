import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TdMediaService } from '@covalent/core';
import { MatDialog } from '@angular/material';
import { FechaDialogComponent } from '../../../_shared/components';
import { CobrosService } from '../../services';

@Component({
  selector: 'sx-cobranza',
  templateUrl: './cobranza.component.html'
})
export class CobranzaComponent implements OnInit {
  navigation = [
    {
      path: 'cobros',
      title: 'Cobros',
      description: 'Registro de cobros',
      icon: 'attach_money'
    },
    {
      path: 'revisiones',
      title: 'Revisión',
      description: 'Revisión y cobro',
      icon: 'event_note'
    },
    {
      path: 'devoluciones',
      title: 'Devoluciones',
      description: 'Notas de devolución',
      icon: 'keyboard_return'
    },
    {
      path: 'bonificaciones',
      title: 'Bonificación',
      description: 'Notas de bonificación',
      icon: 'system_update_alt'
    },
    {
      path: 'cargos',
      title: 'Cargos',
      description: 'Notas de cargo',
      icon: 'event_busy'
    }
  ];

  cartera: { clave: string; descripcion: string };

  constructor(
    public media: TdMediaService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private service: CobrosService
  ) {}

  ngOnInit() {
    this.cartera = this.route.snapshot.data.cartera;
    if (this.cartera.clave === 'CON') {
      this.navigation.splice(0, 1); // Contado no ocupa Cobros
    }
  }

  reporteDeCobranza() {
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
  }
}
