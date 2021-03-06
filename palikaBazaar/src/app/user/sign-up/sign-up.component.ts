import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { NgForm } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  emailRegex:any;
  serverErrorMessages:String='';
  success=false;
  constructor(public commonService:CommonService,private apiService:ApiService,private router:Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.emailRegex= /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  }

  onSubmit(form: NgForm){
      this.apiService.postUser(form.value).subscribe(response=>{
          var a= response;
          this.success=true;
          this.resetForm(form);
          this.router.navigateByUrl("/account/login");
          setTimeout(()=>{
            this.toastr.success('Signed Up SuccessFully', 'Success', {
                timeOut: 2000,
                extendedTimeOut: 2000,
                positionClass:'toast-top-center'
            });
        })  
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


  resetForm(form:NgForm){
      this.commonService.selectedUser={
          name:'',
          email:'',
          password:'',
          confirmPassword:''
      };
      form.resetForm();
      this.serverErrorMessages='';
  }

}
