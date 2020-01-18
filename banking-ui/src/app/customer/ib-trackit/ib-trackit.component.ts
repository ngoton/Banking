import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, style, transition, state, animate } from '@angular/animations';
import { IbTrackit, DropdownList } from './ib-trackit.model';
import { IbTrackitService } from './ib-trackit.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UtilitiesService } from '../../_services/utilities.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-ib-trackit',
  templateUrl: './ib-trackit.component.html',
  styleUrls: ['./ib-trackit.component.scss'],
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
export class IbTrackitComponent implements OnInit, OnDestroy {
  filterForm: FormGroup;
  gtTrackItList: IbTrackit[];
  requestTypeList: DropdownList[];
  searchCriteriaList: DropdownList[];
  requestType: DropdownList;
  searchCriteria: DropdownList;
  startDate: any = '';
  stopDate: any = '';
  isFilter = false;
  loading = true;
  message: any = 'Loading List...';
  reqBody: any = {};
  constructor(
    private service: IbTrackitService,
    private router: Router,
    private fb: FormBuilder,
    private util: UtilitiesService) { }

  createFilterForm() {
    this.filterForm = this.fb.group({
      'startDate': '',
      'stopDate': '',
      'trackingId': '',
    });
  }

  ngOnInit() {
    this.createFilterForm();
    setTimeout(() => {
      this.initiateRequestBody();
      // this.service.getGTTrackItList(this.reqBody);
      //   this.service.gtTrackIt$
      //     .pipe(untilDestroyed(this))
      //     .subscribe(res => {
      //       this.gtTrackItList = res;
      //       if (this.gtTrackItList.length >= 0) {
      //         this.loading = false;
      //       }
      //     });
      //   this.service.Error$
      //     .pipe(untilDestroyed(this))
      //     .subscribe(res => this.message = res);
    }, 15000);

    setTimeout(() => {
      console.log(this.gtTrackItList);
      console.log(this.requestTypeList);
      console.log(this.searchCriteriaList);
      console.log(this.reqBody);
      console.log(this.message);
    }, 5000);
  }

  makeRequest(url) {
    console.log('t');
  }

  ngOnDestroy(): void {

  }

  initiateRequestBody() {
    this.startDate = this.util.formatDate(this.filterForm.value.startDate);
    this.stopDate = this.util.formatDate(this.filterForm.value.stopDate);
    this.reqBody.requestType = this.requestType.code;
    this.reqBody.searchCriteria = this.searchCriteria.code;
    this.reqBody.startDate = this.startDate;
    this.reqBody.endDate = this.stopDate;
    this.reqBody.trackingId = this.filterForm.controls['trackingId'].value;
  }

  changeTrackItList(r) {
    this.loading = true;
    this.requestType = r;
    this.gtTrackItList = [];
    this.initiateRequestBody();
    console.log(this.reqBody); // Delete later
    // this.service.getGTTrackItList(this.reqBody);
  }

  filter(criteria) {
    this.isFilter = true;
    this.searchCriteria = criteria;
    if (this.searchCriteria.code === 1) {
      this.gtTrackItList = [];
      this.initiateRequestBody();
      console.log(this.reqBody); // Delete later
      // this.service.getGTTrackItList(this.reqBody);
      this.isFilter = false;
    }
    console.log(criteria);
  }

  doFilter() {
    this.gtTrackItList = [];
    this.initiateRequestBody();
    console.log(this.reqBody); // Delete later
    // this.service.getGTTrackItList(this.reqBody);
  }

}
