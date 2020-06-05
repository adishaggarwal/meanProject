import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TaskListComponent} from './pages/task-list/task-list.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './login/register/register.component';
import {SigninComponent} from './login/signin/signin.component';
import {AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  { path:'', component:LoginComponent},
  { path:'signin', component:SigninComponent},
  { path:'register', component:RegisterComponent},
  { path:'lists',component:TaskListComponent , canActivate:[AuthGuard]},
  { path:'lists/:listId',component:TaskListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
