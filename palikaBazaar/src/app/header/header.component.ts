import { Component, OnInit } from '@angular/core';
import { CommonService } from '../service/common.service';
import { ProductStateService } from '../service/product-state.service';
import { ApiService } from '../service/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    queryParam;
    firstName: string = "";
    LoggedIn: boolean;
    finalQueryParam = "";
    backButton: boolean = false;
    constructor(private commonService: CommonService,
        private activatedRoute: ActivatedRoute,
        private productService: ProductStateService,
        private apiService: ApiService,
        private router: Router,
        private toastr: ToastrService) {

    }

    ngOnInit() {
        this.LoggedIn = false;
        if (this.commonService.isLoggedIn()) {
            this.LoggedIn = true;
            this.productService.loggedInState = true;
        }
        this.productService.loggedInObs$.subscribe(data => this.LoggedIn = data);
        this.productService.userDetailObs$.subscribe((data: any) => {
            console.log("user data", data);
            this.firstName = data.firstName;
        });

        let searchElem: any = document.getElementById("searchElem");
        searchElem.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                this.searchProducts();

            }
        });

        this.activatedRoute.queryParamMap.subscribe((res: any) => {
            this.finalQueryParam = this.commonService.setQueryParam(res.params);

        });

        this.productService.backButtonObs$.subscribe(data => {
            if (data) {
                this.backButton = data;
                setTimeout(() => {
                    let elem = document.getElementById("ham-menu-button");
                    elem.style.display = "none";
                    let backElem = document.getElementById("back-button-link");
                    backElem.style.display = "block";
                })


            }
            else {
                setTimeout(() => {
                    let elem = document.getElementById("ham-menu-button");
                    elem.style.display = "block";
                    let backElem = document.getElementById("back-button-link");
                    backElem.style.display = "none";
                });
            }
        })


    }
    searchProducts() {
        let searchElem: any = document.getElementById("searchElem");
        if (searchElem.value) {
            // sessionStorage.setItem("search", searchElem.value);

            // this.commonService.fetchProducts(this.finalQueryParam);

            // sessionStorage.setItem("search", "");
            let prevRoute = sessionStorage.getItem("previousRoute");
            if ((prevRoute && !prevRoute.includes("products")) || prevRoute == null) {
                this.router.navigate(
                    ['/products'],
                    {
                        relativeTo: this.activatedRoute,
                        queryParams: { search: searchElem.value },
                        queryParamsHandling: 'merge'
                    });
            }
            else {
                this.router.navigate(
                    [],
                    {
                        relativeTo: this.activatedRoute,
                        queryParams: { search: searchElem.value },
                        queryParamsHandling: 'merge'
                    });
            }

            searchElem.value = "";

        }
    }


    openHamMenu() {
        let hamElem = document.getElementById("ham-menu");
        hamElem.style.display = "block";
    }

    closeHamMenu() {
        let hamElem = document.getElementById("ham-menu");
        hamElem.style.display = "none";
    }

    logout() {
        localStorage.removeItem("token");
        this.productService.loggedInState = false;
        this.router.navigate([],
            {
                relativeTo: this.activatedRoute,
            });
        setTimeout(() => {
            this.toastr.success('Logged Out SuccessFully', 'Success', {
                timeOut: 2000,
                extendedTimeOut: 2000,
                positionClass: 'toast-top-center'
            });
        })
    }

    openSearchBar() {

    }

    goBack() {
        window.history.back();
    }

}
