import {Component} from '@angular/core';
import {NavParams,NavController} from 'ionic-angular';
import {Day} from '../calendar/calendar';
import { MessageUserPage} from '../message-user/message-user';

interface Shift{
  year:number,
  month:number,
  day:number,
  platoon:string,
  start_time:string,
  end_time:string
}


export interface Post{
  shift:Shift,
  station_id:string,
  is_trade:boolean,
  is_overtime:boolean,
  is_assigned_hire:boolean,
  is_regular:boolean,
  request_type:string,
  user_name:string,
  user_id:string,
  station_address:string,
}

var posts:Array<Post> = [
  {
    "shift": {
      "day": 12,
      "year": 2016,
      "month": 8,
      "platoon": "C",
      "start_time": "0800",
      "end_time": "0900"
    },
    "station_id": "23",
    "is_trade": false,
    "is_overtime": true,
    "is_assigned_hire": false,
    "is_regular": false,
    "request_type": "on",
    "user_id": "1234",
    "user_name": "Richard Rivera",
    "station_address": "11 N. Way St, Madison, WI 53703"
  },
  {
    "shift": {
      "day": 12,
      "year": 2016,
      "month": 8,
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
    "user_id": "1234",
    "user_name": "Richard Rivera",
    "station_address": "11 N. Way St, Madison, WI 53703"
  },
  {
    "shift": {
      "day": 12,
      "year": 2016,
      "month": 8,
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
    "user_id": "1234",
    "user_name": "Richard Rivera",
    "station_address": "11 N. Way St, Madison, WI 53703"
  }


]
interface SearchParameters {
  isTrade:boolean,
  isCover:boolean,
  isOnType:boolean,
  isOffType:boolean
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
  private posts:Array<Post>;
  private   searchParameters:SearchParameters;
  private filteredPosts:Array<Post>;
  private nav:NavController;

  constructor(nav:NavController, private navParams:NavParams) {
    this.day = navParams.data;
    this.nav = nav;
    this.posts = this.filteredPosts = posts;
    this.searchParameters = {isCover: true, isTrade: true,isOnType:true,isOffType:true};
  }
  toggleTrade:Function = function(){
    this.searchParameters.isTrade= !this.searchParameters.isTrade;
    this.filterResults();
  }
  toggleOvertime:Function = function(){
    this.searchParameters.isCover= !this.searchParameters.isCover;
    this.filterResults();
  }
  toggleOff:Function = function(){
    this.searchParameters.isOffType = !this.searchParameters.isOffType;
    this.filterResults();
  }
  toggleOn:Function = function(){
    this.searchParameters.isOnType= !this.searchParameters.isOnType;
    this.filterResults();
  }
  filterResults:Function = function(){
   console.dir(this.searchParameters);
    this.filteredPosts = this.posts.filter((post:Post) => {
      if(!this.searchParameters.isOffType && post.request_type == "off"){
        console.log("off type and shift is off. return false");
        return false;
      }
      if(!this.searchParameters.isOnType && post.request_type == "on"){
        console.log("on type and shift is on. return false");
        return false;
      }
      var tradeGood = this.searchParameters.isTrade  && post.is_trade;
      var overtimeGood = this.searchParameters.isCover && post.is_overtime;
      console.log("trade good: " + tradeGood + " overtime: " + overtimeGood);
      return tradeGood || overtimeGood;

    });
    console.dir(this.filteredPosts.length);
  };
  messageUser:Function = function(post){
    if(post) {
      this.nav.push(MessageUserPage, post);
    }
  }

}
