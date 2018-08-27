import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sx-filter-button',
  template: `
    <button mat-button mat-icon-button (click)="click.emit($event)" ><mat-icon [color]="color">filter_list</mat-icon></button>
  `
})
export class FilterButtonComponent implements OnInit {
  @Output() click = new EventEmitter();
  @Input() color = 'primary';
  constructor() {}

  ngOnInit() {}
}
