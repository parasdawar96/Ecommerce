import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation, NgxGalleryImageSize } from '@kolkov/ngx-gallery';
import { CommonService } from 'src/app/service/common.service';
import { ProductStateService } from 'src/app/service/product-state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import {environment} from 'src/environments/environment.prod';

declare var $: any;
@Component({
    selector: 'product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];
    productObj: any;
    sizeList: any;
    selectedSize: any;
    selectSizeError: Boolean;
    cartButtonClicked: boolean;
    addProductError: boolean;
    addedSizeList: Array<string>;
    objectKeys = Object.keys;
    constructor(private commonService: CommonService,
        private apiService: ApiService,
        private productService: ProductStateService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService) {



    }

    ngOnInit(): void {
        this.selectSizeError = false;
        this.addProductError = false;
        this.addedSizeList = [];
        this.activatedRoute.params.subscribe(params => {
            let id = params['id'];
            this.commonService.fetchSingleProduct(id);

        });
        this.productService.productDetailObs$.subscribe(response => {
            if (response) {
                this.productObj = response;
                this.sizeList = this.productObj.size;
                let picture=environment.apiBaseUrl+ this.productObj.picture;
                this.galleryImages = [
                    {
                        small: picture,
                        medium: picture,
                        big: picture
                    },
                    {
                        small: picture,
                        medium: picture,
                        big:picture
                    },
                    {
                        small: picture,
                        medium: picture,
                        big: picture
                    }
                ];
                this.galleryOptions = [
                    {
                        width: '600px',
                        height: '400px',
                        thumbnailsColumns: 3,
                        imagePercent: 100,
                        preview: false,
                        imageSize: NgxGalleryImageSize.Contain,
                        thumbnailSize: NgxGalleryImageSize.Contain,
                        imageAnimation: NgxGalleryAnimation.Slide
                    },
                    // max-width 800
                    {
                        breakpoint: 800,
                        width: '100%',
                        height: '600px',
                        imagePercent: 80,
                        thumbnailsPercent: 20,
                        thumbnailsMargin: 20,
                        thumbnailMargin: 20
                    },
                    // max-width 400
                    {
                        breakpoint: 400,
                        preview: false
                    }
                ];
        
            }

        });

     

    }

    setSelectedSize(event, sizeItem) {
        if (this.selectedSize) document.getElementById("size-" + this.selectedSize).classList.remove("selectedButton");
        this.selectedSize = sizeItem;
        if (this.addedSizeList.includes(this.selectedSize)) {
            this.cartButtonClicked = true;
        }
        else {
            this.cartButtonClicked = false;
        }
        this.selectSizeError = false;
        event.currentTarget.classList.add("selectedButton");

    }


    addToBag(ev) {

        if (this.selectedSize) {
            this.cartButtonClicked = true;
            let product = JSON.parse(JSON.stringify(this.productObj));
            product.size = this.selectedSize;
            if (!this.addedSizeList.includes(this.selectedSize)) this.addedSizeList.push(this.selectedSize);
            if (this.commonService.isLoggedIn()) {
                this.setCartProductsFromDb(product);
            }
            else {
                this.setCartproductsfromSession(product);
            }
        }
        else {
            this.selectSizeError = true;
        }

    }
    setCartProductsFromDb(product) {
        let body: any = {};
        body.product = product;
        this.apiService.addToCart(this.commonService.getUserPayload()._id, body).subscribe((response: any) => {
            this.productService.cartProductState = response;
        }, err => {
            if (err.status == 400) {
                this.cartButtonClicked = true;
                this.toastr.error('Product Already Added', 'Error', {
                    timeOut: 3000,
                    extendedTimeOut: 3000,
                    positionClass: 'toast-bottom-center'
                });
            }
        });
    }

    setCartproductsfromSession(product) {
        let cartProductsArray = this.commonService.getCartProductsToken();
        if (this.isCartNotHavingSameSizeProduct(cartProductsArray, product)) {
            cartProductsArray.push(product);
            this.productService.cartProductState = cartProductsArray;
            this.commonService.setCartproductsToken(cartProductsArray);
            this.setCartSummary();
        }
        else {
            this.cartButtonClicked = true;
            this.toastr.error('Product Already Added', 'Error', {
                timeOut: 3000,
                extendedTimeOut: 3000,
                positionClass: 'toast-bottom-center'
            });

        }
    }
    setCartSummary() {
        let cartSummaryObject = this.commonService.getCartSummaryToken();
        let discount = this.productObj.price - this.productObj.discountedPrice;
        cartSummaryObject.total = (cartSummaryObject.total) ? cartSummaryObject.total + this.productObj.price : this.productObj.price;
        cartSummaryObject.payable = (cartSummaryObject.payable) ? cartSummaryObject.payable + this.productObj.discountedPrice : this.productObj.discountedPrice;
        cartSummaryObject.discount = (cartSummaryObject.discount) ? cartSummaryObject.discount + discount : discount;
        cartSummaryObject.shipping = 0;
        this.commonService.setCartSummaryToken(cartSummaryObject);
    }

    isCartNotHavingSameSizeProduct(cartProductsArray, productObj) {
        const query = (element) => (element._id != productObj._id) || (element._id == productObj._id && productObj.size != element.size);
        let val = cartProductsArray.every(query);
        return val;
    }

    goToBag(ev) {
        this.cartButtonClicked = false;

        this.router.navigateByUrl("/cart/bag");
    }



}
