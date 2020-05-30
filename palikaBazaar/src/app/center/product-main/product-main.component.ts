import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-main',
  templateUrl: './product-main.component.html',
  styleUrls: ['./product-main.component.scss']
})
export class ProductMainComponent implements OnInit {
    mobileSortList;
  constructor(private activatedRoute:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.mobileSortList=[
        {value:"price_desc",viewValue:"Price High to Low"},
        {value:"price_asc",viewValue:"Price Low to High"},
        {value:"discount_desc",viewValue:"Discount High to Low"},
        {value:"discount_asc",viewValue:"Discount Low to High"}
    ]
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

}
