import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { CommonService } from 'src/app/service/common.service';

@Component({
    selector: 'app-address',
    templateUrl: './address.component.html',
    styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
    modalHeader: string = "Add New Address";
    showModal: boolean = false;
    addModel: any;
    addressList:Array<object>;

    constructor(private apiService: ApiService, private commonService: CommonService) { }

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

        this.apiService.fetchAddress(this.commonService.getUserPayload()._id).subscribe((res:any)=>{
            this.addressList = res.user.address;
        },err=>{
            var b=err;
        })
    }
    addAddress() {
        this.showModal = true;
    }

    updateshowModal(ev) {
        this.showModal = ev;
    }


    onSubmit(form: NgForm) {
        let body:any={}
        body.address=form.value;
        this.apiService.addAddress(this.commonService.getUserPayload()._id, body).subscribe(response => {
            var a = response;
            this.resetForm(form);
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
}
