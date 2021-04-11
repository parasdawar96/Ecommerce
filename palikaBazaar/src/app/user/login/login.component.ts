import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { ApiService } from '../../service/api.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductStateService } from 'src/app/service/product-state.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    emailRegex:any;
    model:any;
    serverErrorMessages:string;
  constructor(public commonService:CommonService,
    private activatedRoute:ActivatedRoute,
    private apiService:ApiService,
    private productService:ProductStateService,
    private router:Router,
    private toastr: ToastrService) { }

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
        this.productService.loggedInState=true;
        this.commonService.setToken(response.token);
        this.apiService.getUserProfile().subscribe((res:any)=>{
            let userObj=res.user;
            userObj.firstName=this.fetchFirstName(userObj.name);
            this.productService.userDetailState=userObj;
            let previousUrl=sessionStorage.getItem("previousRoute");
            this.router.navigateByUrl(previousUrl);
            setTimeout(()=>{
                this.toastr.success('Logged In SuccessFully', 'Success', {
                    timeOut: 2000,
                    extendedTimeOut: 2000,
                    positionClass:'toast-top-center'
                });
            })  
        },err=>console.log("error in user details",err));
        
      
      },
      err=>{
         
        if(err.status== 422){
            this.serverErrorMessages= err.error.join('<br/>');
        }
        else{
            this.serverErrorMessages=err.error.message;
          console.log("Err",err);
        }
      })
  }

  fetchFirstName(name){
      let firstName="";
      if(name){
          let nameArray=name.split(" ");
          firstName=nameArray[0];
      }
      return firstName;
  }

}
