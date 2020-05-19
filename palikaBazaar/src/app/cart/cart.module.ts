import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { BagComponent } from './bag/bag.component';
import { AddressComponent } from './address/address.component';
import { CartComponent } from './cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';


@NgModule({
  declarations: [BagComponent, AddressComponent, CartComponent, CheckoutComponent, OrderSummaryComponent],
  imports: [
    CommonModule,
    CartRoutingModule
  ]
})
export class CartModule { }
