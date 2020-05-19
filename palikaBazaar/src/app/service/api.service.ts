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
        return this.http.get(environment.apiBaseUrl + "/products?limit=50&" + queryParam, httpOptions);
    }

    getProductDetails(id) {

        return this.http.get(environment.apiBaseUrl + "/product-details/" + id, httpOptions);
    }


    postUser(user: User) {
        return this.http.post(environment.apiBaseUrl + "/account/register", user, httpOptions);
    }

    login(authCredentials) {
        return this.http.post(environment.apiBaseUrl + "/account/authenticate", authCredentials, httpOptions);
    }

    getUserProfile(){
        return this.http.get(environment.apiBaseUrl+"/account/userProfile",authHttpOptions);
    }


    fetchCart(id,body){
        return this.http.post(environment.apiBaseUrl+ "/cart/"+id,body,httpOptions);
    }

    addToCart(id,body){
        return this.http.put(environment.apiBaseUrl+ "/cart/add/"+id,body,httpOptions);
    }

    removeFromCart(id,body){
        return this.http.put(environment.apiBaseUrl+ "/cart/remove/"+id,body,httpOptions);
    }

}
