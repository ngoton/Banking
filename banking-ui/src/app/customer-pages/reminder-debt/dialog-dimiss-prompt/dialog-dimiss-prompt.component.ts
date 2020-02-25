import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { DebitService } from '../../../_services/debit.service';
import { CreditService } from '../../../_services/credit.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ngx-dialog-dimiss-prompt',
  templateUrl: 'dialog-dimiss-prompt.component.html',
  styleUrls: ['dialog-dimiss-prompt.component.scss'],
})
export class DialogDimissPromptComponent {
  @Input() debitId: number = null;
  @Input() creditId: number = null;

  constructor(protected ref: NbDialogRef<DialogDimissPromptComponent>,
              private debitService: DebitService,
              private creditService: CreditService) {}

  cancel() {
    this.ref.close();
  }

  submit(content) {
    if(this.debitId != null){
      this.debitService.cancel({id: this.debitId, content: content})
      .pipe(untilDestroyed(this))
      .subscribe(
        (response: any) => {
          this.ref.close(content);
        },
        (err: HttpErrorResponse) => {
          
        }
      );
    }

    if(this.creditId != null){
      this.creditService.cancel({id: this.creditId, content: content})
      .pipe(untilDestroyed(this))
      .subscribe(
        (response: any) => {
          this.ref.close(content);
        },
        (err: HttpErrorResponse) => {
          
        }
      );
    }
  }
}
