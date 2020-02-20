import { Component, OnInit, Input, ViewEncapsulation, OnChanges, SimpleChange, ChangeDetectionStrategy, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Customers } from '../../_models/customer.model';

@Component({
  selector: 'ngx-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent implements OnInit {
  private showResult: boolean = false;

  @Input() keywork: string = "";
  @Output() keyworkChange: EventEmitter<string> = new EventEmitter<string>();

  @Input() valueshow: string = "";
  @Output() valueshowChange: EventEmitter<any> = new EventEmitter<any>();

  @Input() placeholder: string;
  @Input() dataSource: string;

  @Input() response: any;
  @Output() responseChange: EventEmitter<any> = new EventEmitter<any>();

  @Output() callBackFunc: EventEmitter<any> = new EventEmitter<any>();

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }

  keyworkChanged(event){
    this.keyworkChange.emit(this.keywork);

    this.httpClient.get<any>(`${this.dataSource}/${this.keywork}`).pipe(retry(3))
    .subscribe(
      (res: any) => {
        this.response = res;
        
        this.valueshowChange.emit(this.valueshow);
        this.callBackFunc.emit(this.response);

        this.showResult = true;
      }
    );
  }

  selectResult() {
    this.showResult = false;
    this.responseChange.emit(this.response);
  }

}
