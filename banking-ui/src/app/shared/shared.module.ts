import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SpinnerComponent} from './spinner/spinner.component';
import { ModalAnimationComponent } from './modal-animation/modal-animation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SpinnerComponent,
    ModalAnimationComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SpinnerComponent,
    ModalAnimationComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule {}
