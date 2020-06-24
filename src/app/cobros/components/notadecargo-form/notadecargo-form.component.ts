import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
  FormArray,
  FormControl,
} from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import * as _ from 'lodash';

import { NotaDeCargo } from '../../models/notaDeCargo';

@Component({
  selector: 'sx-notadecargo-form',
  templateUrl: './notadecargo-form.component.html',
  styles: [],
})
export class NotadecargoFormComponent implements OnInit, OnChanges, OnDestroy {
  form: FormGroup;

  @Input() cartera;

  @Output() cancel = new EventEmitter();

  @Output() save = new EventEmitter();

  @Output() timbrar = new EventEmitter();

  @Input() nota: NotaDeCargo;

  destroy$ = new Subject<boolean>();

  totalFacturas = 0.0;

  saldoFacturas = 0.0;

  constructor(private fb: FormBuilder) {
    this.buildForm();
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.nota) {
      this.form.patchValue(this.nota);
      this.nota.partidas.forEach((item) => {
        this.partidas.push(new FormControl(item));
      });
      this.form.get('total').setValue(this.nota.total);
      this.form.get('cliente').disable();
      this.form.get('tipoDeCalculo').disable();
      this.cartera = this.nota.tipo;
    }
  }

  buildForm() {
    this.form = this.fb.group({
      cliente: [null, Validators.required],
      tipoDeCalculo: ['PORCENTAJE', Validators.required],
      formaDePago: ['POR DEFINIR', Validators.required],
      usoDeCfdi: ['G03', Validators.required],
      moneda: ['MXN', Validators.required],
      tipoDeCambio: [1.0, Validators.required],
      cargo: [{ value: null, disabled: false }, [Validators.required]],
      total: [{ value: 0, disabled: false }, [Validators.required]],
      comentario: null,
      partidas: this.fb.array([]),
    });
    this.observarTipoDeCalculo();
    this.subscribers();
  }

  private subscribers() {
    // Listen to import
    this.form
      .get('cargo')
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((importe) => {
        this.actualizar();
      });
  }

  prepareEntity() {
    const entity = {
      ...this.form.value,
      tipo: this.cartera,
      total: this.form.get('total').value,
    };
    if (this.nota) {
      const cliente = this.form.get('cliente').value;
      entity.cliente = { id: cliente.id };
      entity.id = this.nota.id;
    }
    return entity;
  }

  private observarTipoDeCalculo() {
    this.form
      .get('tipoDeCalculo')
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((tipo: string) => {
        switch (tipo) {
          case 'PORCENTAJE':
            this.calculoPorcentual();
            this.actualizar();
            break;
          case 'PRORRATEO':
            this.calculoProrrateo();
            this.actualizar();
            break;
        }
      });
  }

  calculoPorcentual() {
    this.form.get('total').disable();
    this.form.get('cargo').enable();
  }

  calculoProrrateo() {
    this.form.get('total').enable();
    this.form.get('cargo').disable();
  }

  private actualizar() {
    const tipo = this.form.get('tipoDeCalculo').value;
    if (tipo === 'PORCENTAJE') {
      const cargo = _.toNumber(this.form.get('cargo').value);
      if (cargo > 0.0) {
        const saldoTotal = _.sumBy(
          this.partidas.value,
          (item: any) => item.cuentaPorCobrar.saldo
        );
        const total = saldoTotal * (cargo / 100.0);
        this.form.get('total').setValue(_.round(total, 2));
      }
    }
  }

  onSubmit() {
    const res = this.prepareEntity();
    // console.log('Salvando: ', res);
    if (this.isEditable()) {
      this.save.emit(res);
    }
  }

  isEditable() {
    if (this.nota) {
      return this.nota.uuid !== null;
    }
    return true;
  }

  agregarFacturas(facturas: Array<any>) {
    if (facturas) {
      facturas.forEach((item) => {
        const det = {
          cuentaPorCobrar: item,
        };
        this.partidas.push(new FormControl(det));
      });
      this.actualizar();
    }
  }

  onDeletePartida(index: number) {
    this.partidas.removeAt(index);
    this.actualizar();
  }

  get partidas() {
    return this.form.get('partidas') as FormArray;
  }
}
