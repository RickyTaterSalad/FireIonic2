import {Component, OnInit, OnDestroy, ElementRef} from '@angular/core';
import {NavController} from 'ionic-angular';
//import {SlideEdgeGesture} from 'ionic-angular/gestures/slide-edge-gesture';
import { CalendarDetailPage } from '../calendar-detail/calendar-detail';
import { DepartmentData } from '../../providers/department-data';
import {FirebaseObjectObservable} from 'angularfire2';
/*
 Generated class for the CalendarPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */

var platoonLookup = {
  "A": "#ff0000",
  "B": "#0000ff",
  "C": "#00ff00"

}

export class Day {
  dateString: string;
  month:number;
  year:number;
  dayOfMonth:string;
  platoon:string;
  startTime:string;
  color:string;

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
  templateUrl: 'build/pages/calendar/calendar.html',
})
export class CalendarPage/* implements OnInit, OnDestroy */ {
  //el:HTMLElement;
  //pressGesture:SlideEdgeGesture;
  calendarMonth:CalendarMonth = new CalendarMonth();


  daysOfWeek:string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  private monthLookup:string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  private currentMonth:number;
  private currentYear:number;
  private department:FirebaseObjectObservable<Object>;


  constructor(private nav:NavController, el:ElementRef,private deptData:DepartmentData) {
    // this.el = el.nativeElement;

    let dt = new Date();
    this.currentMonth = dt.getMonth();
    console.log("month: " + this.currentMonth);
    this.currentYear = dt.getFullYear();
    deptData.RetrieveUsersDepartment().then((dat) =>{
      console.log("got department");
      this.department = dat;
      this.refreshCalendar();
    });
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
    var hasShifts = this.department && this.department.shifts;


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
        var dayString = date.getDate() + "";
        day.dayOfMonth = dayString;
        day.year = date.getFullYear();
        day.month = date.getMonth();
        day.dateString = date.toString();
      //  console.log("Date: " +  day.dateString);
        calendarMonth.weeks[i].days[j] = day;
        if(hasShifts) {
          var yearString = date.getFullYear() + "";
          var actualMonth = (date.getMonth() + 1);
          var monthString = actualMonth + "";
          if (actualMonth < 10) {
            monthString = "0" + monthString;
          }
          var shiftsForMonth = null;
          if (this.department.shifts[yearString] && this.department.shifts[yearString][monthString]) {
            shiftsForMonth = this.department.shifts[yearString][monthString];
          }

          if (shiftsForMonth && shiftsForMonth[dayString]) {
         //   console.log("retrieve shifts for: " + yearString + "/" + monthString + "/" + dayString);
            var shiftsForDay = shiftsForMonth[dayString];
            day.platoon = shiftsForDay.platoon;
            day.startTime = shiftsForDay.startTime;
            day.color = platoonLookup[day.platoon];
          }
        }
        date.setDate(date.getDate() + 1);

      }
    calendarMonth.year = this.currentYear;
    calendarMonth.month = this.monthLookup[this.currentMonth];
    console.dir(calendarMonth);

    this.calendarMonth = calendarMonth;


  }

}
