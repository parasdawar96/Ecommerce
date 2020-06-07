import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductStateService } from 'src/app/service/product-state.service';

@Component({
  selector: 'app-product-main',
  templateUrl: './product-main.component.html',
  styleUrls: ['./product-main.component.scss']
})
export class ProductMainComponent implements OnInit {
    mobileSortList;
    filterOpen:boolean=false;
    productList=[];
    productsCount=0;
    gender="";
  constructor(private activatedRoute:ActivatedRoute,private router:Router,private productService:ProductStateService) { }

  ngOnInit(): void {
      console.log("prod list",this.productList);
    this.mobileSortList=[
        {value:"price_desc",viewValue:"Price High to Low"},
        {value:"price_asc",viewValue:"Price Low to High"},
        {value:"discount_desc",viewValue:"Discount High to Low"},
        {value:"discount_asc",viewValue:"Discount Low to High"}
    ];

    this.productService.productResponseObs$.subscribe((response: any) => {
        console.log("response",response);
        if(Object.keys(response).length!=0 && response.constructor===Object){
            this.productList = response.products;
            //console.log("prod list",this.productList);
            this.productsCount=response.productCount;
            this.gender=response.products[0].gender;
        }
       
    });
  }

  updateSort(item){
    this.router.navigate(
        [], 
        {
          relativeTo: this.activatedRoute,
          queryParams: { sort: item.value },
          queryParamsHandling: 'merge'
        });
  }

  toggleMobileSort(event){
      let toggleMobileSortElem=document.getElementById("mobile-sort-menu");
      if(toggleMobileSortElem.style.display=="none"){
        toggleMobileSortElem.style.display="block";
      }
      else{
        toggleMobileSortElem.style.display="none";
      }
  }

  toggleMobileFilter(event){
    let toggleMobileFilterElem=document.getElementById("mobile-filter-menu");
    if(toggleMobileFilterElem.style.display=="none" || toggleMobileFilterElem.style.display==""){
        toggleMobileFilterElem.style.display="block";
        this.filterOpen=true;
    }
    else{
        toggleMobileFilterElem.style.display="none";
        this.filterOpen=false;
    }
  }

}
