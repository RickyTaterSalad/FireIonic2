import {Component,
  OnInit,
  OnDestroy,
  ElementRef,
  trigger, state, style, transition, animate, keyframes
} from '@angular/core';
import {NavController,Loading } from 'ionic-angular';
//import {SlideEdgeGesture} from 'ionic-angular/gestures/slide-edge-gesture';
import { CalendarDetailPage } from '../calendar-detail/calendar-detail';
import { DepartmentData } from '../../providers/department-data';
import {FirebaseObjectObservable} from 'angularfire2';

import * as moment from 'moment';


var template = {
  "platoonTemplate": ["A", "C", "A", "B", "A", "B", "C", "B", "C"],
  "startDate": {"month": 6, "day": 25, "year": 2016},
  startTime:"0800"
};

/*
 Generated class for the CalendarPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */

var platoonLookup = {
  "A": "#ff0000",
  "B": "#0000ff",
  "C": "#00897B"

};

export class Day {
  dateString:string;
  month:number;
  year:number;
  dayOfMonth:number;
  platoon:string;
  startTime:string;
  color:string = "#DFDFDF";

}

class MonthAndYear {
  year:number;
  month:number;

  constructor(month:number, year:number) {
    this.year = year;
    this.month = month;
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
  yearShort:string;
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
  animations: [
    trigger('fade', [
      state('visible', style({
        opacity: 1
      })),
      state('invisible', style({
        opacity: 0
      })),
      transition('visible <=> invisible', animate('1500ms linear'))
    ]),
    trigger('flyInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('outRight', style({
        transform: 'translate3d(105%, 0, 0)'
      })),
      state('outLeft', style({
        transform: 'translate3d(-105%, 0, 0)'
      })),
      transition('in => outLeft', animate('400ms ease-in')),
      transition('in => outRight', animate('400ms ease-in')),
      transition('outLeft => in', animate('400ms ease-out')),
      transition('outRight => in', animate('400ms ease-out'))
    ]),
  ]
})
export class CalendarPage/* implements OnInit, OnDestroy */ {
  //el:HTMLElement;
  //pressGesture:SlideEdgeGesture;
  calendarMonth:CalendarMonth = new CalendarMonth();
  flyInOutState:string = "in";
  fadeState:string = "visible";
  systemMonthAndYear:MonthAndYear;
  currentCalendarMonthAndYear:MonthAndYear;
  daysOfWeek:string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  private monthLookup:string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  private shifts:Array<Object>;
  private nav:NavController;
  private deptData:DepartmentData;

  constructor(nav:NavController, deptData:DepartmentData) {
    this.nav = nav;
    this.deptData = deptData;
    // this.el = el.nativeElement;
    this.UpdateCurrentSystemMonthAndYear();
    this.currentCalendarMonthAndYear = new MonthAndYear(this.systemMonthAndYear.month, this.systemMonthAndYear.year);
    this.PopulateCalendar();
  }

  private UpdateCurrentSystemMonthAndYear:Function = function () {
    let dt = new Date();
    this.systemMonthAndYear = new MonthAndYear(dt.getMonth(), dt.getFullYear());
  };

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

  ShowDetails:Function = function (evt:Event, day:Day) {
    if (evt && evt.srcElement) {
      evt.srcElement.classList.toggle("pressed");
      setTimeout(() => {
        evt.srcElement.classList.toggle("pressed");
      }, 450);
    }
    this.nav.push(CalendarDetailPage, day);
  };

  private EndAnimation:Function = function () {
    setTimeout(() => {
      this.flyInOutState = "in";
      this.fadeState = "visible";
    }, 100);
  };
  private AnimateCalendarChange:Function = function (outDirection) {
    this.flyInOutState = outDirection;
    this.fadeState = "invisible";
  };
  PreviousMonth:Function = function () {
    this.AnimateCalendarChange("outRight");
    if (this.currentCalendarMonthAndYear.month == 0) {
      this.currentCalendarMonthAndYear.year--;
      this.currentCalendarMonthAndYear.month = 11;
    }
    else {
      this.currentCalendarMonthAndYear.month--;
    }
    this.PopulateCalendar();
    this.EndAnimation();

  };
  NextMonth:Function = function () {
    this.AnimateCalendarChange("outLeft");
    if (this.currentCalendarMonthAndYear.month == 11) {
      this.currentCalendarMonthAndYear.year++;
      this.currentCalendarMonthAndYear.month = 0;
    }
    else {
      this.currentCalendarMonthAndYear.month++;
    }
    this.PopulateCalendar();
    this.EndAnimation();

  };
  private GetScheduleOffset:Function = function (month, year) {
    var dt = moment([template.startDate.year, template.startDate.month, template.startDate.day, 0, 0]);
    var dt2 = moment([year, month, 1, 0, 0]);
    var diff = dt2.diff(dt, "days");
    return diff % (template.platoonTemplate.length);
  }
  GoToCurrentMonth:Function = function () {
    this.AnimateCalendarChange("outRight");
    this.UpdateCurrentSystemMonthAndYear();
    this.currentCalendarMonthAndYear = this.systemMonthAndYear;
    this.PopulateCalendar();
    setTimeout(() => {
      this.flyInOutState = "in";
      this.fadeState = "visible";
    }, 100);
    this.EndAnimation();
  };
  PopulateCalendar:Function = function () {
    this.UpdateCurrentSystemMonthAndYear();
    let scheduleOffset = this.GetScheduleOffset(this.currentCalendarMonthAndYear.month,this.currentCalendarMonthAndYear.year);
    let date = new Date(this.currentCalendarMonthAndYear.year, this.currentCalendarMonthAndYear.month, 1);
    //get the day of the week the first day of the month falls on
    let dayOfTheWeekOffset = date.getDay();
    //back up the date so we fill in dates before the first day of the month (previous month)
    date.setDate(date.getDate() - dayOfTheWeekOffset);
    var calendarMonth = new CalendarMonth();
    calendarMonth.yearShort = this.currentCalendarMonthAndYear.year.toString().substr(2, 2);
    //loop through all cells in the calendar, populating the date
    for (let i = 0; i < 6; i++)
      for (let j = 0; j < 7; j++) {
        var day = new Day();
        day.dayOfMonth = date.getDate();
        day.year = date.getFullYear();
        day.month = date.getMonth();
        day.dateString = date.toString();
        calendarMonth.weeks[i].days[j] = day;
        day.platoon = template.platoonTemplate[ scheduleOffset% template.platoonTemplate.length];
        console.log(day.platoon);
        day.startTime = template.startTime;
        day.color = platoonLookup[day.platoon];
        date.setDate(date.getDate() + 1);
        scheduleOffset++
      }
    calendarMonth.year = this.currentCalendarMonthAndYear.year;
    calendarMonth.month = this.monthLookup[this.currentCalendarMonthAndYear.month];
    this.calendarMonth = calendarMonth;
  }

}
