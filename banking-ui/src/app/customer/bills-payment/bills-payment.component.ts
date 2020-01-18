import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { animate, style, transition, trigger, state } from '@angular/animations';
import { Category, Product, FormFields, Collections } from './_model/bills-payment.model';
import { UtilitiesService } from '../../_services/utilities.service';
import { BillsPaymentService } from './_services/bills-payment.service';
import { FormControl } from '@angular/forms';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bills-payment',
  templateUrl: './bills-payment.component.html',
  styleUrls: ['./bills-payment.component.scss'],
  animations: [
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translate(0)' }),
        animate('500ms ease-in-out', style({ opacity: 0 }))
      ])
    ]),
    trigger('slideUpDown', [
      state('in', style({ height: '*' })),
      transition('* => void', [
        style({ height: '*' }),
        animate('300ms', style({ height: 0 }))
      ]),
      transition('void => *', [
        style({ height: 0 }),
        animate('300ms', style({ height: '*' }))
      ]),
    ])
  ]
})
export class BillsPaymentComponent implements OnInit, OnDestroy {
  public searchModel: Collections;
  public productSearchObject: Array<Collections> = [];
  collectionError: string;
  searchInput = new FormControl('');
  public selectedCategory: Category;
  public isCategoriesCollapsed: boolean;
  public selectedBiller: string;
  public selectedForm: string;
  config: any;

  constructor(
    private billsPaymentService: BillsPaymentService,
    private aroute: ActivatedRoute,
    private router: Router) {
      // this.billsPaymentService.getCategoriesData();
      // this.billsPaymentService.getCollectionsData();
      // this.billsPaymentService.collections$.subscribe(c => this.productSearchObject = c);
      // this.billsPaymentService.collectionsError$.subscribe(err => this.collectionError = err);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
