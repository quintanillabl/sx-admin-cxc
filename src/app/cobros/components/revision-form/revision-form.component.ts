import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA } from '@angular/material';
import { ITdDataTableColumn } from '@covalent/core';

import { VentaCredito } from '../../models/ventaCredito';

@Component({
  selector: 'sx-revision-form-component',
  templateUrl: './revision-form.component.html'
})
export class RevisionFormComponent implements OnInit {
  form: FormGroup;
  facturas: VentaCredito[];
  cliente: any;

  dias = [
    { clave: 1, descripcion: 'Lunes (1)' },
    { clave: 2, descripcion: 'Martes (2)' },
    { clave: 3, descripcion: 'Miercoles (3)' },
    { clave: 4, descripcion: 'Jueves (4)' },
    { clave: 5, descripcion: 'Viernes (5)' },
    { clave: 6, descripcion: 'Sábado (6)' },
    { clave: 7, descripcion: 'Domingo (7)' }
  ];

  cobradores = [
    { id: '402880fc5e4ec411015e4ec6636b015a', nombre: 'DIRECTO', clave: '1' },
    {
      id: '402880fc5e4ec411015e4ec66505015d',
      nombre: 'JOSE ENRIQUE ESCALANTE MARTINEZ',
      clave: '4'
    },
    {
      id: '402880fc5e4ec411015e4ec66622015f',
      nombre: 'IVAN ESTRADA MAYA',
      clave: '6'
    },
    {
      id: '402880fc5e4ec411015e4ec666eb0161',
      nombre: 'CESAR ESCALANTE MAYA',
      clave: '8'
    },
    {
      id: '402880fc5e4ec411015e4ec667a80162',
      nombre: 'JOSE ANTONIO GRIJALVA JIMENEZ',
      clave: '9'
    }
  ];

  columns: ITdDataTableColumn[] = [
    { name: 'cobrador.sw2', label: 'Cobrador' },
    { name: 'diaRevision', label: 'Dia Rev' },
    { name: 'diaPago', label: 'Día Cob' },
    { name: 'documento', label: 'Docto' },
    { name: 'fecha', label: 'Fecha' },
    { name: 'vencimiento', label: 'Vto' },
    { name: 'saldo', label: 'Saldo' },
    { name: 'plazo', label: 'Plazo' }
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder
  ) {
    this.facturas = data.facturas;
    this.cliente = this.facturas[0].nombre;
  }

  ngOnInit() {
    this.form = this.fb.group({
      diaRevision: ['', Validators.required],
      diaPago: ['', Validators.required],
      vencimientoFactura: [],
      plazo: ['', Validators.required],
      fechaRevision: [{ value: null, disabled: true }],
      cobrador: [null, Validators.required],
      comentario: [null],
      comentarioReprogramarPago: [null]
    });
    const first = this.facturas[0];
    this.form.patchValue(first);
  }

  compare(o1: any, o2: any) {
    console.log(`comprando ${o1} con ${o2}`);
    return o1.clave === o2.clave;
  }

  compareCobrador(o1: any, o2: any) {
    return o1.id === o2.id;
  }
  /*
  getEntities() {
    if (this.form.valid) {
      const rest = [];
      this.facturas.forEach(item => {
        rest.push({
          ...item,
          ...this.form.value
        });
      });
      return rest;
    }
  }
  */
}
