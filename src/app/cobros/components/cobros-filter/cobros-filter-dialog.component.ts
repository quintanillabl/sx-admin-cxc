import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'sx-cobros-filter-dialog',
  templateUrl: './cobros-filter-dialog.component.html'
})
export class CobrosFilterDialogComponent implements OnInit {
  title;
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.title = data.title || 'Filtro de cobros';
  }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.fb.group({
      fechaInicial: [null],
      fechaFinal: [null],
      cliente: [null],
      pendientes: [false],
      registros: [
        50,
        [Validators.required, Validators.min(10), Validators.max(100)]
      ]
    });
  }
}
