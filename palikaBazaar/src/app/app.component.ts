import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductStateService } from './service/product-state.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'palikaBazaar';
    isLoading:boolean=false;
    constructor(router: Router, private productService: ProductStateService) { }
    ngOnInit(): void {
        this.productService.isLoadingObs$.subscribe(res=>{
            this.isLoading=res;
        });
    }

}
