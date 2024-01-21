import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
@Component({
  selector: 'app-delete-job',
  templateUrl: './delete-job.component.html',
  styleUrls: ['./delete-job.component.css']
})
export class DeleteJobComponent {

  jobIdToDelete!: number;
  constructor(
    private router: Router,
    private UserService: UserService
  ) {}
  //calling method to delete job
  deleteJobPosition(): void {
    if (!this.jobIdToDelete) {
      console.error('Job ID is required for deletion.');
      return;
    }
  //console messages+alert
    this.UserService.deleteJobPosition(this.jobIdToDelete).subscribe({
      next: (response) => {
        console.log(`Job position with ID ${this.jobIdToDelete} deleted successfully.`, response);
        alert('Job deleted successfully');
      },
      error: (error) => {
        console.error(`Error deleting job position with ID ${this.jobIdToDelete}: `, error);
        alert('Error deleting job.other user is registered with this job position');
      }
    });
  }
//goes to admin page
  GoToAdmin(){
    this.router.navigate(['/admin']);
  }
}
