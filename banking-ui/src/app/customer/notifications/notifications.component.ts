import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  config: any;

  constructor() { }

  ngOnInit() {
  }

  toggleChat() {
    console.log('me');
  }

  toggleInnerChat() { console.log('me'); }


}
