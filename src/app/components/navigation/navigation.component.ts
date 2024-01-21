import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  showLogoutButton = false;
  lang:string ='';

  constructor(private userService: UserService, private router: Router,private translateService:TranslateService) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      this.showLogoutButton = this.shouldShowLogoutButton();
    });
    this.lang = localStorage.getItem('lang') || 'en';

  }
  ChangeLang(lang:any){
    const selectedLanguage = lang.target.value;

    localStorage.setItem('lang',selectedLanguage);

    this.translateService.use(selectedLanguage);

  }

  logOut() {
    this.userService.logOut();
  }
 //if current route is these ones,we need to add button
  private shouldShowLogoutButton(): boolean {
    const currentRoute = this.router.url;
    return currentRoute.includes('/admin') || currentRoute.includes('/worker')|| currentRoute.includes('/request')|| currentRoute.includes('/deleteJob')|| currentRoute.includes('/deleteUser')|| currentRoute.includes('/addJob')|| currentRoute.includes('/changeId');
  }
}

