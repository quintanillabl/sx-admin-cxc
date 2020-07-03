import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sx-footer',
  template: `
    <div layout="row" layout-align="start center">
      <span class="md-caption"
        >Copyright &copy; 2017 Luxsoft Mx. All rights reserved
      </span>
      <span class="fill"></span>
      <span class="version"> Versión <strong>1.0.54</strong> </span>
    </div>
  `,
  styles: [
    `
      .fill {
        flex: 1;
      }
      .version {
        padding-rigt: 10px;
      }
    `,
  ],
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
