import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ProductStateService } from './service/product-state.service';
import {fader} from './route-animations';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations:[
        fader
    ]
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

    prepareRoute(outlet :RouterOutlet){
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animations'];
    }

}
