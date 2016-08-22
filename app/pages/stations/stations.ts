import { Component, ViewChild } from '@angular/core';
import { NavController, List } from 'ionic-angular';
import { StationData } from '../../providers/station-data';
import { StationDetailPage } from '../station-detail/station-detail';

@Component({
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
    this.nav.push(StationDetailPage, sessionData);
  }

}
