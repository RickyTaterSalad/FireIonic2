import { Component, ViewChild } from '@angular/core';

import { Events, ionicBootstrap, Nav, Platform } from 'ionic-angular';
import { Splashscreen, StatusBar } from 'ionic-native';

import { AccountPage } from './pages/account/account';
import { StationData } from './providers/station-data';
import { LoginPage } from './pages/login/login';
import { TabsPage } from './pages/tabs/tabs';
import { TutorialPage } from './pages/tutorial/tutorial';
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
      method: AuthMethods.Redirect

    })
  ]
})
class ConferenceApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  constructor(
    private events: Events,
    private userData: UserData,
    platform: Platform
  ) {
    // Call any initial plugins when ready
    platform.ready().then(() => {
      this.nav.setRoot(LoginPage);
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
    this.listenToLoginEvents();
  }
  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      console.log("user logged in");
      this.nav.setRoot(TutorialPage);
    });



    this.events.subscribe('user:logout', () => {
      console.log("user logged out");
      this.nav.setRoot(LoginPage);
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

ionicBootstrap(ConferenceApp,null,{tabbarPlacement: 'bottom'});
