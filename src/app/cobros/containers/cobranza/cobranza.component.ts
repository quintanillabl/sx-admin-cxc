import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TdMediaService } from '@covalent/core';
import { MatDialog } from '@angular/material';

import { FechaDialogComponent } from '../../../_shared/components';
import { CobrosService } from '../../services';

import * as _ from 'lodash';

@Component({
  selector: 'sx-cobranza',
  templateUrl: './cobranza.component.html'
})
export class CobranzaComponent implements OnInit {
  navigation = [
    {
      path: 'facturas',
      title: 'Facturas',
      description: 'Cuentas por cobrar',
      icon: 'shopping_cart'
    },
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
    },
    {
      path: 'comisiones',
      title: 'Comisiones',
      description: 'Comisiones cobradores',
      icon: 'people'
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
      this.navigation.splice(1, 1); // Contado no ocupa Cobros
    }
    if (this.cartera.clave === 'CHE') {
      _.remove(this.navigation, item => item.path === 'devoluciones');
      _.remove(this.navigation, item => item.path === 'revisiones');
      _.remove(this.navigation, item => item.path === 'comisiones');
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
