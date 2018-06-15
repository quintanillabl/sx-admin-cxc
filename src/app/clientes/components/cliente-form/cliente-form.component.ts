import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl
} from '@angular/forms';
import { MatDialog, MatList } from '@angular/material';

import { Cliente } from '../../models/cliente';

import { MedioTelFormComponent } from '../medio-tel-form/medio-tel-form.component';

@Component({
  selector: 'sx-cliente-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cliente-form.component.html'
})
export class ClienteFormComponent implements OnInit {
  @Input() cliente;
  contactos: any;
  @Output() save = new EventEmitter();
  @Output() update = new EventEmitter();
  @Output() delete = new EventEmitter();
  form: FormGroup;

  constructor(private fb: FormBuilder, private dialog: MatDialog) {}

  ngOnInit() {
    this.buildForm();
    if (this.cliente) {
      // console.log('Modiicando cliente: ', this.cliente);
      this.form.patchValue(this.cliente, { emitEvent: false });
      this.cliente.medios.forEach(element => {
        if (element.tipo !== 'MAIL') {
          this.telefonos.push(new FormControl(element));
        }
      });
    }
  }

  private buildForm() {
    this.form = this.fb.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(200)
        ]
      ],
      rfc: [
        null,
        [
          Validators.required,
          Validators.pattern(
            '[A-Z&Ñ]{3,4}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[A-Z0-9]{2}[0-9A]'
          )
        ]
      ],
      activo: [true, Validators.required],
      // cfdiMail: [null, [Validators.required, Validators.email]],
      cfdiMail: [null, [Validators.email]],
      telefonos: this.fb.array([])
    });
  }

  get telefonos() {
    return this.form.get('telefonos') as FormArray;
  }

  getMediosDeContacto() {
    // Obtnemos el TIPO Mail para CFDI
    const cfdiMail = this.cliente.medios.find(
      item => item.tipo === 'MAIL' && item.cfdi
    );
    cfdiMail.descripcion = this.form.get('cfdiMail').value;

    // Join cfdiMail + telefonos
    const medios = [cfdiMail, ...this.telefonos.value];

    return medios;
  }

  onSubmit() {
    if (this.cliente) {
      // Destructuring form value to exclude telefonos
      const { telefonos, ...bean } = this.form.value;
      const medios = this.getMediosDeContacto();
      const target = {
        id: this.cliente.id,
        ...bean,
        medios
      };
      this.update.emit(target);
    } else {
      this.save.emit(this.form.value);
    }
  }

  agregarTelefono() {
    this.dialog
      .open(MedioTelFormComponent, { data: {} })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          console.log('Agregando: ', res);
          this.telefonos.push(new FormControl(res));
        }
      });
  }
}
