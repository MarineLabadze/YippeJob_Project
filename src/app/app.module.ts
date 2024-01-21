import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './Services/user.service';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { WorkerComponent } from './components/worker/worker.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CurrentDateComponent } from './components/current-date/current-date.component';
import { TableComponent } from './components/table/table.component';
import { SendRequestComponent } from './components/send-request/send-request.component';
import { FormsModule } from '@angular/forms';
import { ReceivingRequestComponent } from './components/receiving-request/receiving-request.component';
import { AddJobComponent } from './components/add-job/add-job.component';
import { ChangeIdComponent } from './components/change-id/change-id.component';
import { DeleteJobComponent } from './components/delete-job/delete-job.component';
import { DeleteUserComponent } from './components/delete-user/delete-user.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    AdminComponent,
    LoginComponent,
    WorkerComponent,
    NavigationComponent,
    CurrentDateComponent,
    TableComponent,
    SendRequestComponent,
    ReceivingRequestComponent,
    AddJobComponent,
    ChangeIdComponent,
    DeleteJobComponent,
    DeleteUserComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
     ReactiveFormsModule,
     HttpClientModule,
     FormsModule,
     TranslateModule.forRoot(
      {
      loader:{
        provide:TranslateLoader,
        useFactory:HttpLoaderFactory,
        deps:[HttpClient]
      }
    }
    )
     
     
  ],
  providers: [UserService,
    HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
