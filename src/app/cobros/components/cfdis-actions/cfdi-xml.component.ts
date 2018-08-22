import { Component, OnInit, Input } from '@angular/core';
import { CfdiService } from '../../services';

@Component({
  selector: 'sx-cfdi-xml',
  template: `
  <button mat-button type="button" (click)="mostrarXml()">
    <mat-icon>dvr</mat-icon> Ver XML
  </button>
  `
})
export class CfdiXmlComponent implements OnInit {
  @Input() cfdi: { id: string };
  constructor(private service: CfdiService) {}

  ngOnInit() {}

  mostrarXml() {
    this.service.mostrarXml(this.cfdi).subscribe(res => {
      const blob = new Blob([res], {
        type: 'text/xml'
      });
      const fileURL = window.URL.createObjectURL(blob);
      window.open(fileURL, '_blank');
    });
  }
}
