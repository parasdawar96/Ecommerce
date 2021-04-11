import { Component, OnInit } from '@angular/core';
import { ProductStateService } from 'src/app/service/product-state.service';
import { CommonService } from 'src/app/service/common.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {
    productsCount:Number;
    sortList:Array<Object>;
    selectedOption: any;
    gender:"";
  constructor(private productService:ProductStateService,private commonService:CommonService,private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

      this.sortList=[
          {value:"discountedPrice_desc",viewValue:"Price High to Low"},
          {value:"discountedPrice_asc",viewValue:"Price Low to High"},
          {value:"discount_desc",viewValue:"Discount High to Low"},
          {value:"discount_asc",viewValue:"Discount Low to High"}
      ]
    this.productService.productResponseObs$.subscribe((response:any)=>{

        this.productsCount=response.productCount;
        if(response.products && response.products.length) {
            this.gender=response.products[0].gender;
        }
        else{
            this.gender="";
        }
       
    });
  }


  updateSort(event){    
      //let sortString="sort="+event.value;
      this.router.navigate(
        [], 
        {
          relativeTo: this.activatedRoute,
          queryParams: { sort: event.value },
          queryParamsHandling: 'merge'
        });
    //   this.commonService.setQueryParam()
    //   this.router.navigateByUrl()
  }

}
