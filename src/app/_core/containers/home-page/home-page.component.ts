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

  constructor() { }

  ngOnInit() {
    this.header$ = Observable.of('ToolbarHeader');
    this.application$ = Observable.of(
      {
        name: 'SX-ADMIN-MODULE_NAME',
        descripcion: 'Module description',
        image: '/assets/images/logo_papelsa.jpg'
      });
  }

}
