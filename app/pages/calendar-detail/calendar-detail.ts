import {Component} from '@angular/core';
import {NavParams, NavController} from 'ionic-angular';
import {Day} from '../calendar/calendar';
import {MessageUserPage} from '../message-user/message-user';
import {CreatePostPage} from '../create-post/create-post';
import {RemovePostPage} from '../remove-post/remove-post';
import {OfferPostPage} from '../offer-post/offer-post';

interface Shift {
  year:number,
  month:number,
  day:number,
  platoon:string,
  start_time:string,
  end_time:string
}


export interface Post {
  shift:Shift,
  station_id:string,
  is_trade:boolean,
  is_overtime:boolean,
  is_assigned_hire:boolean,
  is_regular:boolean,
  request_type:string,
  first_name:string,
  last_name:string,
  user_id:string,
  station_address:string,
  timestamp:Date
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
    "first_name": "Matt",
    "last_name": "Mammone",
    "station_address": "11 N. Way St, Madison, WI 53703",
    "timestamp": new Date(2016, 5, 2)
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
    "first_name": "Richard",
    "last_name": "Rivera",
    "station_address": "11 N. Way St, Madison, WI 53703",
    "timestamp": new Date(2015, 3, 22)
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
    "first_name": "Tony",
    "last_name": "Mason",
    "station_address": "11 N. Way St, Madison, WI 53703",
    "timestamp": new Date(2016, 1, 1)
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
    "station_id": "1",
    "is_trade": false,
    "is_overtime": true,
    "is_assigned_hire": false,
    "is_regular": false,
    "request_type": "off",
    "user_id": "1234",
    "first_name": "Sophya",
    "last_name": "Rivera",
    "station_address": "11 N. Way St, Madison, WI 53703",
    "timestamp": new Date(2019, 1, 1)
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
    "station_id": "55",
    "is_trade": false,
    "is_overtime": true,
    "is_assigned_hire": false,
    "is_regular": false,
    "request_type": "off",
    "user_id": "1234",
    "first_name": "Sophya",
    "last_name": "Rivera",
    "station_address": "11 N. Way St, Madison, WI 53703",
    "timestamp": new Date(2019, 1, 1)
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
    "station_id": "1",
    "is_trade": false,
    "is_overtime": true,
    "is_assigned_hire": false,
    "is_regular": false,
    "request_type": "off",
    "user_id": "1234",
    "first_name": "Sophya",
    "last_name": "Rivera",
    "station_address": "11 N. Way St, Madison, WI 53703",
    "timestamp": new Date(2012, 1, 1)
  }

]
interface SearchParameters {
  isTrade:boolean,
  isCover:boolean,
  isOnType:boolean,
  isOffType:boolean,
  sortField:string,
  showListOptions:boolean
}
/*
 Generated class for the CalendarDetailPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/calendar-detail/calendar-detail.html'
})
export class CalendarDetailPage {
  private day:any;
  private posts:Array<Post>;
  private searchParameters:SearchParameters;
  private filteredPosts:Array<Post>;
  private nav:NavController;

  constructor(nav:NavController, private navParams:NavParams) {
    this.day = navParams.data;
    this.nav = nav;
    this.posts = this.filteredPosts = posts;
    this.searchParameters = {
      isCover: true,
      isTrade: true,
      isOnType: true,
      isOffType: true,
      sortField: "timestamp,desc",
      showListOptions: false
    };
  }

  toggleTrade:Function = function () {
    //  console.log("toggle trade");
    this.searchParameters.isTrade = !this.searchParameters.isTrade;
    this.filterResults();
  }
  toggleOvertime:Function = function () {
    //console.log("toggle overtime");
    this.searchParameters.isCover = !this.searchParameters.isCover;
    this.filterResults();
  }
  toggleOff:Function = function () {
    //  console.log("toggle off");
    this.searchParameters.isOffType = !this.searchParameters.isOffType;
    this.filterResults();
  }
  toggleOn:Function = function () {
    // console.log("toggle on");
    this.searchParameters.isOnType = !this.searchParameters.isOnType;
    this.filterResults();
  }
  sortPosts:Function = function () {
    this.sortPostArray(this.filteredPosts);

  }

  private sortPostArray(postArray:Array<Post>) {
    if (!postArray || !this.searchParameters || !this.searchParameters.sortField) {
      return;
    }
    let sortSplit = this.searchParameters.sortField.split(',');
    if (sortSplit.length != 2) {
      return;
    }
    var sortField = sortSplit[0];
    var sortDirection = sortSplit[1];
    return postArray.sort((a:Post, b:Post)=> {

      if (sortDirection == "asc") {
        if (a[sortField] < b[sortField]) {
          return -1;
        } else if (a[sortField] > b[sortField]) {
          return 1;
        } else {
          return 0;
        }
      }
      else {
        if (a[sortField] < b[sortField]) {
          return 1;
        } else if (a[sortField] > b[sortField]) {
          return -1;
        } else {
          return 0;
        }
      }
    });
  }

  offerOnPost:Function = function (post) {
    this.nav.push(OfferPostPage, {day: this.day, post: post});
  }
  removePost:Function = function () {
    //get the users posts
    this.nav.push(RemovePostPage, this.day);
  }
  createPost:Function = function () {
    this.nav.push(CreatePostPage, this.day);
  }

  filterResults:Function = function () {
    // console.dir(this.searchParameters);
    let tempFilteredPosts = this.posts.filter((post:Post) => {
      if (!this.searchParameters.isOffType && post.request_type == "off") {
        // console.log("off type and shift is off. return false");
        return false;
      }
      if (!this.searchParameters.isOnType && post.request_type == "on") {
        //  console.log("on type and shift is on. return false");
        return false;
      }
      var tradeGood = this.searchParameters.isTrade && post.is_trade;
      var overtimeGood = this.searchParameters.isCover && post.is_overtime;
      //  console.log("trade good: " + tradeGood + " overtime: " + overtimeGood);
      return tradeGood || overtimeGood;

    });
    this.filteredPosts = this.sortPostArray(tempFilteredPosts);
  };
  messageUser:Function = function (post) {
    if (post) {
      this.nav.push(MessageUserPage, post);
    }
  }

}
