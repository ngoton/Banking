import { Component, OnDestroy, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { DebitService } from '../../../_services/debit.service';
import { CreditService } from '../../../_services/credit.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ngx-dialog-dimiss-prompt',
  templateUrl: 'dialog-dimiss-prompt.component.html',
  styleUrls: ['dialog-dimiss-prompt.component.scss']
})
export class DialogDimissPromptComponent implements OnDestroy {
  @Input() debit: any = null;
  @Input() credit: any = null;

  constructor(protected ref: NbDialogRef<DialogDimissPromptComponent>,
              private debitService: DebitService,
              private creditService: CreditService) {}

  cancel() {
    this.ref.close();
  }

  submit(content) {
    if(this.debit != null){
      this.debitService.cancel({id: this.debit.id, content: content})
      .pipe(untilDestroyed(this))
      .subscribe(
        (response: any) => {
          let dimissObject = {
            object: this.debit,
            content: content
          }
          this.ref.close(dimissObject);
        },
        (err: HttpErrorResponse) => {
          
        }
      );
    }

    if(this.credit != null){
      this.creditService.cancel({id: this.credit.id, content: content})
      .pipe(untilDestroyed(this))
      .subscribe(
        (response: any) => {
          let dimissObject = {
            object: this.credit,
            content: content
          }
          this.ref.close(dimissObject);
        },
        (err: HttpErrorResponse) => {
          
        }
      );
    }
  }

  ngOnDestroy() {

  }
}
