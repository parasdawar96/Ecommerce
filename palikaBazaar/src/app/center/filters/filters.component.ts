import { Component, OnInit } from '@angular/core';
import { ProductStateService } from 'src/app/service/product-state.service';
import { CommonService } from 'src/app/service/common.service';
import { ApiService } from 'src/app/service/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
    queryParamObj: any;
    filterList: object;
    objectKeys = Object.keys;
    queryParam: String;
    filterObj: object;
    gender;
    sort;
    constructor(private productService: ProductStateService, private router: Router, private commonService: CommonService, private apiService: ApiService, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {

        this.activatedRoute.queryParamMap.subscribe((res: any) => {
            this.queryParamObj = res.params;
            this.gender = this.queryParamObj["gender"]
            this.sort = this.queryParamObj['sort'];
            this.updateFilterObj();
        });

        this.productService.productResponseObs$.subscribe((response: any) => {
            let list = response.filterObj;
            if (list != undefined) {
                this.filterList = this.setFilters(list);
                if (Object.keys(this.filterList).length) this.checkSelectedFilters();
            }

        });
    }

    updateFilterObj() {
        let filterObj: any = {};
        if (this.queryParamObj["filter"]) {
            let appliedfilterArray = this.queryParamObj["filter"].split("::");
            appliedfilterArray.forEach(element => {
                let filterArray = element.split(":");
                let valueArray = filterArray[1].split(",");
                filterObj[filterArray[0]] = valueArray;
            });
            this.productService.filterObjectState = filterObj;
        }
    }

    checkSelectedFilters() {
        var filterQuery = this.activatedRoute.snapshot.queryParams.filter;
        if (filterQuery) {
            let filterTypeArray = filterQuery.split("::");
            filterTypeArray.forEach(element => {
                let keyValueArray = element.split(":");
                let selectedValueArray = keyValueArray[1].split(",");
                for (let item in this.filterList) {
                    if (item == keyValueArray[0]) {
                        this.filterList[item].forEach(elem => {
                            if (selectedValueArray.includes(elem._id)) {
                                elem.checked = true;
                            }
                        });
                    }
                }

            });
        }

    }
    setFilters(list) {
        for (let filterItem in list) {
            list[filterItem].forEach(element => {
                element.checked = false;
            });
        }
        return list;

    }
    setFilterObject(item, checked) {
        this.filterObj = this.productService.filterObjectState;
        let itemArray = item.split(":");
        if (checked) {
            if (this.filterObj.hasOwnProperty(itemArray[0])) {
                this.filterObj[itemArray[0]].push(itemArray[1]);
            }
            else {
                let valArray = [];
                valArray.push(itemArray[1]);
                this.filterObj[itemArray[0]] = valArray;
            }
        }
        else {
            if (this.filterObj.hasOwnProperty(itemArray[0])) {
                let array: any = this.filterObj[itemArray[0]];
                if (array.length > 1) {
                    this.filterObj[itemArray[0]] = this.filterObj[itemArray[0]].filter(e => e !== itemArray[1]);
                }
                else {
                    this.filterObj[itemArray[0]] = undefined;

                    this.filterObj = JSON.parse(JSON.stringify(this.filterObj));
                }
            }
        }

        this.productService.filterObjectState = this.filterObj;

    }
    setFilterString() {
        this.filterObj = this.productService.filterObjectState;
        let updatedFilterString = "";
        for (let key in this.filterObj) {
            updatedFilterString += key + ":" + this.filterObj[key].join(",") + "::";
        }
        updatedFilterString = updatedFilterString.slice(0, updatedFilterString.length - 2);
        return updatedFilterString;
    }
    setFilter(selectedFilter, oldFilter: string, type) {
        let updatedFilter = "";
        var emptyFilter: boolean = false;
        let selectedFilterArray = selectedFilter.split(":");
        if (oldFilter) {
            if (oldFilter.includes(selectedFilterArray[0])) {
                let oldSubFilterArray = oldFilter.split("::");
                oldSubFilterArray = oldSubFilterArray.map(filterElem => {
                    if (filterElem.includes(selectedFilterArray[0])) {
                        if (type == "add") {
                            let filterElemArray = filterElem.split(":");
                            filterElemArray[1] += "," + selectedFilterArray[1];
                            filterElem = filterElemArray.join(":");
                        }
                        else {
                            let filterElemArray = filterElem.split(":");
                            let afterFirstIndex = filterElemArray[1].indexOf("," + selectedFilterArray[1]);
                            let firstIndex = filterElemArray[1].indexOf(selectedFilterArray[1]);
                            if (afterFirstIndex > -1) {
                                filterElemArray[1].replace("," + selectedFilterArray[1], "");
                            }
                            else if (firstIndex > -1) {
                                filterElemArray[1].replace(selectedFilterArray[1] + ",", "");
                            }
                            if (filterElemArray[1].length == 0) {
                                emptyFilter = true;
                            }
                        }

                    }
                    return filterElem;
                });
                updatedFilter = oldSubFilterArray.join("::");
                if (emptyFilter) {
                    updatedFilter.replace(selectedFilterArray[0] + ":", "")
                }
            }
            else {
                updatedFilter = oldFilter + "::" + selectedFilter;
            }

        }
        else {
            updatedFilter = selectedFilter;
        }
        return updatedFilter;
    }


    applyFilter(event, item, name) {
        item.checked = event;

        this.filterList[name] = this.filterList[name].map(element => {
            if (element._id == item._id) {
                element = item;
            }
            return element;
        });
        let filterString = name + ":" + item._id;
        this.setFilterObject(filterString, item.checked);
        let updatedFilter = this.setFilterString();
        //let updatedFilter = this.setFilter(filterString, this.queryParamObj.filter,item.checked);
        if (updatedFilter != "") {
            this.router.navigate(
                [],
                {
                    relativeTo: this.activatedRoute,
                    queryParams: { filter: updatedFilter },
                    queryParamsHandling: 'merge'
                });
        }
        else {
            let queryParamObject: any = {};
            if (this.gender) {
                queryParamObject.gender = this.gender;
            }
            if (this.sort) {
                queryParamObject.sort = this.sort;
            }
            this.router.navigate(
                ['.'],
                { relativeTo: this.activatedRoute, queryParams: queryParamObject }
            );
        }



        //this.router.navigateByUrl('/products?' + finalQueryParam);

    }

}
