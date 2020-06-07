import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  constructor(private location: Location,
    private commonService:CommonService) { 
    // let orderSuccess=localStorage.getItem("orderSuccess");
    // if (orderSuccess) {
    //     this.orderSuccess = orderSuccess == "true";
    // }
   
  }

  ngOnInit(): void {
    this.location.onUrlChange(url => {
        console.log("inside location url ", url);
        if (this.commonService.isLoggedIn()) {
            if(url.includes("success")){
                //window.location.reload();
            }

        }
    });
  }

}
