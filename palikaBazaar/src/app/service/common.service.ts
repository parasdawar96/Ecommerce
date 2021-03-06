import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { ProductStateService } from './product-state.service';
import { ApiService } from './api.service';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart, RoutesRecognized } from '@angular/router';
import { User } from '../shared/user.model';
import { pairwise } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CommonService implements OnInit, OnDestroy {
    queryParam: any = "";
    routeSub: any;
    filterObj:{};

    selectedUser: User = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    constructor(private apiService: ApiService,
         private productService: ProductStateService, 
         private activatedRoute: ActivatedRoute, private router: Router) {
            router.events.pipe(
                pairwise()
            ).subscribe((event) =>{
                //console.log("outside",event);
                if (event[0] instanceof NavigationEnd && event[1] instanceof NavigationStart){
                    console.log("url",event[1].url);
                    console.log("old url",event[0].url);
                    if(event[1].url.includes("product")||event[1].url.includes("cart")||event[1].url.includes("account")){
                        this.productService.backButtonState=true;
                    }
                    else{
                        console.log("back button false");
                        this.productService.backButtonState=false;
                    }
                    if(!event[1].url.includes("account")){
                        sessionStorage.setItem("previousRoute",event[1].url);
                    }
                    
                }
                window.scrollTo(0, 0);
              
            } );


    }

    ngOnInit(): void {
       
        // this.router.events.pairwise().subscribe((event) => {
        //     console.log(event);
        // });
    }
    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }


    setCartproductsToken(cartProductsArray){
        cartProductsArray=JSON.stringify(cartProductsArray);
        sessionStorage.setItem("cartProducts",cartProductsArray);
    }
    getCartProductsToken(){
        let cartProducts =  sessionStorage.getItem("cartProducts");
        let token=cartProducts?JSON.parse(cartProducts):[];
        return token;
    }

    deleteCartProductsToken(){
        sessionStorage.removeItem("cartProducts");
    }

    setCartSummaryToken(cartSummaryObj){
        cartSummaryObj=JSON.stringify(cartSummaryObj);
        sessionStorage.setItem("cartSummary",cartSummaryObj);
    }

    getCartSummaryToken(){
        let cartSummary = sessionStorage.getItem("cartSummary");
        let token=cartSummary?JSON.parse(cartSummary):{};
        return token;
    }

    deleteCartSummaryToken(){
        sessionStorage.removeItem("cartSummary");
    }


    setToken(token: string) {
        localStorage.setItem('token', token);
    }

    logout() {
        this.deleteToken();
        this.router.navigateByUrl("/");
    }

    getToken() {
        return localStorage.getItem("token");
    }

    deleteToken() {
        localStorage.removeItem('token');
    }

    getUserPayload() {
        let token = this.getToken();
        if (token) {
            let userPayload = atob(token.split('.')[1]);
            return JSON.parse(userPayload);
        }
        else
            return null;
    }

    isLoggedIn() {
        let userPayload = this.getUserPayload();
        if (userPayload) {
            return userPayload.exp > Date.now() / 1000;
        }
        else
            return false;
    }


    fetchSingleProduct(id) {
        this.apiService.getProductDetails(id).subscribe(response => {
            this.productService.productDetailState = response;
        });
    }
    
    fetchProducts(finalQueryParam) {

        this.apiService.getProducts(finalQueryParam).subscribe(response => {
            this.productService.productsResponseState = response;
        });
    }

    setQueryParam(queryParamObj) {
        let queryParam = "";
        for (let key in queryParamObj) {
            let ampValue = queryParam == "" ? "" : "&";
            queryParam += ampValue + key + "=" + queryParamObj[key];
        }
        return queryParam;
    }






}



 // this.queryParam = queryParam;
    // if (selectedFilter != "") {
    //     let selectedFilterArray = selectedFilter.split("=");
    //     let selectedFilterObj: any = {};
    //     selectedFilterObj.key = selectedFilterArray[0];
    //     selectedFilterObj.value = selectedFilterArray[1];

    //     if (this.queryParam == "") {
    //         this.queryParam = selectedFilterObj.key + "=" + selectedFilterObj.value;
    //     }
    //     else if (this.queryParam.includes(selectedFilterObj.key)) {
    //         if (selectedFilterObj.key != "filter") {
    //             let keyStartIndex = this.queryParam.indexOf(selectedFilterObj.key);
    //             let ampStartIndex = this.queryParam.indexOf("&", keyStartIndex);
    //             if (ampStartIndex > -1) {
    //                 this.queryParam = this.queryParam.slice(0, keyStartIndex + selectedFilterObj.key.length + 1) + selectedFilterObj.value + this.queryParam.slice(ampStartIndex);
    //             }
    //             else {
    //                 this.queryParam = this.queryParam.slice(0, keyStartIndex + selectedFilterObj.key.length + 1) + selectedFilterObj.value;
    //             }

    //         }
    //         else {
    //             let requiredFilterArray = selectedFilterObj.value.split(":");// brand nike
    //             let queryArray = this.queryParam.split("&");
    //             queryArray = queryArray.map(queryElement => {
    //                 if (queryElement.includes("filter")) {
    //                     if (queryElement.includes(requiredFilterArray[0])) {
    //                         let filterqueryArray = queryElement.split("=");
    //                         let filterTypeArray = filterqueryArray[1].split("::");
    //                         filterTypeArray = filterTypeArray.map(element => {
    //                             let keyValArray = element.split(":");
    //                             if (keyValArray[0] == requiredFilterArray[0]) {
    //                                 keyValArray[1] += "," + requiredFilterArray[1];
    //                                 element = keyValArray.join(":");
    //                             }
    //                             return element;
    //                         });
    //                         queryElement = "filter=" + filterTypeArray.join("::");
    //                     }
    //                     else {
    //                         queryElement = queryElement + "::" + selectedFilterObj.value;
    //                     }
    //                 }
    //                 return queryElement;
    //             });
    //             this.queryParam = queryArray.join("&");
    //         }
    //     }
    //     else {
    //         this.queryParam += "&" + selectedFilterObj.key + "=" + selectedFilterObj.value;
    //     }
    // }