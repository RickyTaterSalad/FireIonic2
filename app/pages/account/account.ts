import { Component } from '@angular/core';
import { Alert, NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { UserData } from '../../providers/user-data';

var debugCodes = ["A", "B", "C"];

class Day {
  dayOfMonth:number;
  shiftCode:string;

  constructor() {
    this.shiftCode = debugCodes[Math.floor(Math.random() * 2) + 1];
  }

}
class Week {
  days:Array<Day>;

  constructor() {
    this.days = new Array<Day>(7);
    for (let i = 0; i < this.days.length; i++) {
      this.days[i] = new Day();
    }

  }
}

class CalendarMonth {
  weeks:Array<Week>;
  year:number;
  month:string;

  constructor() {
    this.weeks = new Array<Week>(6);
    for (let i = 0; i < this.weeks.length; i++) {
      this.weeks[i] = new Week();
    }
  }
}

@Component({
  templateUrl: 'build/pages/account/account.html',
})


export class AccountPage {
  calendarMonth:CalendarMonth;
  username:string;
  daysOfWeek:Array<string>;
  private monthLookup:Array<string>;
  private currentMonth:number;
  private currentYear:number;
  uid:string;

  constructor(private nav:NavController, private userData:UserData) {
    let dt = new Date();
    this.currentMonth = dt.getMonth();
    console.log("month: " + this.currentMonth);
    this.currentYear = dt.getFullYear();
    this.userData = userData;
    this.monthLookup = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    console.log("user data");
    console.dir(userData);
    this.refreshCalendar();
  }

  logout() {
    this.userData.logout();
  }

  PreviousMonth = function () {
    if (this.currentMonth == 0) {
      this.currentYear--;
      this.currentMonth = 11;
    }
    else {
      this.currentMonth--;
    }
    this.refreshCalendar();
  };

  NextMonth = function () {
    if (this.currentMonth == 11) {
      this.currentYear++;
      this.currentMonth = 0;
    }
    else {
      this.currentMonth++;
    }
    this.refreshCalendar();
  };

  refreshCalendar:Function = function () {
    var calendarMonth = new CalendarMonth();
    calendarMonth.year = this.currentYear;
    calendarMonth.month = this.monthLookup[this.currentMonth];
    var date = new Date(this.currentYear, this.currentMonth, 1);
    let dayOfWeek = null;
    let currentWeek = 0;

    while (date.getMonth() == this.currentMonth) {
      let dayOfWeek = date.getDay();
      console.log("current week/day/date: " + currentWeek + "/" + dayOfWeek + "/" + date.getDate());
      calendarMonth.weeks[currentWeek].days[dayOfWeek].dayOfMonth = date.getDate();
      if (dayOfWeek == 6) {
        currentWeek++;
      }
      date.setDate(date.getDate() + 1);
    }
    console.dir(calendarMonth);
    this.calendarMonth = calendarMonth;

  }
}


