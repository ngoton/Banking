import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-dialog-dimiss-prompt',
  templateUrl: 'dialog-dimiss-prompt.component.html',
  styleUrls: ['dialog-dimiss-prompt.component.scss'],
})
export class DialogDimissPromptComponent {

  constructor(protected ref: NbDialogRef<DialogDimissPromptComponent>) {}

  cancel() {
    this.ref.close();
  }

  submit(content) {
    this.ref.close(content);
  }
}
