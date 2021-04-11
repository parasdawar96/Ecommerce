import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../shared/user.model';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Accept": "application/json",
        "NoAuth":"True"
    })
};
const authHttpOptions={
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Accept": "application/json"
    })
}
@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) { }

    getProducts(queryParam) {
        // let searchParam="";
        // let searchVal=sessionStorage.getItem("search");
        // if(searchVal && searchVal!=""){
        //     searchParam="&search="+searchVal +"&";
        // }
        return this.http.get(environment.apiBaseUrl +"/api" +"/products?" +queryParam, httpOptions);
    }

    getProductDetails(id) {

        return this.http.get(environment.apiBaseUrl +"/api" + "/product-details/" + id, httpOptions);
    }


    postUser(user: User) {
        return this.http.post(environment.apiBaseUrl +"/api" + "/account/register", user, httpOptions);
    }

    login(authCredentials) {
        return this.http.post(environment.apiBaseUrl +"/api" + "/account/authenticate", authCredentials, httpOptions);
    }

    getUserProfile(){
        return this.http.get(environment.apiBaseUrl+"/api" +"/account/userProfile",authHttpOptions);
    }


    fetchCart(id,body){
        return this.http.post(environment.apiBaseUrl+"/api" +"/cart/"+id,body,httpOptions);
    }

    addToCart(id,body){
        return this.http.put(environment.apiBaseUrl+"/api" + "/cart/add/"+id,body,httpOptions);
    }

    removeFromCart(id,body){
        return this.http.put(environment.apiBaseUrl+"/api" + "/cart/remove/"+id,body,httpOptions);
    }


    addAddress(id,body){
        return this.http.post(environment.apiBaseUrl+"/api" + "/account/addAddress/"+id,body,authHttpOptions);
    }

    
    fetchAddress(id){
        return this.http.get(environment.apiBaseUrl+"/api" + "/account/fetchAddress/"+id,authHttpOptions);
    }

    purchase(body){
        return this.http.post(environment.apiBaseUrl+"/api" +'/purchase',body,authHttpOptions);
    }
    updateOrder(body){
        return this.http.post(environment.apiBaseUrl+"/api" +'/updateOrder',body,httpOptions);
    }
    

}
