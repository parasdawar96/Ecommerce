import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { CommonService } from '../service/common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router:Router,private commonService:CommonService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean  {
        if(!this.commonService.isLoggedIn()){
            this.router.navigateByUrl('/');
            this.commonService.deleteToken();
            return false;
        }
    return true;
  }
  
}
