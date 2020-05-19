import { Component, OnInit } from '@angular/core';
import { ProductStateService } from 'src/app/service/product-state.service';
import { CommonService } from 'src/app/service/common.service';
import { ApiService } from 'src/app/service/api.service';
import {  Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
   queryParamObj:any;
   filterList:object;
   objectKeys = Object.keys;
   queryParam:String;
  constructor(private productService:ProductStateService,private router: Router,private commonService:CommonService,private apiService:ApiService,private activatedRoute:ActivatedRoute ) { }

  ngOnInit() {

    this.activatedRoute.queryParamMap.subscribe((res:any)=>{
        this.queryParamObj=res.params;
    });
    
    this.productService.productResponseObs$.subscribe((response:any)=>{
        let list=response.filterObj;
        if(list!=undefined){
            this.filterList=this.setFilters(list);
            if(Object.keys(this.filterList).length)this.checkSelectedFilters();
        }
       
    });
  }

  checkSelectedFilters(){
      var filterQuery=this.activatedRoute.snapshot.queryParams.filter;
      if(filterQuery){
        let filterTypeArray=filterQuery.split("::");
        filterTypeArray.forEach(element => {
            let keyValueArray=element.split(":");
            let selectedValueArray=keyValueArray[1].split(",");
            for(let item in this.filterList){
                if (item==keyValueArray[0]){
                    this.filterList[item].forEach(elem => {
                        if(selectedValueArray.includes(elem._id)){
                            elem.checked=true;
                        }
                    });
                }
            }
  
        });
      }
    
  }
  setFilters(list){
      for(let filterItem in list){
        list[filterItem].forEach(element => {
            element.checked=false;
        });
    }
    return list;
 
  }


  applyFilter(event,item,name){
      item.checked=event;
      this.filterList[name]=this.filterList[name].map(element => {
          if(element._id==item._id){
              element=item;
          }
          return element;
      });
      let filterString= name+":"+item._id;
      
      let updatedFilter=this.commonService.setFilter(filterString,this.queryParamObj.filter);
      this.router.navigate(
        [], 
        {
          relativeTo: this.activatedRoute,
          queryParams: { filter: updatedFilter },
          queryParamsHandling: 'merge'
        });
      //this.router.navigateByUrl('/products?' + finalQueryParam);
      
    }

}
