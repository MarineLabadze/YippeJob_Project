import { Component } from '@angular/core';

@Component({
  selector: 'app-current-date',
  templateUrl: './current-date.component.html',
  styleUrls: ['./current-date.component.css']
})
export class CurrentDateComponent {
  //method that displayes current date
    getCurrentDate(): string {
      const currentDate = new Date();
      return currentDate.toDateString();
  }
  
}
