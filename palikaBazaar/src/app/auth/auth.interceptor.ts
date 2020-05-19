import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { CommonService } from '../service/common.service';
import { tap } from 'rxjs/operators';
import { ProductStateService } from '../service/product-state.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router, private commonService: CommonService, private apiService: ApiService,private productService:ProductStateService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        this.productService.loadingState=true;
        if (req.headers.get('noAuth'))
            return next.handle(req.clone()).pipe(tap(event=>{
                this.productService.loadingState=false;
            },
            err=>{
                this.productService.loadingState=false;
            }
            ));
        else {
            const clonedreq = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + this.commonService.getToken())
            });
            return next.handle(clonedreq).pipe(
                tap(
                    event => { 
                        this.productService.loadingState=false;
                    },
                    err => {
                        this.productService.loadingState=false;
                        if (err.error.auth == false) {
                            this.router.navigateByUrl("/account/login");
                        }
                    }
                )
            )
        }
    }

}
