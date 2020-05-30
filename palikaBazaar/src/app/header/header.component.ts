import { Component, OnInit } from '@angular/core';
import { CommonService } from '../service/common.service';
import { ProductStateService } from '../service/product-state.service';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    queryParam;
    constructor(private commonService: CommonService, private productService: ProductStateService, private apiService: ApiService, private router: Router) {
    }

    ngOnInit() {
    }

    openHamMenu() {
        let hamElem = document.getElementById("ham-menu");
        hamElem.style.display = "block";
    }

    closeHamMenu(){
        let hamElem = document.getElementById("ham-menu");
        hamElem.style.display = "none";
    }

}
