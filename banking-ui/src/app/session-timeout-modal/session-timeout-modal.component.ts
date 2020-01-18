import { Component, OnInit, Input, OnChanges, SimpleChanges, Output } from '@angular/core';
import { EventEmitter } from 'events';
import { AuthService } from '../_services/auth.service';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-session-timeout-modal',
  templateUrl: './session-timeout-modal.component.html',
  styleUrls: ['./session-timeout-modal.component.scss']
})
export class SessionTimeoutModalComponent implements OnInit, OnChanges {
  @Input() count: number;
  @Input() countMinutes: number;
  @Input() countSeconds: number;
  @Input() progressCount: number;
  @Input() idleState: string;
  @Output() resp = new EventEmitter();

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    console.log('modal initialized');
  }

  ngOnChanges(changes: SimpleChanges) {
    const change = changes.idleState;
    if (change) {
      console.log(`idle State changed from ${change.previousValue} to ${change.currentValue}`);
      if (change.currentValue === 'IDLE_TIME_IN_PROGRESS') {
        this.openModal('sessionModal');
      } else if (change.currentValue === 'TIMED_OUT') {
        console.log('close modal');
        this.closeModal('sessionModal');
      }
    }
    // if (changes.idleState.currentValue === false) {
    //   this.openModal('effect-12');
    // } else if (changes.timedOut.currentValue === true) {
    //   console.log('session timed out.. will logout user');
    // }

  }

  response(moreTime: any) {
    this.resp.emit(moreTime);
    console.log('USer Response: ' + moreTime);
    if (moreTime === true) {
      console.log('USer Response: ' + moreTime);
      this.closeModal('sessionModal');
    } else if (moreTime === false) {
      console.log('USer Response: ' + moreTime);
      this.router.navigate(['/onboarding/logout']);
    }
  }

  openModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }

  closeModal(event) {
    document.querySelector('#' + event).classList.remove('md-show');
    // ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }

}
