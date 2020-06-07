import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { ProductStateService } from 'src/app/service/product-state.service';
import { CommonService } from 'src/app/service/common.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

    productList;
    prod;
    constructor(private productService: ProductStateService, private commonService: CommonService, private router: Router, private activatedRoute: ActivatedRoute) {
        // router.routeReuseStrategy.shouldReuseRoute = function(){
        //     return false;
        // };

    }

    ngOnInit() {
        this.activatedRoute.queryParamMap.subscribe((res: any) => {
            let finalQueryParam = this.commonService.setQueryParam(res.params);
            this.commonService.fetchProducts(finalQueryParam);
        });

        this.productService.productResponseObs$.subscribe((response: any) => {
            this.productList = response.products;
        });

    }



}
