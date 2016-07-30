import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {createUrlResolverWithoutPackagePrefix} from "@angular/compiler/esm/src/url_resolver";

/*
 Generated class for the CalendarPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
var debugCodes = ["A", "B", "C"];

class Day {
  month:number;
  year:number;
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
    /*
     for (let i = 0; i < this.days.length; i++) {
     this.days[i] = new Day();
     }
     */

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
  templateUrl: 'build/pages/calendar/calendar.html',
})
export class CalendarPage {
  calendarMonth:CalendarMonth;
  daysOfWeek:string[];
  private monthLookup:string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  private currentMonth:number;
  private currentYear:number;


  constructor(private nav:NavController) {
    let dt = new Date();
    this.currentMonth = 0;//dt.getMonth();
    console.log("month: " + this.currentMonth);
    this.currentYear = 2016;//dt.getFullYear();
    this.monthLookup = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    this.refreshCalendar();
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

  NextMonth:Function = function () {
    if (this.currentMonth == 11) {
      this.currentYear++;
      this.currentMonth = 0;
    }
    else {
      this.currentMonth++;
    }
    this.refreshCalendar();
  };
  private getDateFromDayOfYear:Function = function (dayOfYear, year) {
    var date = new Date(year, 0); // initialize a date in `year-01-01`

    return new Date(date.setDate(dayOfYear)); // add the number of days
  };

  refreshCalendar:Function = function () {
    var date = new Date(this.currentYear, this.currentMonth, 1);
    //get the offset
    let dayOfTheWeekOffset = date.getDay();
    console.log("first day offset: " + dayOfTheWeekOffset);
    //first date on a yearly calendar

    date.setDate(date.getDate() - dayOfTheWeekOffset);




    var calendarMonth = new CalendarMonth();
    for (let i = 0; i < 6; i++)
      for (let j = 0; j < 7; j++) {
        var day = new Day();
        day.dayOfMonth = date.getDate();
        day.year = date.getFullYear();
        day.month = date.getMonth();
        //  console.log("Week/Day" + j + "/" + i);
        calendarMonth.weeks[i].days[j] = day;
        date.setDate(date.getDate() + 1);
      }
    //  console.dir(calendarMonth);

//todo: need to jump years for jan and december

    calendarMonth.year = this.currentYear;
    calendarMonth.month = this.monthLookup[this.currentMonth];
    //  var date = new Date(this.currentYear, this.currentMonth, 1);
    // let dayOfWeek = null;
    //let currentWeek = 0;

    /*
     while (date.getMonth() == this.currentMonth) {
     let dayOfWeek = date.getDay();
     console.log("current week/day/date: " + currentWeek + "/" + dayOfWeek + "/" + date.getDate());
     calendarMonth.weeks[currentWeek].days[dayOfWeek].dayOfMonth = date.getDate();
     if (dayOfWeek == 6) {
     currentWeek++;
     }
     date.setDate(date.getDate() + 1);
     }
     */
    console.dir(calendarMonth);
    this.calendarMonth = calendarMonth;


  }

}
