import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { ApiService } from 'src/app/service/api.service';
import { ProductStateService } from 'src/app/service/product-state.service';

@Component({
    selector: 'app-bag',
    templateUrl: './bag.component.html',
    styleUrls: ['./bag.component.scss']
})
export class BagComponent implements OnInit {
    cartProducts: any;
    constructor(private commonService: CommonService, private apiService: ApiService, private productStateService: ProductStateService) { }

    ngOnInit(): void {
        if (this.commonService.isLoggedIn()) {
            let body: any = {};
            body.products = this.commonService.getCartProductsToken();
            body.summary = this.commonService.getCartSummaryToken();
            this.apiService.fetchCart(this.commonService.getUserPayload()._id, body).subscribe((response: any) => {
                this.cartProducts = response.products;
                this.productStateService.orderSummaryState = response.cartSummary;
                this.commonService.deleteCartProductsToken();
                this.commonService.deleteCartSummaryToken();
            }, err => console.log("err", err));
        }
        else {
            this.cartProducts = this.commonService.getCartProductsToken();

        }

    }


    removeItemFromCart(item) {
        if (this.commonService.isLoggedIn()) {
            let body: any = {};
            body.product = item;
            this.apiService.removeFromCart(this.commonService.getUserPayload()._id, body).subscribe((response: any) => {
                this.cartProducts = response.products;
                this.productStateService.orderSummaryState = response.cartSummary;
            }, err => {
                var b = err;
            })
        } 
        else {
            this.cartProducts= this.commonService.getCartProductsToken().filter(elem=>(elem._id!=item._id)||(item._id==elem._id && item.size!=elem.size));
            this.commonService.setCartproductsToken(this.cartProducts);
            var cart=this.commonService.getCartSummaryToken();
            cart.total-=item.total;
            cart.payable-=item.disCountedPrice;
            cart.discount-=(item.total-item.disCountedPrice);
            this.productStateService.orderSummaryState= cart;
            this.commonService.setCartSummaryToken(cart);

        }
    }


}
