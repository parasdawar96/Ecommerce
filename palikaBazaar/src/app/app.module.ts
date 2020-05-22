import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule }    from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AuthGuard } from './auth/auth.guard';
import {AuthInterceptor} from './auth/auth.interceptor';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FiltersComponent } from './center/filters/filters.component';
import { BreadCrumbComponent } from './center/bread-crumb/bread-crumb.component';
import { SortComponent } from './center/sort/sort.component';
import { ProductsComponent } from './center/products/products.component';
import { CenterComponent } from './center/center.component';
import { ProductDetailComponent } from './center/product-detail/product-detail.component';
import { LoginComponent } from './user/login/login.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { ProfileComponent } from './user/profile/profile.component';
import { HomePageComponent } from './center/home-page/home-page.component';
import { ProductMainComponent } from './center/product-main/product-main.component';

import { SwiperModule } from 'ngx-swiper-wrapper';
import { NgSelectModule } from '@ng-select/ng-select';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { ToastrModule } from 'ngx-toastr';


const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FiltersComponent,
    BreadCrumbComponent,
    SortComponent,
    ProductsComponent,
    CenterComponent,
    HomePageComponent,
    ProductDetailComponent,
    LoginComponent,
    SignUpComponent,
    ProfileComponent,
    ProductMainComponent,



  ],
  imports: [
    BrowserModule,
    FormsModule,
    SwiperModule,
    AppRoutingModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgSelectModule,
    SlickCarouselModule,
    NgxGalleryModule,
    ToastrModule.forRoot({
        iconClasses : {
            error: 'toast-error',
            info: 'toast-info',
            success: 'toast-success',
            warning: 'toast-warning'
          }
    }),
  ],
  providers: [{
    provide: SWIPER_CONFIG, 
    useValue: DEFAULT_SWIPER_CONFIG
  },AuthGuard,{
      provide:HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
