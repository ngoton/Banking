import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './_services/auth.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { NgxAnalyticsGoogleAnalytics } from 'ngx-analytics/ga';
import * as JsEncryptModule from 'jsencrypt';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {
  title = "internet-banking-ui";

  constructor(
    // private auth: AuthService,
    private router: Router
    // private ngxAnalytics: NgxAnalyticsGoogleAnalytics
  ) {
    const encr = new JsEncryptModule.JSEncrypt();
    console.log(encr);
  }

  ngOnInit() {
    this.router.events.pipe(untilDestroyed(this)).subscribe(evt => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  ngOnDestroy(): void {}
}
