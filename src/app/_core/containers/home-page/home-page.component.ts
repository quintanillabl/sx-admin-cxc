
import {of as observableOf,  Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sx-home-page',
  templateUrl: './home-page.component.html',
  styles: []
})
export class HomePageComponent implements OnInit {
  header$: Observable<string>;
  application$: Observable<any>;

  constructor() {}

  ngOnInit() {
    this.header$ = observableOf('SIIPAPX CxC');
    this.application$ = observableOf({
      name: 'SIIPAPX CxC',
      descripcion: 'Módulo de cuentas por cobrar de SIIPAPX',
      image: '/assets/images/logo_papelsa.jpg'
    });
  }
}
