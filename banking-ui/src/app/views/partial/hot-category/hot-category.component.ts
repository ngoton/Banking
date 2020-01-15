import { Component, OnInit , ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-hot-category',
  templateUrl: './hot-category.component.html',
  styleUrls: ['./hot-category.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HotCategoryComponent implements OnInit {
  slideConfig: any;

  constructor() {
    this.slideConfig = {
      'slidesToShow': 6,
      'slidesToScroll': 6,
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
