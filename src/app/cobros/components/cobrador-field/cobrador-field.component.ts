import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ConfigService } from 'app/utils/config.service';
import { Cobrador } from 'app/catalogos/models/cobrador';

@Component({
  selector: 'sx-cobrador-field',
  template: `
    <ng-container [formGroup]="parent">
      <mat-form-field [style.width.%]="100">
        <mat-select [placeholder]="placeholder" [formControlName]="property" class="sucursal-field">
          <mat-option></mat-option>
          <mat-option *ngFor="let cobrador of (cobradores$ | async)" [value]="cobrador">
            {{cobrador.nombres}} ({{cobrador.sw2}})
          </mat-option>
        </mat-select>
      </mat-form-field>
    </ng-container>
  `,
  styles: []
})
export class CobradorFieldComponent implements OnInit {
  @Input() parent: FormGroup;

  apiUrl: string;

  @Input() property = 'cobrador';

  @Input() placeholder = 'Cobrador';

  cobradores$: Observable<Cobrador[]>;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.apiUrl = config.buildApiUrl('cobradores');
  }

  ngOnInit() {
    this.cobradores$ = this.http.get<Cobrador[]>(this.apiUrl);
  }
}
