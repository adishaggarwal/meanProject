import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import User from 'src/app/models/user';
import { stringify } from 'querystring';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user:User[]=[];
  name:string;
  email:string;
  password:string;
  password2:string;
  reg:any;
  availalert:boolean;
  disable:boolean;
  available:boolean;
  showalert:boolean;
  avail2:boolean;
  hide:boolean;
  obj:any;
  vemail:boolean;
  temp:number;
  submitted:boolean;
  showreg:boolean;
  shownewacc:boolean;
  hel:any;

  constructor(private taskService:TaskService,
    private route:ActivatedRoute,
    private router:Router) {
    this.showalert=false;
    this.shownewacc=false;
    this.disable=false;
    this.showreg=false;
    this.available=false;
    this.avail2=false;
    this.hide=false;
    this.vemail=true;
    this.submitted=false;
    this.name='';
    this.email='';
    this.password='';
    this.password2='';
    this.availalert=false;
    this.temp=0;
    this.reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    this.obj={
      name:"",
      email:"",
      password:""
    }
   }

  ngOnInit(): void {
  }

  checkavailability(email1)
  {
    console.log(email1);
    this.taskService.checkavail()
    .subscribe((users) => {
        this.available=true;
      for(let i=0;i<users.length;i++)
      {
        if(users[i].email==email1)
        {
          this.available=false;
          this.avail2=true;
        }
      }
      if(this.available==true)
      {
        this.avail2=false;
        this.temp=1;
      }
      if ((this.reg.test(this.email) == false) || !this.name || this.password.length<6 || (this.password!=this.password2) ) 
            {
                 this.showalert=true;
            }
            else{
              this.showalert=false;
              this.showreg=true;
              this.shownewacc=true;
              if(this.temp==1)
              {
                this.hide=true;
                this.disable=true;
                this.availalert=true;
              }
            }
            
    });

    
  }

  onSubmit()
  {
    this.obj={
      name:this.name,
      email:this.email,
      password:this.password
    }
    
    this.taskService.registeruser(this.obj)
    .subscribe((users) => {
        this.submitted=true;
        this.name='';
    this.email='';
    this.password='';
    this.password2='';
    this.hide=false;
    this.showreg=false;
    this.shownewacc=false;
    this.disable=false;
    this.availalert=false;

    setTimeout(()=>{ 
      this.submitted = false;
 }, 3000);
    });
  }



  validemail()
  {
    if ((this.reg.test(this.email) == false)) 
    {
         this.vemail=true;
         
    }
    else{
      this.vemail=false;
    }

  }

  clearform()
  {
    this.name='';
    this.email='';
    this.password='';
    this.password2='';
    this.hide=false;
    this.showalert=true;
    this.submitted=false;
    this.showreg=false;
    this.shownewacc=false;
    this.disable=false;
    this.availalert=false;
  }


}
