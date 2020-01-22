import { Component } from '@angular/core';

@Component({
  selector: 'ngx-ibanking-customer-footer',
  styleUrls: ['./ibanking-customer-footer.component.scss'],
  template: `
    <span class="created-by">Modified by <b>NMP</b> 2020</span>
    <div class="socials">
      <a href="#" target="_blank" class="ion ion-social-github"></a>
      <a href="#" target="_blank" class="ion ion-social-facebook"></a>
      <a href="#" target="_blank" class="ion ion-social-twitter"></a>
      <a href="#" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class IBankingCustomerFooterComponent {
}
