import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private apiService:ApiService,private commonService:CommonService) { }

  ngOnInit(): void {
     this.apiService.getUserProfile().subscribe(res=>{
         console.log("res",res);
     },err=>{
         console.log("Err",err);
     })
  }




}
