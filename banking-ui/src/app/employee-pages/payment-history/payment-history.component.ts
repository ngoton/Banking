import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import {
  NbSortDirection,
  NbSortRequest,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder
} from '@nebular/theme';


interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  transaction_type: string;
  content: string;
  date: string;
  money: string;
}

@Component({
  selector: 'ngx-transaction-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss']
})
export class PaymentHistoryComponent {
 
}

// @Component({
//   selector: 'ngx-fs-icon',
//   template: `
//     <nb-tree-grid-row-toggle
//       [expanded]="expanded"
//       *ngIf="isDir(); else fileIcon"
//     >
//     </nb-tree-grid-row-toggle>
//     <ng-template #fileIcon>
//       <nb-icon icon="corner-down-right"></nb-icon>
//     </ng-template>
//   `
// })

// export class FsIconComponent {
//   @Input() kind: string;
//   @Input() expanded: boolean;

//   isDir(): boolean {
//     return this.kind !== null;
//   }
// }
