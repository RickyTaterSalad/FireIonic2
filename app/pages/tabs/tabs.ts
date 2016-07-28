import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { StationsPage } from '../stations/stations';
import { AccountPage } from '../account/account';
import { MapPage } from '../map/map';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root:any = StationsPage;
  tab2Root:any = AccountPage;
  tab3Root:any = AboutPage;
  tab4Root:any = MapPage;
  mySelectedIndex:number;

  constructor(navParams:NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }
}
