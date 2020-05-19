import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { ApiService } from '../../service/api.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    emailRegex:any;
    model:any;
    serverErrorMessages:string;
  constructor(public commonService:CommonService,private apiService:ApiService,private router:Router) { }

  ngOnInit(): void {
      this.model={
          email:'',
          password:''
      }
    this.emailRegex= /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(this.commonService.isLoggedIn()){
        this.router.navigateByUrl("/home");
    }
  }

  onSubmit(form:NgForm){
      this.apiService.login(form.value).subscribe((response:any)=>{
        this.commonService.setToken(response.token);
        let previousUrl=sessionStorage.getItem("previousRoute");
        this.router.navigateByUrl(previousUrl);
      },
      err=>{
        if(err.status== 422){
            this.serverErrorMessages= err.error.join('<br/>');
        }
        else{
          console.log("Err",err);
        }
      })
  }

}
