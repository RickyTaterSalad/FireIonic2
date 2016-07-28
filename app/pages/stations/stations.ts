import {  ViewChild } from '@angular/core';
import { Page,NavController, List } from 'ionic-angular';
import { StationData } from '../../providers/station-data';
import { StationDetailPage } from '../station-detail/station-detail';

@Page({
  templateUrl: 'build/pages/stations/stations.html'
})
export class StationsPage {
  constructor(private nav:NavController,
              private stationData:StationData) {
    this.stationData = stationData;
  }

  goToStationDetail(sessionData) {
    // go to the session detail page
    // and pass in the session data
    console.log("pushing station details page");
    this.nav.push(StationDetailPage, sessionData);
  }

}
