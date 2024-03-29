import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {
    path: 'customer',
    canActivate: [AuthGuard],
    loadChildren: () => import('app/customer-pages/customer-pages.module')
      .then(m => m.CustomerPagesModule),
  },

  {
    path: 'employee',
    canActivate: [AuthGuard],
    loadChildren: () => import('app/employee-pages/employee-pages.module')
      .then(m => m.EmployeePagesModule),
  },

  {
    path: 'onboarding',
    loadChildren: () => import('app/onboarding/onboarding.module')
      .then(m => m.OnboardingModule),
  },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent,
      },
      {
        path: 'login',
        component: NbLoginComponent,
      },
      {
        path: 'register',
        component: NbRegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
    ],
  },
  { path: '', redirectTo: 'employee', pathMatch: 'full' },
  { path: '**', redirectTo: 'onboarding' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
