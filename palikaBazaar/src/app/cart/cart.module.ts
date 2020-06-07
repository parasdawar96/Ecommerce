import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { BagComponent } from './bag/bag.component';
import { AddressComponent } from './address/address.component';
import { CartComponent } from './cart.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { ModalComponent } from './modal/modal.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [BagComponent, AddressComponent, CartComponent, OrderSummaryComponent,ModalComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    FormsModule
  ]
})
export class CartModule { }
