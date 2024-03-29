import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { OnboardingComponent } from './onboarding.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthGuard } from '../_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: OnboardingComponent,
  children: [
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full',
    },
    {
      path: 'login',
      component: LoginComponent,
    },
    {
      path: 'change-password',
      canActivate: [AuthGuard],
      component: ChangePasswordComponent,
    },
    {
      path: 'forgot-password',
      component: ForgotPasswordComponent,
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
