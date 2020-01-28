import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-transfer-type',
  templateUrl: './transfer-type.component.html',
  styleUrls: ['./transfer-type.component.scss']
})
export class TransferTypeComponent implements OnInit, OnDestroy {
  @ViewChild('item', { static: true }) accordion;

  toggle() {
    this.accordion.toggle();
  }

  constructor(private themeService: NbThemeService) {}

  ngOnInit() {
  }

  ngOnDestroy() {}

}
