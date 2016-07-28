import { Injectable } from '@angular/core';
import {AngularFire,FirebaseListObservable} from 'angularfire2';
import {Observable} from 'rxjs/Observable';
import { Events } from 'ionic-angular';
import { UserData } from './user-data';

@Injectable()
export class StationData {
  private stations:FirebaseListObservable<any>;

  constructor(private af:AngularFire,private events:Events, private userData:UserData) {
    this.events = events;
    this.af = af;
    this.listenToLoginEvents();
  }
  listenToLoginEvents() {
    console.log("listenToLoginEvents");
    //fired when the user logs in
    this.events.subscribe('user:login', () => {
      console.log("load stations");
    this.loadStations();
    });
    this.events.subscribe('user:logout', () => {
      if(this.stations) {
        this.stations = null;
      }
    });
  }
  private loadStations(){
    console.log("loading stations");
    this.stations = this.af.database.list("/stations2");
  }

}
