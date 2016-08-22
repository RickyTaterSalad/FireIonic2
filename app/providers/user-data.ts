import {Injectable} from '@angular/core';
import {Events,Storage, LocalStorage} from 'ionic-angular';
import { Splashscreen, StatusBar } from 'ionic-native';
import {AngularFire} from 'angularfire2';
@Injectable()
export class UserData {
  displayName:string;
  photoURL:string;
  public loggedIn:boolean;
  HasUserRegistered:boolean;
  private storage:Storage;

  constructor(private events:Events, private af:AngularFire) {
    this.events = events;
    this.storage = new Storage(LocalStorage);
    this.loggedIn = false;
    this.af = af;
   // this.setupAuth()
  }

  private setupAuth() {
    //the af auth subscribe is slow to retrieve the key from local storage

    return this.storage.get('user_auth').then((user_data_string)=> {

      //debug until login is fixed

      this.InitUser({
        "uid": "HXACL4BGMoRx5MitbOl5v3FBSIC3",
        "displayName": "Ricky Rivera",
        photoURL: "https://lh3.googleusercontent.com/-Y08mWF2-A2M/AAAAAAAAAAI/AAAAAAAAH_o/RLFgPBcXft8/s96-c/photo.jpg"
      });
      this.HasUserRegistered = true;

      /*
       if (user_data_string) {
       try {
       let user_data = JSON.parse(user_data_string);
       this.InitUser(user_data);
       }
       catch (err) {
       }
       }

      //listen for login changes
      this.af.auth.subscribe((authState) => {
        if (authState && !this.loggedIn) {
          let auth = authState.auth;
          this.InitUser(auth);
          this.setUserAuthInStorage({uid: auth.uid, displayName: auth.displayName, photoURL: auth.photoURL});
        }
      });
      */
    });
  }

  private clear() {
    this.displayName = null;
    this.loggedIn = null;
    this.setUserAuthInStorage(null);

  }

  HasUserSeenTutorialAsync() {
    return this.storage.get('showTutorial');
  }

  setTutorialState(hasSeen) {
    this.storage.set('showTutorial', !hasSeen);
  }

  login() {
    return this.af.auth.login();
  }

  logout() {
    if (this.loggedIn) {
      this.af.auth.logout();
      this.clear();
      this.events.publish('user:logout');
    }
  }

  SignUserUp(userData) {
    let auth = this.af.auth.getAuth();
    if (auth && auth.uid) {
      var path = '/users/' + auth.uid;
      this.af.database.object(path).set({
        user_details: {
          station_id: userData.station.station_number
        }
      });
    }
  }

  private InitUser(userData) {
    if (!userData || !userData.uid) {
      return;
    }
    this.photoURL = userData.photoURL;
    this.displayName = userData.displayName;
    if (userData.uid) {
      var path = '/users/' + userData.uid;
      //check to see if they are registered
      //dsebug

      this.loggedIn = true;
      this.events.publish('user:login');

      /*
       var promise = this.af.database.object(path).subscribe((obj) => {
       promise.unsubscribe();
       this.HasUserRegistered = obj.user_details != null;
       if (!this.loggedIn) {
       this.loggedIn = true;
       this.events.publish('user:login');

       }
       });
       */

    }

  }


  private setUserAuthInStorage(userData) {
    if (userData) {
      this.storage.set('user_auth', JSON.stringify(userData));
    }
    else {
      this.storage.set('user_auth', null);
    }
  }
}
