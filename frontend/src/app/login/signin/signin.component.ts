import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { TaskService } from 'src/app/task.service';
import {Router} from '@angular/router';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

email:string;
password:string;
payload:any;
serverError:string;

emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private taskService:TaskService,private httpClient: HttpClient,private router:Router) {
    this.email='';
    this.password='';
    this.payload={
      email:String,
      password:String
    }
   }

  ngOnInit(): void {
    if(this.taskService.isLoggedIn())
    this.router.navigateByUrl('/lists');
  }

  loginuser()
  {
    this.payload={
      email:this.email,
      password:this.password
    }
    this.taskService.loginuser(this.payload)
    .subscribe(res => {
      console.log("signincomp");
        this.taskService.setToken(res['token']);
        this.router.navigateByUrl('/lists');
    },
    err =>{
      this.serverError=err.error.message;
    }
    );
  }
  

}
