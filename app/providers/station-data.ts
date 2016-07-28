import { Injectable } from '@angular/core';
import { UserData } from './user-data';
import {AngularFire,FirebaseListObservable} from 'angularfire2';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class StationData {
  private stations:any;

  constructor(private af:AngularFire) {
    this.af = af;
  }
  listStations() {
    console.log("load dat");
    if (this.stations) {
      // already loaded data
      return this.stations;
    }
    else {
      this.stations = this.af.database.list("/stations2");
      console.dir(this.stations);
      return this.stations;
    }
  }


}
