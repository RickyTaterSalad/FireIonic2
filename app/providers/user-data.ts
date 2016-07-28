import {Injectable} from '@angular/core';
import {Events} from 'ionic-angular';
import {AngularFire} from 'angularfire2';
@Injectable()
export class UserData {
  displayName:string;
  uid:string;
  userInfo:any;

  constructor(private events:Events, private af:AngularFire) {
    this.events = events;
    this.af = af;
    this.af.auth.subscribe((dat) => {
      this.authChanged(dat)
    });
  }

  private authChanged(user_dat) {
    console.dir(user_dat);
    if (user_dat) {
      this.LoadUserInfo(user_dat);
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

  private LoadUserInfo(user_dat) {
    console.log("LoadUserInfo");
    if (user_dat) {
      this.uid = user_dat.uid;
      if (user_dat.auth) {
        this.displayName = user_dat.auth.displayName;
        console.log(this.displayName);
        this.events.publish('user:login');
      }
    }
    if (this.uid) {
      console.log("user info ref");
      var path = '/users/' + this.uid;
      var promise = this.af.database.object(path).subscribe((obj) => {
        promise.unsubscribe();
        if (!obj['$value']) {
          //send user to the sign up page
        }
      });
    }
  }

  logout() {
    this.af.auth.logout();
    console.log("user not logged in");
    this.clear();
    this.events.publish('user:logout');
  }
}
