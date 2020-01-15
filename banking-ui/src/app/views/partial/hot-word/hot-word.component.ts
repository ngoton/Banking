import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-hot-word',
  templateUrl: './hot-word.component.html',
  styleUrls: ['./hot-word.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HotWordComponent implements OnInit {
  slideConfigWord: any;

  constructor() {
    this.slideConfigWord = {
      'slidesToShow': 8,
      'slidesToScroll': 8,
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
      'dots': false,
      'infinite': false
    };
   }

  ngOnInit(): void {
  }

}
