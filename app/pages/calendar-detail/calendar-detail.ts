import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {Day} from '../calendar/calendar';
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

  constructor(private navParams:NavParams) {
    this.day = navParams.data;
  }

}
