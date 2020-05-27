import { Component, OnInit } from '@angular/core';
import { ProductStateService } from '../service/product-state.service';
import { CommonService } from '../service/common.service';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
    cartProducts:any;
  constructor(private productService:ProductStateService,
    private commonService:CommonService,
    private apiService:ApiService,
    private productStateService:ProductStateService) { }

  ngOnInit(): void {
    if (this.commonService.isLoggedIn()) {
        let body: any = {};
        body.products = this.commonService.getCartProductsToken();
        body.summary = this.commonService.getCartSummaryToken();
        this.apiService.fetchCart(this.commonService.getUserPayload()._id, body).subscribe((response: any) => {
            this.cartProducts = response.products;
            this.productStateService.cartProductState = this.cartProducts;
            this.productStateService.orderSummaryState = response.cartSummary;
            this.commonService.deleteCartProductsToken();
            this.commonService.deleteCartSummaryToken();
        }, err => console.log("err", err));
    }
    else {
        this.cartProducts = this.commonService.getCartProductsToken();
        this.productStateService.cartProductState = this.cartProducts;
    }
    
  }

}
