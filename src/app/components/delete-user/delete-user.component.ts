import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent {

  UserIdToDelete!: number;

  constructor(
    private router: Router,
    private UserService: UserService
  ) {}
//method for deleting user
  deleteUser(): void {
    if (!this.UserIdToDelete) {
      console.error('User ID is required for deletion.');
      return;
    }
  //messagess+alert
    this.UserService.deleteUser(this.UserIdToDelete).subscribe({
      next: (response) => {
        console.log(`User position with ID ${this.UserIdToDelete} deleted successfully.`, response);
        alert('User deleted successfully');
      },
      error: (error) => {
        console.error(`Error deleting User with ID ${this.UserIdToDelete}: `, error);
        alert('Error deleting User');
      }
    });
  }
  GoToadmin(){
    this.router.navigate(['/admin']);
  }
}
