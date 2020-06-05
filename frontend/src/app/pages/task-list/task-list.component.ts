import { Component, OnInit } from '@angular/core';
import List from'src/app/models/list';
import Task from 'src/app/models/task';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import {FormsModule} from '@angular/forms';




@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  lists:  List[]=[];
  tasks:Task[]=[];
  listnew:List;
  listId:string;
  showinput:boolean;
  name1:string;
  showtinput:boolean;
  abc:any;
  userDetails:any;
  
  constructor(private taskService:TaskService,
    private route:ActivatedRoute,
    private router:Router) { 
      this.userDetails=[];
    }

  ngOnInit(): void {
    this.taskService.getLists()
      .subscribe((lists) => this.lists=lists);

      this.route.params.subscribe((params:Params) =>{
        this.listId=params.listId;
        if(!this.listId) return;
        this.taskService.getTasks(this.listId).subscribe((tasks:Task[])=> this.tasks = tasks);
      });

      this.taskService.getUserProfile().subscribe(
        res => {
          this.userDetails = res['user'];
          console.log(this.userDetails);
        },
        err => { 
          console.log(err);
          
        }
      );
  }
  onLogout(){
    this.taskService.deleteToken();
    this.router.navigate(['/signin']);
  }

  onTaskClick(task)
  {
    this.taskService.setCompleted(this.listId,task).subscribe(()=>task.completed=!task.completed);
  }

  deleteTask(task:Task)
  {
    this.taskService.deleteTask(this.listId,task._id)
    .subscribe((task:Task)=>{
    for(var i=0;i<this.tasks.length;i++) {
      if(task._id == this.tasks[i]._id) {
          this.tasks.splice(i, 1);
      }
  }
})
  }

  deleteList(list:List)
  {
    this.taskService.deleteList(this.listId)
    .subscribe(()=>{
    for(var i=0;i<this.lists.length;i++) {
      if(list._id == this.lists[i]._id) {
          this.lists.splice(i, 1);
          this.tasks=[];
      }
  }
})
  }

  showinputfield()
  {
    this.showinput= true;
  }
  showtinputfield()
  {
    if(this.listId)
    {
      this.showtinput= true;
    }
    else{
      alert('PLEASE SELECT A LIST');
    }
    
  }

  cancel_list()
  {
    this.showinput= false;
  }
  cancel_task()
  {
    this.showtinput= false;
  }

   addList()
  {
    var x=document.getElementById("inputlist");
    if((x as HTMLInputElement).value.length <3)
    {
      alert('Title length should be greatar than 3');
    }
    else{
      this.taskService.createList((x as HTMLInputElement).value)
    .subscribe((list:List)=>{
      console.log("kqndqwlndq");
    this.showinput=false;
    this.router.navigate(['/lists']);
    this.taskService.getLists()
      .subscribe((lists) => this.lists=lists);
    
});
    }
    
  }

  addTask()
  {
    if(this.listId)
    {
            var y=document.getElementById("task23");
            if((y as HTMLInputElement).value.length <3)
            {
              alert('Title length should be greatar than 3');
            }
            else{
              this.taskService.createTasks(this.listId,(y as HTMLInputElement).value)
            .subscribe((task:Task)=>{
            this.showtinput=false;
            this.route.params.subscribe((params:Params) =>{
              this.listId=params.listId;
              if(!this.listId) return;
              this.taskService.getTasks(this.listId).subscribe((tasks:Task[])=> this.tasks = tasks);
            });
            
                                     });
          }
  
    }
    else{
      alert('PLEASE SELECT A LIST');
    }
   

}
}
