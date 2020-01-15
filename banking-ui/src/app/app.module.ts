import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';
import { TikiLayoutModule } from './containers/tiki-layout/tiki-layout.module';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { NguoiDungModule } from './views/nguoi-dung/nguoi-dung.module';

import { HomeComponent } from './views/home/home.component';
import { TikiNavBarComponent } from './views/partial/tiki-nav-bar/tiki-nav-bar.component';
import { HotCategoryComponent } from './views/partial/hot-category/hot-category.component';
import { HotWordComponent } from './views/partial/hot-word/hot-word.component';
import { LoadingProductListComponent } from './views/partial/loading-product-list/loading-product-list.component';

// Import your library
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { BannerComponent } from './views/partial/banner/banner.component';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    TikiLayoutModule,
    NguoiDungModule,
    // Specify your library as an import
    SlickCarouselModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    TikiNavBarComponent,
    HotCategoryComponent,
    HotWordComponent,
    LoadingProductListComponent,
    BannerComponent
  ],
  // providers: [{
  //   provide: LocationStrategy,
  //   useClass: HashLocationStrategy
  // }],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
