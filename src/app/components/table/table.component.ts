import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  //declaring
  days: string[] = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  jobOptions: any[] = [];
  Requests: any[] = [];
  dates: string[] = [];
  ApprovedRequests: any[] = [];
  Worker: any[] = [];
  currentWeekStartDate!: Date;
  //constructors
  constructor(private UserService: UserService) {}
//method calling
  ngOnInit(): void {
  
    this.fetchApprovedRequests();
    console.log('Worker',this.Worker);
    console.log('Dates',this.dates);
    this.initializeDates();
    this. fetchRequests();
    this.fetchJobOptions();
  }

  // fetches schedules from the UserService
  fetchApprovedRequests(): void {
    this.UserService.getSchedules().subscribe({
      next: (response) => {
        this.Requests = response;
  
        this.ApprovedRequests = this.Requests.filter(schedule => schedule.isApproved === true);
        console.log('Approved Schedules', this.ApprovedRequests);
  
        const morningShifts = this.ApprovedRequests.filter(schedule => this.calculateShiftType(schedule.startTime) === 'Morning');
        const eveningShifts = this.ApprovedRequests.filter(schedule => this.calculateShiftType(schedule.startTime) === 'Evening');
  
        morningShifts.forEach(schedule => {
          this.Worker.push({
            date: this.extractDate(schedule.startTime),
            jobTitle: schedule.jobTitle,
            info: `${this.calculateShiftType(schedule.startTime)} - ${schedule.firstName} ${schedule.lastName}`
          });
        });
  
        eveningShifts.forEach(schedule => {
          this.Worker.push({
            date: this.extractDate(schedule.startTime),
            jobTitle: schedule.jobTitle,
            info: `${this.calculateShiftType(schedule.startTime)} - ${schedule.firstName} ${schedule.lastName}`
          });
        });
      },
      error: (error) => {
        console.error('Error fetching schedules: ', error);
      },
    });
  }
  //sets up date-related properties 
  initializeDates(): void {
    const currentDate = new Date();
    this.currentWeekStartDate = new Date(currentDate);
    this.currentWeekStartDate.setDate(currentDate.getDate() - currentDate.getDay());
  
    for (let i = 0; i < 7; i++) {
      const date = new Date(this.currentWeekStartDate);
      date.setDate(date.getDate() + i);
      const formattedDate = this.formatDate(date);
      this.dates.push(formattedDate);
    }
  }
  
  private formatDate(date: Date): string {
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}-${day}`;
  }
  

  getMonthAbbreviation(month: number): string {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[month];
  }

  //calls getschedule method from service
  fetchRequests(): void {
    this.UserService.getSchedules().subscribe({
      next: (response) => {
        console.log('Schedules', response);
        this.Requests = response;

      },
      error: (error) => {
        console.error('Error fetching schedules: ', error);
      },
    });
  }
//fetches jobs
  fetchJobOptions(): void {
    this.UserService.getJobOptions().subscribe({
      next: (response) => {
        console.log('Job options:', response);
        this.jobOptions = response;
      },
      error: (error) => {
        console.error('Error fetching job options: ', error);
      },
    });
  }
  //calculates shift time
  calculateShiftType(startTime: string): string {
    console.log('Original startTime:', startTime);
      const startDate = new Date(startTime);
      const hour = startDate.getHours();
  
    console.log('Extracted hour:', hour);
      if (hour >= 8 && hour < 16) {
      return 'Morning';
    } else {
      return 'Evening';
    }
  }
  //returns dates we need
  private extractDate(startTime: string): string {
    const [datePart, timePart] = startTime.split('T');
    const [year, month, day] = datePart.split('-');
    return `${month}-${day}`;
  }
  
  
  //this method navigates weeks
  navigateWeek(offset: number): void {
    this.currentWeekStartDate.setDate(this.currentWeekStartDate.getDate() + offset);

    this.dates = [];
    for (let i = 0; i <7; i++) {
      const date = new Date(this.currentWeekStartDate);
      date.setDate(date.getDate() + i);
      const formattedDate = this.formatDate(date);
      this.dates.push(formattedDate);
    }

    this.fetchJobOptions();
  }
}

