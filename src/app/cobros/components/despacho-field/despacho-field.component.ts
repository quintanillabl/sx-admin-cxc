import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ConfigService } from 'app/utils/config.service';

@Component({
  selector: 'sx-despacho-field',
  template: `
    <ng-container [formGroup]="parent">
      <mat-form-field [style.width.%]="100">
        <mat-select [placeholder]="placeholder" [formControlName]="property" class="sucursal-field">
          <mat-option></mat-option>
          <mat-option *ngFor="let despacho of (despachos$ | async)" [value]="despacho.id">
            {{despacho.nombre}}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </ng-container>
  `,
  styles: []
})
export class DespachoFieldComponent implements OnInit {
  @Input() parent: FormGroup;

  apiUrl: string;

  @Input() property = 'despacho';

  @Input() placeholder = 'Despacho';

  despachos$: Observable<any[]>;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.apiUrl = config.buildApiUrl('cxc/despachos');
  }

  ngOnInit() {
    this.despachos$ = this.http.get<any[]>(this.apiUrl);
  }
}
