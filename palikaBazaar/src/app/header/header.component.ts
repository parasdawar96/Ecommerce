import { Component, OnInit } from '@angular/core';
import { CommonService } from '../service/common.service';
import { ProductStateService } from '../service/product-state.service';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  queryParam;
  constructor(private commonService:CommonService,private productService:ProductStateService,private apiService:ApiService,private router:Router) {
        // this.productService.queryParamObs$.subscribe(data=>{
        //     this.queryParam=data;
        // });
   }

  ngOnInit() {
  }

  
//   fetchProducts(event,query){
//       let queryArray=query.split("=");
//       this.router.navigate(['/products'], { queryParams: { gender: 'men'} });
//     var obj={
//         "key":queryArray[0],
//         "value":queryArray[1]
//     };
//     this.queryParam=this.commonService.setQueryParam(obj);
//     this.apiService.getProducts("http://localhost:3001",this.queryParam).subscribe(response=>{
//         this.productService.productsResponseState=response;
//     })
//   }




}
