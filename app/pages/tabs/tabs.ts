import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {AboutPage} from '../about/about';
import {StationsPage} from '../stations/stations';
import {CalendarPage} from '../calendar/calendar';
import {AccountPage} from '../account/account';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root:any = CalendarPage;
  tab2Root:any = AccountPage;
  tab3Root:any = AboutPage;
  tab4Root:any = StationsPage;
  mySelectedIndex:number;

  constructor(navParams:NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }
}
