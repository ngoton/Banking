import { Injectable, OnDestroy } from '@angular/core';
import { UtilitiesService } from '../../_services/utilities.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IBNotificationsService implements OnDestroy {

  constructor(
    private util: UtilitiesService,
    private http: HttpClient
  ) { }

  ngOnDestroy(): void {

  }
}
