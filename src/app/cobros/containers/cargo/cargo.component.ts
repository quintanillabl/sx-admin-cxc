import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NotadecargoService } from '../../services';
import { TdLoadingService } from '@covalent/core';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'sx-nota-de-cargo-create',
  template: `
    <div layout="flex" layout-align="center"
      *tdLoading="'processing'; mode:'indeterminate'; type:'circle'; strategy:'overlay'; color:'accent'">
      <sx-notadecargo-form [cartera]="cartera.clave" flex
        (cancel)="onCancel($event)"
        (save)="onSave($event)">
      </sx-notadecargo-form>

    </div>
  `,
  styles: []
})
export class CargoComponent implements OnInit {
  cartera;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: NotadecargoService,
    private _loadingService: TdLoadingService
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
    console.log('Persistir nota de cargo: ', nota);
    this._loadingService.register('processing');
    this.service
      .save(nota)
      .pipe(finalize(() => this._loadingService.resolve('processing')))
      .subscribe((res: any) => {
        console.log('Res: ', res);
        // this.router.navigate(['../'], {relativeTo: this.route})
        this.router.navigate(['../show', res.id], { relativeTo: this.route });
      });
  }
}
