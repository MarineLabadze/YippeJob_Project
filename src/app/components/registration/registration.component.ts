import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from 'src/app/Validators/passwordMatch.Validator';
import { CustomValidator } from 'src/app/Validators/val.Validators';
import { Job } from 'src/app/Interfaces/job';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registration!: FormGroup;
  jobOptions: Job[] = [];

  constructor(private fb: FormBuilder,private UserService:UserService,private router:Router) {}
//method calling
  ngOnInit(): void {
    this.registrationForm();
    this.fetchJobOptions();
  }
//Validators for all fields
  registrationForm() {
    this.registration = this.fb.group({
      firstName: ['', [Validators.required, CustomValidator.noSpaceValidator]],
      lastName: ['', [Validators.required, CustomValidator.noSpaceValidator]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      jobId: ['', Validators.required]
    }, { validators: passwordMatchValidator });
    
  }
//this method checks validity of first name
  First_name() {
    const First = this.registration.get('firstName');

    if (First?.invalid && First?.touched) {
     if (First?.errors?.['required']) {
        return '*First Name is required.';
      }
     else if (First?.errors?.['noSpaceValidator']) {
        return '*First name must not contain any spaces.';
      }
    }
    return null;
  }
//this method checks validity of last name
  Last_name() {
    const Last = this.registration.get('lastName');

    if (Last?.invalid && Last?.touched) {
     if (Last?.errors?.['required']) {
        return '*Last Name is required.';
      }
     else if (Last?.errors?.['noSpaceValidator']) {
        return '*Last name must not contain any spaces.';
      }
    }
    return null;
  }
//this method checks validity of email
  email() {
    const email = this.registration.get('email');
    if (email?.invalid && email?.touched) {
        return '*Email is invalid.';
    }
    return null;
  }
//this method checks validity of password
  password(){
      const pass = this.registration.get('password');
  
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
//this method checks validity of confirm password
Confirm_pass(){
  const con_pass = this.registration.get('confirmPassword');
  return con_pass?.invalid && con_pass?.touched;
}
//this method checks validity of matching password with confirm one
Matching(){
  const matching = this.registration.get('confirmPassword');
  return matching?.errors?.['passwordMatchValidator'];
}
//this method checks validity choosing job position
jobIdInvalid(): boolean {
  const jobIdControl = this.registration.get('jobId');
  return !!jobIdControl && jobIdControl.invalid && jobIdControl.touched;
}


//log everything to console
  onSubmit() {
    console.log(this.registration);
  }
//makes an asynchronous request to fetch job options
  fetchJobOptions():void {
    this.UserService.getJobOptions().subscribe({
     next: (response) => {
       console.log('Job options:', response);
       this.jobOptions = response;
     },
     error: (error) => {
       console.error('Error fetching job options: ',error);
     }
    });
   }
// handles user registration
   regist(){
    if(this.registration.valid){
      const {confirmPassword, jobId, ...userData} = this.registration.value;
      const job = jobId as Job;
      this.UserService.registerUser({...userData, JobId: job.id}).subscribe({
        next: (response) => {
          console.log(response);
          alert('Registration was successfull');
           this.router.navigate(['/login']);
        },
        error: (error) => {
          console.log('Registration failed: ', error);
        }
      });
    }
   }
}


