import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-receiving-request',
  templateUrl: './receiving-request.component.html',
  styleUrls: ['./receiving-request.component.css']
})
export class ReceivingRequestComponent implements OnInit{
  
  constructor(private router: Router,private UserService: UserService){}
  Requests: any[] = [];
//method calling
  ngOnInit(): void {
    this.fetchRequests();
  }

  //getsrequest
  fetchRequests():void {
    this.UserService.getRequests().subscribe({
     next: (response) => {
       console.log('Requests', response);
       this.Requests = response;
     },
     error: (error) => {
       console.error('Error fetching pending requests: ',error);
     }
    });
   }
//approvesrequest
   approveRequest(requestId: number): void {
    const scheduleId = requestId;
  
    this.UserService.approveRequest(scheduleId).subscribe({
      next: (response) => {
        console.log(`Request with ID ${scheduleId} approved successfully.`, response);
        this.fetchRequests();
      },
      error: (error) => {
        console.error(`Error approving request with ID ${scheduleId}: `, error);
      }
    });
  }
//if they want declines request
  declineRequest(requestId: number): void {
    this.UserService.deleteRequest(requestId).subscribe({
      next: (response) => {
        console.log(`Request with ID ${requestId} declined successfully.`, response);
        this.fetchRequests();
      },
      error: (error) => {
        console.error(`Error declining request with ID ${requestId}: `, error);
      }
    });
  }
//goes to admin
  GoToAdmin(){
    this.router.navigate(['/admin']);
  }
}
