import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
    providedIn: 'root'
})
export class ProductStateService {

    protected _productsResponse: Object;
    protected _productDetailResponse: Object;
    protected _orderSummary: object;
    protected _isLoading: boolean;


    public productResponseObs$: BehaviorSubject<Object>;
    public productDetailObs$: BehaviorSubject<Object>;
    public orderSummaryObs$: BehaviorSubject<object>;
    public isLoadingObs$:BehaviorSubject<boolean>;


    constructor() {
        this.initialize();
    }


    initialize() {
        this._productsResponse = {};
        this._orderSummary = {};
        this._isLoading=false;


        this.productResponseObs$ = new BehaviorSubject<Object>(this._productsResponse);
        this.productDetailObs$ = new BehaviorSubject<Object>(this._productDetailResponse);
        this.orderSummaryObs$ = new BehaviorSubject<object>(this._orderSummary);
        this.isLoadingObs$= new BehaviorSubject<boolean>(this._isLoading);


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


}
