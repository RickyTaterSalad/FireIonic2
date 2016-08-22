import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {Day} from '../calendar/calendar';
var posts = [
  {
    "shift": {
      "year": {},
      "month": {},
      "day": {},
      "platoon": "C",
      "start_time": "0800",
      "end_time": "0900"
    },
    "station_id": "23",
    "is_trade": false,
    "is_overtime": true,
    "is_assigned_hire": false,
    "is_regular": false,
    "request_type": "off",
    "user_id": "1234"
  },
  {
    "shift": {
      "year": {},
      "month": {},
      "day": {},
      "platoon": "C",
      "start_time": "0800",
      "end_time": "0900"
    },
    "station_id": "24",
    "is_trade": true,
    "is_overtime": true,
    "is_assigned_hire": false,
    "is_regular": false,
    "request_type": "off",
    "user_id": "1234"
  },
  {
    "shift": {
      "year": {},
      "month": {},
      "day": {},
      "platoon": "C",
      "start_time": "0800",
      "end_time": "0900"
    },
    "station_id": "25",
    "is_trade": false,
    "is_overtime": true,
    "is_assigned_hire": false,
    "is_regular": false,
    "request_type": "off",
    "user_id": "1234"
  }


]
interface SearchParameters {
  isSwap:boolean,
  isTrade:boolean
}
/*
 Generated class for the CalendarDetailPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/calendar-detail/calendar-detail.html',
})
export class CalendarDetailPage {
  private day:any;
  private posts:any;
  private   searchParameters:SearchParameters;

  constructor(private navParams:NavParams) {
    this.day = navParams.data;
    this.posts = posts;
    this.searchParameters = {isSwap: false, isTrade: false}
  };
  filterResults:Function = function(evt){
   console.dir(this.searchParameters);
  }

}
