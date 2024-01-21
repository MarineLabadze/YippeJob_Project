import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Job } from '../Interfaces/job';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  private apiUrl = 'https://localhost:44330/api/user';

  constructor(private http: HttpClient, private router: Router) { }
//REGISTER USER
  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData)
  }
//GET JOBS
  getJobOptions(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/jobs`);
  }
  //JOG IN USER
  logInUser(userData: any): Observable<any>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.http.post<string>(`${this.apiUrl}/login`, userData, 
    {headers, responseType: 'text' as 'json'});
  }
  //LOG OUT
  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }
  //DET SCHEDULE
  getSchedules(): Observable<any[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/dashboard`);
  }
  //SEND REQUEST
  sendRequest(userData: any): Observable<any> {
    return this.http.post(`https://localhost:44330/api/Worker/add-schedule-request`, userData)
  }
  //GET REQUEST
  getRequests(): Observable<any[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/dashboard`);
  }
  //APPROVE REQUEST
  approveRequest(scheduleId: number): Observable<any> {
    const url = `https://localhost:44330/api/Admin/approve-schedule-request?scheduleId=${scheduleId}`;
    return this.http.post(url, {});
  }
  //DELETE REQUEST
  deleteRequest(scheduleId: number): Observable<any> {
    const url = `https://localhost:44330/api/Admin/delete-schedule/${scheduleId}`;
    return this.http.delete(url);
  }
  //ADD JOBS
addJobPosition(jobDto: { title: string }): Observable<any> {
  const url = `https://localhost:44330/api/Admin/add-new-job`;
  return this.http.post(url, jobDto);
}
//CHANGE ROLE
changeUserRole(userId: number, newRoleId: number): Observable<any> {
  const changeUserRoleDTO = { UserId: userId, NewRoleId: newRoleId };
  const url = `https://localhost:44330/api/Admin/change-user-role`; 
  return this.http.post(url, changeUserRoleDTO);
}
//DELETE JOB
deleteJobPosition(jobId: number): Observable<any> {
  const url = `https://localhost:44330/api/Admin/delete-job/${jobId}`;
  return this.http.delete(url);
}
 //DELETE USER
 deleteUser(userId: number): Observable<any> {
  const url = `https://localhost:44330/api/Admin/delete-user/${userId}`;
  return this.http.delete(url);
}
}
