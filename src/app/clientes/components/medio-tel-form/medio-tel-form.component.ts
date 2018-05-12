import {
  Component,
  Inject,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'sx-medio-tel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './medio-tel-form.component.html'
})
export class MedioTelFormComponent implements OnInit {
  medio: Object;
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.medio = data.medio;
  }

  ngOnInit() {
    this.form = this.fb.group({
      tipo: ['TEL', Validators.required],
      descripcion: [
        null,
        [Validators.required, Validators.minLength(5), Validators.maxLength(20)]
      ],
      comentario: [null]
    });
  }
}
