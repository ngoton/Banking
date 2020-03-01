import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-status-card',
  styleUrls: ['./status-card.component.scss'],
  template: `
    <nb-card (click)="on = !on" [ngClass]="{'off': !on}">
      <div class="icon-container">
        <div class="icon status-{{ type }}">
          <ng-content></ng-content>
        </div>
      </div>

      <div class="details">
        <div class="title h5">{{ title }}</div>
        <div class="status-default" *ngIf="on">{{ content }}</div>
        <div class="status-default" *ngIf="on">{{ subcontent }}</div>
        <div class="status-active paragraph-2">{{ on ? 'Đang hoạt động' : 'Đã khóa' }}</div>
      </div>
    </nb-card>
  `,
})
export class StatusCardComponent {

  @Input() title: string;
  @Input() content: string;
  @Input() subcontent: string;
  @Input() type: string;
  @Input() on = true;
}
