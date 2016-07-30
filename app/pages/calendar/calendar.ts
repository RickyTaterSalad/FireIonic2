import {Component, OnInit, OnDestroy, ElementRef} from '@angular/core';
import {NavController} from 'ionic-angular';
//import {SlideEdgeGesture} from 'ionic-angular/gestures/slide-edge-gesture';
import { CalendarDetailPage } from '../calendar-detail/calendar-detail';

/*
 Generated class for the CalendarPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
var debugCodes = ["A", "B", "C"];

export class Day {
  dateString: string;
  month:number;
  year:number;
  dayOfMonth:number;
  shiftCode:string;
  shiftsAvailable:number;


  constructor() {
    this.shiftCode = debugCodes[Math.floor(Math.random() * 2) + 1];
    this.shiftsAvailable = Math.floor(Math.random() * 30) + 1;


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
export class CalendarPage/* implements OnInit, OnDestroy */ {
  //el:HTMLElement;
  //pressGesture:SlideEdgeGesture;
  calendarMonth:CalendarMonth;
  daysOfWeek:string[];
  private monthLookup:string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  private currentMonth:number;
  private currentYear:number;


  constructor(private nav:NavController, el:ElementRef) {
    // this.el = el.nativeElement;
    let dt = new Date();
    this.currentMonth = 0;//dt.getMonth();
    console.log("month: " + this.currentMonth);
    this.currentYear = 2016;//dt.getFullYear();
    this.monthLookup = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    this.refreshCalendar();
  }

  /*
   ngOnInit() {
   this.pressGesture = new SlideEdgeGesture(this.el, {edges: ["left", "right"]});
   this.pressGesture.listen();
   this.pressGesture.on('left', e => {
   console.log('pressed!!');
   })
   }

   ngOnDestroy() {
   this.pressGesture.destroy();
   }
   */

  ShowDetails:Function = function (day:Day) {
    this.nav.push(CalendarDetailPage, day);
  };
  PreviousMonth:Function = function () {
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
    //get the day of the week the first day of the month falls on
    let dayOfTheWeekOffset = date.getDay();
    console.log("first day offset: " + dayOfTheWeekOffset);

    //back up the date so we fill in dates before the first day of the month (previous month)
    date.setDate(date.getDate() - dayOfTheWeekOffset);
    var calendarMonth = new CalendarMonth();

    //loop through all cells in the calendar, populating the date
    for (let i = 0; i < 6; i++)
      for (let j = 0; j < 7; j++) {
        var day = new Day();
        day.dayOfMonth = date.getDate();
        day.year = date.getFullYear();
        day.month = date.getMonth();
        day.dateString = date.toString();
        calendarMonth.weeks[i].days[j] = day;
        date.setDate(date.getDate() + 1);
      }
    calendarMonth.year = this.currentYear;
    calendarMonth.month = this.monthLookup[this.currentMonth];

    this.calendarMonth = calendarMonth;


  }

}
