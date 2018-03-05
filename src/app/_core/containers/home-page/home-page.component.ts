import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

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
    this.header$ = Observable.of('SIIPAPX CxC');
    this.application$ = Observable.of({
      name: 'SIIPAPX CxC',
      descripcion: 'Módulo de cuentas por cobrar de SIIPAPX',
      image: '/assets/images/logo_papelsa.jpg'
    });
  }
}
