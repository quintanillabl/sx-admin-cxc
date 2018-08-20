import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl
} from '@angular/forms';

import { Subject } from 'rxjs';

import { Cobro } from '../../models';

@Component({
  selector: 'sx-cobro-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cobro-form.component.html'
})
export class CobroFormComponent implements OnInit, OnChanges {
  @Input() cobro: Cobro;
  @Output() save = new EventEmitter<Cobro>();
  filtro$ = new Subject<string>();

  form: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (!this.form) {
      this.buildForm();
    }
    if (changes.cobro && changes.cobro.currentValue) {
      const pag = changes.cobro.currentValue;
      this.form.patchValue(pag);
    }
  }

  buildForm() {
    this.form = this.fb.group({
      comentario: []
    });
  }

  onSave() {
    if (this.form.valid) {
      const res = {
        id: this.cobro.id,
        ...this.form.value
      };
      this.save.emit(res);
      this.form.markAsPristine();
    }
  }

  onFilter(event: string) {
    this.filtro$.next(event);
  }
}
