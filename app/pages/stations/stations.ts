import { Component, ViewChild } from '@angular/core';
import { Alert, App, ItemSliding, List, Modal, NavController, Page } from 'ionic-angular';
import { StationData } from '../../providers/station-data';
import { StationDetailPage } from '../station-detail/station-detail';
import { UserData } from '../../providers/user-data';


@Component({
  templateUrl: 'build/pages/stations/stations.html'
})

export class StationsPage {
  // the list is a child of the schedule page
  // @ViewChild('scheduleList') gets a reference to the list
  // with the variable #scheduleList, `read: List` tells it to return
  // the List and not a reference to the element
  @ViewChild('stationList', {read: List}) stationList: List;
  stations = [];

  constructor(
    private app: App,
    private nav: NavController,
    private stationData: StationData,
    private user: UserData
  ) {
    this.stations = stationData.listStations();
    console.log("stations");
    console.dir(this.stations);
  }
  goToStationDetail(sessionData) {
    // go to the session detail page
    // and pass in the session data
    this.nav.push(StationDetailPage, sessionData);
  }

}
