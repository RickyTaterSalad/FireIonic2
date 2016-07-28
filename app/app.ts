import { Component, ViewChild } from '@angular/core';
import { Events, ionicBootstrap, Nav, Platform } from 'ionic-angular';
import { Splashscreen, StatusBar } from 'ionic-native';
import { AccountPage } from './pages/account/account';
import { StationData } from './providers/station-data';
import { LoginPage } from './pages/login/login';
import { TabsPage } from './pages/tabs/tabs';
import { TutorialPage } from './pages/tutorial/tutorial';
import { SignupPage } from './pages/signup/signup';

import { UserData } from './providers/user-data';

import {
  FIREBASE_PROVIDERS, defaultFirebase,
  AngularFire, firebaseAuthConfig, AuthProviders,
  AuthMethods
} from 'angularfire2';


@Component({
  templateUrl: 'build/app.html',
  providers: [
    UserData,
    StationData,
    FIREBASE_PROVIDERS,
    // Initialize Firebase app
    defaultFirebase({
      apiKey: "AIzaSyBTKskWE1LI-XIpWutxkL3zr2cGw8QK7LE",
      authDomain: "skeet-ff80e.firebaseapp.com",
      databaseURL: "https://skeet-ff80e.firebaseio.com",
      storageBucket: "skeet-ff80e.appspot.com",
    }),
    firebaseAuthConfig({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup

    })
  ]
})
class ConferenceApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav:Nav;
  rootPage:any;

  constructor(private events:Events,
              private stationDat:StationData,
              private userData:UserData,
              platform:Platform) {
    // Call any initial plugins when ready
    this.rootPage = LoginPage;
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
    this.listenToLoginEvents();
  }

  private setLoggedInAndRegisteredView() {
    //sets the entire view stack
    console.log("push tabs");
    this.nav.push(TabsPage).then(()=> {
      console.log("checking if user has seen tutorial")
      this.userData.HasUserSeenTutorialAsync().then((hasSeen)=> {
        if (!hasSeen) {
          console.log("push tutorial");
          this.nav.push(TutorialPage)
        }
        if (!this.userData.HasUserRegistered) {
          console.log("push signup");
          this.nav.push(SignupPage)
        }
      });
    });
  }

  listenToLoginEvents() {
    //fired when the user logs in
    this.events.subscribe('user:login', () => {
      this.setLoggedInAndRegisteredView();
    });
    this.events.subscribe('user:logout', () => {
      this.nav.popToRoot();
    });
  }
}


// Pass the main App component as the first argument
// Pass any providers for your app in the second argument
// Set any config for your app as the third argument, see the docs for
// more ways to configure your app:
// http://ionicframework.com/docs/v2/api/config/Config/
// Place the tabs on the bottom for all platforms
// See the theming docs for the default values:
// http://ionicframework.com/docs/v2/theming/platform-specific-styles/

ionicBootstrap(ConferenceApp, null, {tabbarPlacement: 'bottom'});
