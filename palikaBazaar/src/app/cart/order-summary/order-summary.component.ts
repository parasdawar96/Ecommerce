import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { Router } from '@angular/router';
import { ProductStateService } from 'src/app/service/product-state.service';

@Component({
    selector: 'order-summary',
    templateUrl: './order-summary.component.html',
    styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {
    cartSummary: any;
    loggedIn: boolean;
    constructor(private commonService: CommonService, private router: Router, private productStateService: ProductStateService) { }

    ngOnInit(): void {
        this.productStateService.orderSummaryObs$.subscribe(response => this.cartSummary = response);
        if (!this.commonService.isLoggedIn()) {
            this.loggedIn = false;
            this.cartSummary = this.commonService.getCartSummaryToken();
        } else {
            this.loggedIn = true;
        }
    }


    setPreviousRoute() {
        sessionStorage.setItem("previousRoute", this.router.url);
    }

}
