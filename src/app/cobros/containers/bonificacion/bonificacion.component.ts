import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TdDialogService, TdLoadingService } from '@covalent/core';
import { Cartera } from '../../models/cartera';
import { NotascxcService } from '../../services';

@Component({
  selector: 'sx-bonificacion',
  template: `
    <mat-card>
    <div  *tdLoading="'procesando'; mode:'indeterminate'; type:'circle'; strategy:'overlay'; color:'accent'">
      <ng-container *ngIf="!notaDeCredito">
        <sx-bonificacion-form
          (save)="onSave($event)"
          (cancelar)="onCancel()"  [cartera]="cartera.clave">
        </sx-bonificacion-form>
      </ng-container>
    </div>
    </mat-card>
  `,
  styles: []
})
export class BonificacionComponent implements OnInit {
  cartera: Cartera;
  notaDeCredito: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: NotascxcService,
    private dialogService: TdDialogService,
    private loadingService: TdLoadingService
  ) {}

  ngOnInit() {
    this.route.parent.data.subscribe(data => {
      this.cartera = data.cartera;
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSave(nota) {
    // console.log('Salvando nota: ', nota);
    this.loadingService.register('procesando');
    this.service
      .save(nota)
      .finally(() => this.loadingService.resolve('procesando'))
      .catch(error2 => this.handelError2(error2))
      .subscribe((res: any) => {
        console.log('Nota persistida: ', res);
        this.router.navigate(['../show', res.id], { relativeTo: this.route });
      });
  }

  handelError2(response) {
    const message = response.error
      ? response.error.message
      : 'Error en servidor';
    const ref = this.dialogService.openAlert({
      title: `Error ${response.status}`,
      message: message,
      closeButton: 'Cerrar'
    });
    return Observable.empty();
  }
}