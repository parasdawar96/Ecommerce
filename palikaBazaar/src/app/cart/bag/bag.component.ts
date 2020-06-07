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
    backendHost="http://localhost:3001";
    constructor(private commonService: CommonService, private apiService: ApiService, private productStateService: ProductStateService) { }

    ngOnInit(): void {
        this.productStateService.cartProductObs$.subscribe(data=>{
                this.cartProducts=data;
        });


    }


    removeItemFromCart(item) {
        if (this.commonService.isLoggedIn()) {
            let body: any = {};
            body.product = item;
            this.apiService.removeFromCart(this.commonService.getUserPayload()._id, body).subscribe((response: any) => {
                this.cartProducts = response.products;
                this.productStateService.cartProductState = this.cartProducts;
                this.productStateService.orderSummaryState = response.cartSummary;
            }, err => {
                var b = err;
            })
        } 
        else {
            this.cartProducts= this.commonService.getCartProductsToken().filter(elem=>(elem._id!=item._id)||(item._id==elem._id && item.size!=elem.size));
            this.productStateService.cartProductState = this.cartProducts;
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
