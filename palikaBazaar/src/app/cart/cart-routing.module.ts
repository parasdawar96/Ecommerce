import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { BagComponent } from './bag/bag.component';
import { CartComponent } from './cart.component';



const routes: Routes = [
    {
        path: '', component: CartComponent,
        children: [
            { path: 'address', component: AddressComponent },
            { path: 'bag', component: BagComponent }            
        ]
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CartRoutingModule { }
