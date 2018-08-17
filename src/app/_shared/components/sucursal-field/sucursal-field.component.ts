import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable ,  Subscription } from 'rxjs';

import { ConfigService } from 'app/utils/config.service';
import { Sucursal } from 'app/_core/models/sucursal';

@Component({
  selector: 'sx-sucursal-field',
  templateUrl: './sucursal-field.component.html'
})
export class SucursalFieldComponent implements OnInit, OnDestroy {
  @Input() parent: FormGroup;

  apiUrl: string;

  @Input() sucursalProperty = 'sucursal';

  @Input() placeholder = 'Sucursal';

  sucursales: Sucursal[];

  private subscription: Subscription;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.apiUrl = config.buildApiUrl('sucursales');
  }

  ngOnInit() {
    this.subscription = this.buscarSucursales().subscribe(
      sucursales => (this.sucursales = sucursales)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  buscarSucursales(): Observable<Sucursal[]> {
    return this.http.get<Sucursal[]>(this.apiUrl, {
      params: new HttpParams().set('activas', 'activas')
    });
  }
}
