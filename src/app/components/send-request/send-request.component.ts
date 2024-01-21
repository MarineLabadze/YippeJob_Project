import { Component } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-send-request',
  templateUrl: './send-request.component.html',
  styleUrls: ['./send-request.component.css']
})
export class SendRequestComponent {
  constructor(private UserService: UserService) { }

  // Add a new property to store the selected date and shift
  selectedDate: string = '';
  selectedShift: string = '';
  private decodeToken(token: any): any {
    try {return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.error('Error decoding JWT token', e);
      return null;}
  }

  //add schedule
  addSchedule(): void {
    if (!this.selectedDate || !this.selectedShift) {
      console.error('Not enough information to add schedule');
      return;
    }
    
   //starting time and ending time(determining)
const selectedDate = new Date(this.selectedDate);

let startTime: string;
let endTime: string;

if (this.selectedShift === 'Morning') {
  const morningStartTime = new Date(selectedDate);
  morningStartTime.setHours(12, 0, 0);
  startTime = morningStartTime.toISOString();

  const morningEndTime = new Date(selectedDate);
  morningEndTime.setHours(20, 0, 0);
  endTime = morningEndTime.toISOString();
} else {
  const eveningStartTime = new Date(selectedDate);
  eveningStartTime.setHours(20, 0, 0);
  startTime = eveningStartTime.toISOString();

  const nextDay = new Date(selectedDate);
  nextDay.setDate(nextDay.getDate() + 1);  
  nextDay.setHours(12, 0, 0);
  endTime = nextDay.toISOString();
}
    const token = localStorage.getItem('token');
    const decodedToken = this.decodeToken(token);
    const userID = decodedToken?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
  
    const userData = {
      startTime: startTime,
      endTime: endTime,
      userId: userID
    };
    
  //console print starting/ending time
    console.log('Start Time:', startTime);
    console.log('End Time:', endTime);
  
    // console print message
    this.UserService.sendRequest(userData).subscribe({
      next: (response) => {
        console.log('Schedule request sent successfully:', response);
        alert('Request sent successfully');
      },
      error: (error) => {
        console.error('Error sending schedule request: ', error);
      },
    });
  }
  
}
