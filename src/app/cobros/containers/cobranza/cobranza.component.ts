import { Component, OnInit } from '@angular/core';
import { TdMediaService } from '@covalent/core';

@Component({
  selector: 'sx-cobranza',
  templateUrl: './cobranza.component.html'
})
export class CobranzaComponent implements OnInit {
  navigation = [
    {
      path: 'list',
      title: 'Cobros',
      description: 'Registro de cobros',
      icon: 'file_download'
    }
  ];

  constructor(public media: TdMediaService) {}

  ngOnInit() {}
}
