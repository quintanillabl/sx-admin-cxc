import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';




import { Cobro } from '../models/cobro';
import { CobrosService } from './cobros.service';

@Injectable()
export class CobroResolver implements Resolve<Cobro> {
  constructor(private service: CobrosService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Cobro> {
    return this.service.get(route.paramMap.get('id'));
  }
}
