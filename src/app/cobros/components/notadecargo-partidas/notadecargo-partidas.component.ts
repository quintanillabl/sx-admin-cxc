import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ChangeDetectorRef
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'sx-notadecargo-partidas',
  templateUrl: './notadecargo-partidas.component.html',
  styles: []
})
export class NotadecargoPartidasComponent implements OnInit {
  @Input() parent: FormGroup;
  @Input() cartera: string;

  @Input() partidas = [];

  @Output() delete = new EventEmitter();

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.parent.get('partidas').valueChanges.subscribe(val => {
      console.log('Partidas cambio: ', val);
      this.cd.detectChanges();
    });
  }

  get invalid() {
    return false;
    /*
    return (
      this.parent.get('partidas').value.length === 0 && this.cartera !== 'CHE'
    );
    */
  }
}
