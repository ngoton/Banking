import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-loading-product-list',
  templateUrl: './loading-product-list.component.html',
  styleUrls: ['./loading-product-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoadingProductListComponent implements OnInit {
  @Input() isLoading: Boolean = true;
  constructor() { }

  ngOnInit() {
  }

}
