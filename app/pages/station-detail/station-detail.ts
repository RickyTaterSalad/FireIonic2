import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
@Component({
  templateUrl: 'build/pages/station-detail/station-detail.html'
})
export class StationDetailPage {
  station: any;

  constructor(private navParams: NavParams) {
    this.station = navParams.data;
  }
}
