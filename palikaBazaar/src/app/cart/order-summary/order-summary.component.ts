import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductStateService } from 'src/app/service/product-state.service';
import { ApiService } from 'src/app/service/api.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

declare var Razorpay: any;
@Component({
    selector: 'order-summary',
    templateUrl: './order-summary.component.html',
    styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {
    cartSummary: any;
    loggedIn: boolean;
    deliveryAddress: object;
    inCart: boolean = true;
    inCheckOut: boolean = false;
    razorPayOptions: any = {
        key: "",
        order_id: "",
        amount: 0,
        currency: "INR",
        handler: function (res) {
            console.log("this is response:", res);
        }

    };;
    static apiService:ApiService;

    constructor(private commonService: CommonService,
        private apiService: ApiService,
        private router: Router,
        private toastr: ToastrService,
        private productStateService: ProductStateService,
        private activatedRoute: ActivatedRoute,
        private location: Location) {
            OrderSummaryComponent.apiService = this.apiService;
         }

    ngOnInit(): void {
        this.productStateService.orderSummaryObs$.subscribe(response => this.cartSummary = response);
        this.productStateService.deliveryAddressObs$.subscribe(response => this.deliveryAddress = response);
        let inCart = sessionStorage.getItem("inCart");
        if (inCart) {
            this.inCart = inCart == "true";
        }
        this.location.onUrlChange(url => {
            console.log("inside location url ", url);
            if (this.commonService.isLoggedIn()) {
                if (url.includes("bag")) {
                    this.inCart = true;
                    sessionStorage.setItem("inCart", "true");
                }
                else if (url.includes("address")) {
                    this.inCart = false;
                    sessionStorage.setItem("inCart", "false");
                }
            }
        });
        if (this.commonService.isLoggedIn()) {
            this.loggedIn = true;
        }
        else {
            this.cartSummary = this.commonService.getCartSummaryToken();
            this.loggedIn = false;
        }



    }


    setPreviousRoute() {
        sessionStorage.setItem("previousRoute", this.router.url);
    }
    goToAddress() {
        // this.inCart = false;
        // sessionStorage.setItem('inCart', "false");
    }

    checkSelectedAddress() {
        if (Object.keys(this.deliveryAddress).length != 0 && this.deliveryAddress.constructor === Object) {
            this.goToCheckOut();
        }
        else {
            this.toastr.error('Select Delivery Address', 'Error', {
                timeOut: 3000,
                extendedTimeOut: 3000,
                positionClass: 'toast-top-right'
            });
        }

    }

    goToCheckOut() {
        // this.inCheckOut=true;
        // sessionStorage.setItem('inCheckOut','true');
        let body = {
            user_id: this.commonService.getUserPayload()._id,
            products: this.productStateService.cartProductState,
            purchase_amount: this.cartSummary.payable,
            address: this.productStateService.deliveryAddressState
        }

        this.apiService.purchase(body).subscribe((response: any) => {
            let payload = response.payload;
            if (payload["key"] && payload["dbRes"]["razorpay_order_id"]) {
                let dbRes = payload["dbRes"];
                this.razorPayOptions.key = payload["key"];
                this.razorPayOptions.order_id = dbRes["razorpay_order_id"];
                this.razorPayOptions.amount = dbRes["amount"];
                this.razorPayOptions.handler = this.razorPayResponseHandler;
                console.log("razorpay options", this.razorPayOptions);
                sessionStorage.setItem("orderId", dbRes["_id"]);
                var rzp1 = new Razorpay(this.razorPayOptions);
                rzp1.open();
                console.log("opened");
            }

        }, err => {
            var b = err;
        })

    }

    razorPayResponseHandler(response) {
        console.log("final response", response);
        let orderId = sessionStorage.getItem("orderId");

        let paymentObject = {
            _id: orderId,
            payment: response
        }
        console.log("payment object ", paymentObject);
        OrderSummaryComponent.apiService.updateOrder(paymentObject).subscribe(response => {
            console.log(response);
        },
            err => {
                console.log(err);
            })
        // BuyGiftCardComponent.API_SERVICE.http_put(CommonURL.URL_PURCHASE_GIFT_CARD_SUCCESS,paymentObject).subscribe(success=>{
        //   console.log("success");
        //   alert("payment success send to success page");

        //  },error=>{
        //   BuyGiftCardComponent.API_SERVICE.http_delete(CommonURL.URL_PURCHASE_GIFT_CARD_ERROR,{_id:paymentObject._id}).subscribe(success_delete=>{
        //     console.log("error in payment payment suucessfull deleted from db");

        //   },error=>{
        //     console.log("error",error)
        //   })
        //   console.log("error",error)
        //  })
    }

}
