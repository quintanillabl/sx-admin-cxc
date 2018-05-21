import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromCheques from '../../store/actions/cheques.actions';
import { ChequeDevuelto } from '../../models/chequeDevuelto';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'sx-cheques',
  templateUrl: './cheques.component.html',
  styles: [],
})
export class ChequesComponent implements OnInit {
  cheques$: Observable<ChequeDevuelto[]>;

  constructor(private store: Store<fromStore.CobranzaChequesDevueltosState>) {}

  ngOnInit() {
    this.cheques$ = this.store.select(fromStore.getAllCheques);
    // this.store.dispatch(new fromCheques.LoadChequesAction());
  }
}
