import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductStateService {

    protected _productsResponse: Object;
    protected _productDetailResponse: Object;
    protected _orderSummary: object;
    protected _isLoading: boolean;
    protected _cartProducts: Array<object>;
    protected _deliveryAddress: object;
    protected _filterObj: object;
    protected _isLoggedIn: boolean;
    protected _userDetails: object;
    protected _backButton: boolean;


    public productResponseObs$: BehaviorSubject<Object>;
    public productDetailObs$: BehaviorSubject<Object>;
    public orderSummaryObs$: BehaviorSubject<object>;
    public isLoadingObs$: BehaviorSubject<boolean>;
    public cartProductObs$: BehaviorSubject<Array<object>>;
    public deliveryAddressObs$: BehaviorSubject<object>;
    public filterObjectObs$: BehaviorSubject<object>;
    public loggedInObs$: BehaviorSubject<boolean>;
    public userDetailObs$: BehaviorSubject<object>;
    public backButtonObs$: BehaviorSubject<boolean>;

    constructor() {
        this.initialize();
    }


    initialize() {
        this._productsResponse = {};
        this._orderSummary = {};
        this._isLoading = false;
        this._cartProducts = [];
            this._deliveryAddress = {};
        this._filterObj = {};
        this._isLoggedIn = false;
        this._userDetails = {};
        this._backButton = false;


        this.productResponseObs$ = new BehaviorSubject<Object>(this._productsResponse);
        this.productDetailObs$ = new BehaviorSubject<Object>(this._productDetailResponse);
        this.orderSummaryObs$ = new BehaviorSubject<object>(this._orderSummary);
        this.isLoadingObs$ = new BehaviorSubject<boolean>(this._isLoading);
        this.cartProductObs$ = new BehaviorSubject<Array<object>>(this._cartProducts);
        this.deliveryAddressObs$ = new BehaviorSubject<object>(this._deliveryAddress);
        this.filterObjectObs$ = new BehaviorSubject<object>(this._filterObj);
        this.loggedInObs$ = new BehaviorSubject<boolean>(this._isLoggedIn);
        this.userDetailObs$ = new BehaviorSubject<object>(this._userDetails);
        this.backButtonObs$ = new BehaviorSubject<boolean>(this._backButton);
    }

    public get productsResponseState() {
        return this._productsResponse;
    }

    public set productsResponseState(response) {
        this._productsResponse = response;
        this.productResponseObs$.next(this._productsResponse);
    }

    public get productDetailState() {
        return this._productDetailResponse;
    }

    public set productDetailState(response) {
        this._productDetailResponse = response;
        this.productDetailObs$.next(this._productDetailResponse);
    }

    public get orderSummaryState() {
        return this._orderSummary;
    }

    public set orderSummaryState(response) {
        this._orderSummary = response;
        this.orderSummaryObs$.next(this._orderSummary);
    }

    public get loadingState() {
        return this._isLoading;
    }

    public set loadingState(response) {
        this._isLoading = response;
        this.isLoadingObs$.next(this._isLoading);
    }


    public get cartProductState() {
        return this._cartProducts;
    }

    public set cartProductState(response) {
        this._cartProducts = response;
        this.cartProductObs$.next(this._cartProducts);
    }

    public get deliveryAddressState() {
        return this._deliveryAddress;
    }

    public set deliveryAddressState(response) {
        this._deliveryAddress = response;
        this.deliveryAddressObs$.next(this._deliveryAddress);
    }

    public get filterObjectState() {
        return this._filterObj;
    }

    public set filterObjectState(response) {
        this._filterObj = response;
        this.filterObjectObs$.next(this._filterObj);
    }

    public get loggedInState() {
        return this._isLoggedIn;
    }

    public set loggedInState(response) {
        this._isLoggedIn = response;
        this.loggedInObs$.next(this._isLoggedIn);
    }

    public get userDetailState() {
        return this._userDetails;
    }

    public set userDetailState(response) {
        this._userDetails = response;
        this.userDetailObs$.next(this._userDetails);
    }
    
    public get backButtonState() {
        return this._backButton;
    }

    public set backButtonState(response) {
        this._backButton = response;
        this.backButtonObs$.next(this._backButton);
    }

}
