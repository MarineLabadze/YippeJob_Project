import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { WorkerComponent } from './components/worker/worker.component';
import { ReceivingRequestComponent } from './components/receiving-request/receiving-request.component';
import { AddJobComponent } from './components/add-job/add-job.component';
import { ChangeIdComponent } from './components/change-id/change-id.component';
import { DeleteJobComponent } from './components/delete-job/delete-job.component';
import { DeleteUserComponent } from './components/delete-user/delete-user.component';

const routes: Routes = [
{path:'registration',component:RegistrationComponent},
{path:'admin',component:AdminComponent},
{path:'worker',component:WorkerComponent},
{path:'login',component:LoginComponent},
{path:'request',component:ReceivingRequestComponent},
{path:'addJob',component:AddJobComponent},
{path:'changeId',component:ChangeIdComponent},
{path:'deleteJob',component:DeleteJobComponent},
{path:'deleteUser',component:DeleteUserComponent},


{path:'',redirectTo:'/registration',pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
