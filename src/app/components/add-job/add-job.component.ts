import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent {

  newJobName!: string; 
//constructor for a class
  constructor(
    private router: Router,
    private UserService: UserService
  ) {}

  //method for adding a new job
  addNewJob(): void {
    if (!this.newJobName) {
      console.error('Job name is required for adding a new job.');
      return;
    }
  
    const jobDto = { title: this.newJobName };
  //print in console and alert box for succesfull adding
    this.UserService.addJobPosition(jobDto).subscribe({
      next: (response) => {
        console.log(`New job "${this.newJobName}" added successfully.`, response);
        alert('job added successfully');
      },
      error: (error) => {
        console.error(`Error adding a new job "${this.newJobName}": `, error);
        alert('this job already exists');
      },
    });
  }
//route to admin page
  GoToAdmin(){
    this.router.navigate(['/admin']);
  }
}
