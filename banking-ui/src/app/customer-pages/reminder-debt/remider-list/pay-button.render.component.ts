import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';


@Component({
  template: `
      <i (click)="onClick()" class="nb-checkmark" ngIf="show"></i>
  `,
})
export class PayButtonRenderComponent implements ViewCell, OnInit {

  @Input() value: string | number;
  @Input() show: boolean;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();
  

  ngOnInit(){

  }
  
  onClick() {
    alert('id row '+this.rowData.id)
  }


}