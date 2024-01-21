import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
@Component({
  selector: 'app-change-id',
  templateUrl: './change-id.component.html',
  styleUrls: ['./change-id.component.css']
})
export class ChangeIdComponent {

  userId!: number;
  newRoleId!: number;

  constructor(
    private router: Router,
    private UserService: UserService
  ) {}

  //calls method to change id,also displayes messages in the console+alert
  changeUserRole() {
    this.UserService.changeUserRole(this.userId, this.newRoleId).subscribe({
     next: (response) => {
        console.log(response);
        alert('User Role Id changed successfully');
      },
     error: (error) => {
        console.error(error);
        alert('error while changing Role Id');
      },
    }
      );
  }
//method-goes to admin
  GoToAdmin(){
    this.router.navigate(['/admin']);
  }
}
