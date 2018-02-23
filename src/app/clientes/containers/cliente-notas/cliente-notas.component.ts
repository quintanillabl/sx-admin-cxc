import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

import { Cliente } from '../../models';

@Component({
  selector: 'sx-cliente-notas',
  templateUrl: 'cliente-notas.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClienteNotasComponent implements OnInit {
  cliente$: Observable<Cliente>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.cliente$ = this.route.parent.data.map(data => data.cliente);
  }
}
