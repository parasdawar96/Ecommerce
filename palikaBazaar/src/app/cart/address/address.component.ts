import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { CommonService } from 'src/app/service/common.service';
import { ProductStateService } from 'src/app/service/product-state.service';

@Component({
    selector: 'app-address',
    templateUrl: './address.component.html',
    styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
    modalHeader: string = "Add New Address";
    showModal: boolean = false;
    addModel: any;
    addressList: Array<object>;
    radioButtonValues: Array<any> = [];
    selectedAddress: object;

    constructor(private apiService: ApiService, private commonService: CommonService, private productService: ProductStateService) { }

    ngOnInit(): void {
        this.addModel = {
            name: '',
            mobile: '',
            address: '',
            locality: '',
            pincode: '',
            city: '',
            state: ''
        }

        this.fetchAddress();
    }


    fetchAddress() {
        this.apiService.fetchAddress(this.commonService.getUserPayload()._id).subscribe((res: any) => {
            let list = res.user.address;
            list = list.map((elem, index) => {
                elem.id = index;
                // elem.selected=false;
                return elem;
            });
            this.addressList = list;

        }, err => {
            var b = err;
        })
    }
    addAddress() {
        this.showModal = true;
    }

    updateshowModal(ev) {
        this.showModal = ev;
    }


    onSubmit(form: NgForm) {
        let body: any = {}
        body.address = form.value;
        this.apiService.addAddress(this.commonService.getUserPayload()._id, body).subscribe(response => {
            var a = response;
            this.showModal=false;
            this.resetForm(form);
            this.fetchAddress();
        },
            err => {
                console.log("Err", err);
            })

    }

    resetForm(form: NgForm) {
        this.addModel = {
            name: '',
            mobile: '',
            address: '',
            locality: '',
            pincode: '',
            city: '',
            state: ''
        };
        form.resetForm();

    }


    selectAddress(event, item) {
        this.selectedAddress = item;
        this.productService.deliveryAddressState = this.selectedAddress;
        localStorage.setItem("deliveryAddress", JSON.stringify(this.selectAddress));
    }
}
