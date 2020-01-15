import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  slideConfig: any;

  constructor() {
    this.slideConfig = {
      'slidesToShow': 1,
      'slidesToScroll': 1,
      'nextArrow': '<a class="slick-arrow cus-slick-next" data-role="none" style="display:block">' +
        '<span class="icon" >' +
        '<i class="tikicon icon-arrow-back" ></i>' +
        '</span>' +
        '</a>',
      'prevArrow': '<a class="slick-arrow cus-slick-prev" data-role="none" style="display:block">' +
        '<span class="icon" >' +
        '<i class="tikicon icon-arrow-back" ></i>' +
        '</span>' +
        '</a>',
      // 'nextArrow': '<div class="nav-btn next-slide"></div>',
      // 'prevArrow': '<div class="nav-btn prev-slide"></div>',
      'dots': true,
      'autoplay': true,
      'autoplaySpeed': 3000,
      'infinite': true
    };
   }

  ngOnInit() {
  }

}
