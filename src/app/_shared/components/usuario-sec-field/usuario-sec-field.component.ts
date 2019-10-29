import {Component, Input, OnInit, Output, EventEmitter, ViewContainerRef} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';

import {TdDialogService} from '@covalent/core';
import {ConfigService} from 'app/utils/config.service';

import { User } from 'app/_core/models/user';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'sx-usuario-sec-field',
  template: `
  <mat-form-field  class="fill">
    <input type="password" matInput (keydown.enter)="search(input.value)"
      [placeholder]="placeholder" [disabled]="disabled" #input>
    <mat-error>
      Autoización
    </mat-error>
  </mat-form-field>
   `,
  styles: ['.fill { width: 100%; }'],
})
export class UsuarioSecFieldComponent implements OnInit {

  @Input() placeholder = 'Usuario';

  @Input() disabled = false;

  @Output() usuarioFound = new EventEmitter<User>();

  private procesando = false;

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
  ) { }

  ngOnInit() {
  }

  search(val) {
    const url = this.config.buildApiUrl('users/buscarPorNip');
    const params = new HttpParams()
    .set('nip', val);
    return this.http.get<User>(url, {params: params})
      .subscribe( res => {
         this.usuarioFound.emit(res);
      }, error2 => {
        this.handleError(error2);
      });
  }


  handleError(error) {
    window.alert('No permitido para autorizar');
    /*
    this._dialogService.openAlert({
      message: ' Usuario no localizado',
      disableClose: true,
      viewContainerRef: this._viewContainerRef,
      title: 'Aviso',
      closeButton: 'Cerrar',
    });
    */
  }

}
