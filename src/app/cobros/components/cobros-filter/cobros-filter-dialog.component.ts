import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CobroFilter } from '../../models';

@Component({
  selector: 'sx-cobros-filter-dialog',
  templateUrl: './cobros-filter-dialog.component.html'
})
export class CobrosFilterDialogComponent implements OnInit {
  title;
  form: FormGroup;
  filter: CobroFilter;
  tipo;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.title = data.title || 'Filtro de cobros';
    this.filter = data.filter;
    this.tipo = data.tipo;
  }

  ngOnInit() {
    this.buildForm();
    if (this.filter) {
      this.form.patchValue(this.filter);
    }
  }

  private buildForm() {
    this.form = this.fb.group({
      fechaInicial: [null],
      fechaFinal: [null],
      cliente: [null],
      pendientes: [false],
      registros: [
        50,
        [Validators.required, Validators.min(10), Validators.max(500)]
      ]
    });
  }
}
