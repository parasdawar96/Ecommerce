import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CenterComponent } from './center/center.component'
import { HomePageComponent } from './center/home-page/home-page.component';
import { ProductDetailComponent } from './center/product-detail/product-detail.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { LoginComponent } from './user/login/login.component';
 
import { AuthGuard } from './auth/auth.guard';
import { ProfileComponent } from './user/profile/profile.component';
import { ProductMainComponent } from './center/product-main/product-main.component';
import { SuccessComponent } from './success/success.component';

const appRoutes: Routes = [
    {
        path: '', component: CenterComponent,
        children: [
            { path: 'home', component: HomePageComponent},
            { path: 'products', component: ProductMainComponent },
            { path: 'product-details/:id', component: ProductDetailComponent },
            { path: 'account/signup', component: SignUpComponent },
            { path: 'account/login', component: LoginComponent },
            { path: 'account/profile', component: ProfileComponent, canActivate: [AuthGuard] },
            { path: '', redirectTo: '/home', pathMatch: 'full' },
            {path: 'success', component: SuccessComponent,pathMatch: 'full'}
        ]
    },
    {
        path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule)
    }
];


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
