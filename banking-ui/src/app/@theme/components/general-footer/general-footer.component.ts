import { Component } from '@angular/core';

@Component({
  selector: 'ngx-general-footer',
  styleUrls: ['./general-footer.component.scss'],
  template: `
    <span class="created-by">Created with ♥ by <b><a href="https://akveo.com" target="_blank">Akveo</a></b> 2019</span>
    <div class="socials">
      <a href="#" target="_blank" class="ion ion-social-github"></a>
      <a href="#" target="_blank" class="ion ion-social-facebook"></a>
      <a href="#" target="_blank" class="ion ion-social-twitter"></a>
      <a href="#" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class GeneralFooterComponent {
}