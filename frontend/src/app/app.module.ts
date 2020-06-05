import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListComponent } from './pages/task-list/task-list.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http"
import { from } from 'rxjs';
import { LoginComponent } from './login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RegisterComponent } from './login/register/register.component';
import { SigninComponent } from './login/signin/signin.component';
import {AuthGuard } from './auth/auth.guard';
import {AuthInterceptor} from './auth/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    LoginComponent,
    RegisterComponent,
    SigninComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserModule, FormsModule, ReactiveFormsModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  }, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
