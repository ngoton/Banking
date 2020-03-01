import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { messages } from '../customer-pages/extra-components/chat/messages';
import { IBankingCustomerHeaderComponent } from '../@theme/components';

@Injectable({
  providedIn: 'root'
})
export class NotificationSocketService {
  webSocketEndPoint: string = environment.BASE_URL + `/ws`;
  topic: string = "/user/queue/notification";
  notification: any;

  constructor() {
   }

  Connection() {
    let socketServer = new SockJS(this.webSocketEndPoint);
    let stompClient = Stomp.over(socketServer);

    return stompClient;
  }
}
