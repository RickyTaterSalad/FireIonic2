import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import {AngularFire} from 'angularfire2';
@Injectable()
export class UserData {
  displayName:string;
  uid:string;

  constructor(private events:Events, private af:AngularFire) {
    this.events = events;
    this.af = af;
    this.af.auth.subscribe((dat) =>{this.authChanged(dat)});
  }
  private authChanged(user_dat) {
    console.dir(user_dat);
    if (user_dat) {
      this.uid = user_dat.uid;
      if (user_dat.auth) {
        this.displayName = user_dat.auth.displayName;
        console.log(this.displayName);
      }
      this.events.publish('user:login');
    }
  }
  private clear() {
    this.displayName = null;
    this.uid = null;
  }

  login() {
    this.af.auth.login();
  }

  logout() {
    this.af.auth.logout();
    console.log("user not logged in");
    this.clear();
    this.events.publish('user:logout');

  }
}
