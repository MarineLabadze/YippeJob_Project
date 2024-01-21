import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login!: FormGroup;
  constructor(private fb:FormBuilder,private router: Router,private UserService:UserService){}
  
  //method calling
  ngOnInit(): void {
    this.loginForm();
   }
//Validators for all fields
  loginForm() {
    this.login = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
     password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  //this method checks validity of email
  email() {
    const email = this.login.get('email');
    if (email?.invalid && email?.touched) {
        return '*Email is invalid.';
    }
    return null;
  }
//this method checks validity of password
  password(){
      const pass = this.login.get('password');
  
      if (pass?.invalid && pass?.touched) {
       if (pass?.errors?.['minlength']) {
          return '*Password must be at least 6 characters';
        }
       else if (pass?.errors?.['required']) {
          return '*Password is required';
        }else return "Password is invalid";
      }
      return null;
  }
//log everything to console
  onSubmit() {
    this.loginn();
   }
//handles user login
  loginn() {
   if (this.login.valid) {
     const userData = this.login.value;
     this.UserService.logInUser(userData).subscribe({
        next: (response: any) => {
          console.log('Logged in successfully:', response);
         const jwtToken = response;
          localStorage.setItem('token', jwtToken);

          const role = this.getRoleFromToken(jwtToken);
         this.navigateToRole(role);
       },
       error: (error) => {
          console.log('Login failed:', error);
        }
       });
     }
  }
  //extracts the user role from token
  private getRoleFromToken(token: string): string | null {
    try {
   const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return decodedToken?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null;
    } catch (e) {
     console.error('Error decoding JWT token', e);
      return null;
    }
   }

   //navigates to different routers bsed on role Id
   private navigateToRole(role: string | null) {
     if (role === '1') {
      this.router.navigate(['/admin']);
    } else if (role === '2') {
      this.router.navigate(['/worker']);
    } else {
      console.log('Login failed. Please check your credentials', 'Error');
    }
  }

  //navigates to registration page
   goToRegister() {
    this.router.navigate(['/registration']);
   }
}
