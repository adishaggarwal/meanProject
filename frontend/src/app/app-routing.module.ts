import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TaskListComponent} from './pages/task-list/task-list.component'


const routes: Routes = [
  { path:'',redirectTo:'lists', pathMatch:'full'},
  { path:'lists',component:TaskListComponent},
  { path:'lists/:listId',component:TaskListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
