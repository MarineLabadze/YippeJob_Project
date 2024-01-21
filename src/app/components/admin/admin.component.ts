import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(private router:Router){}
//routes to go to different pages
  GoToRequest(){
    this.router.navigate(['/request']);
  }
  Addjob(){
    this.router.navigate(['/addJob']); 
  }

  ChangeId(){
    this.router.navigate(['/changeId']);
  }
  GoToDeleteJob(){
    this.router.navigate(['/deleteJob']);
  }
  GoToDeleteUser(){

    this.router.navigate(['/deleteUser']);
  }
}
