import { Component, OnInit } from '@angular/core';
import { ProductStateService } from 'src/app/service/product-state.service';

@Component({
  selector: 'bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss']
})
export class BreadCrumbComponent implements OnInit {

    breadCrumbList:object;
    constructor(private productService:ProductStateService) { }
  
    ngOnInit() {
  
      this.productService.productResponseObs$.subscribe((response:any)=>{
          this.breadCrumbList=response.breadCrumbList;
      });
    }

}
