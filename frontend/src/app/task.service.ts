import { Injectable } from '@angular/core';
import { WebService } from './web.service';
import Task from './models/task';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  constructor(private webService:WebService,private httpClient: HttpClient) { }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }



  getUserPayload() {
    var token = localStorage.getItem('token');
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  getUserProfile() {
    return this.httpClient.get('http://localhost:3000/api/userProfile');
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }

  loginuser(payload)
  {
    console.log("taskservice");
     return this.httpClient.post('http://localhost:3000/api/authenticate',payload,this.noAuthHeader);
  }

   checkavail() {
    return this.httpClient.get<any>('http://localhost:3000/check',this.noAuthHeader);
}

registeruser(payload)
   {
     return this.httpClient.post('http://localhost:3000/register',payload,this.noAuthHeader);
   }

  getLists()
  {
    return this.webService.get('lists');
  }

  createList(title:string)
  {
    return this.webService.post('lists',{title});
  }

  getTasks(listId:string)
  {
    return this.webService.get(`lists/${listId}/tasks`);
  }

  createTasks(listId:string,title:string)
  {
    return this.webService.post(`lists/${listId}/tasks`,{title});
  }

  deleteList(listId:string)
  {
    return this.webService.delete(`lists/${listId}`);
  }

  deleteTask(listId:string,taskId:string)
  {
    return this.webService.delete(`lists/${listId}/tasks/${taskId}`);
  }

  setCompleted(listId:string,task: Task)
  {
    return this.webService.patch(`lists/${listId}/tasks/${task._id}`,{completed:!task.completed});
  }
}
