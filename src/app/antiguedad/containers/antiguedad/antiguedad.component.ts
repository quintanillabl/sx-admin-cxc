import { Component, OnInit } from '@angular/core';
import { TdMediaService } from '@covalent/core';

@Component({
  selector: 'sx-antiguedad',
  templateUrl: './antiguedad.component.html',
  styles: []
})
export class AntiguedadComponent implements OnInit {
  constructor(public media: TdMediaService) {}

  ngOnInit() {}

  antiguedadGlobal() {}
}
