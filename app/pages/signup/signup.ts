import { NavController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { StationData } from '../../providers/station-data';
import { TabsPage } from '../tabs/tabs';
import { TutorialPage } from '../tutorial/tutorial';
import { Component } from '@angular/core';
/*
 Generated class for the SignupPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component ({
  templateUrl: 'build/pages/signup/signup.html',
})
export class SignupPage {
  private userData:UserData;
  private signUpForm:Object;
  private stationData: any;


  constructor(private nav:NavController, private ud:UserData, private sd:StationData) {
    this.userData = ud;
    this.nav = nav;
    this.stationData =  sd;
    this.signUpForm = {
      station: null
    };
    console.dir(this);
  }

  signUp = function () {
    console.dir(this.signUpForm);
    if(this.signUpForm.station){
      console.log("setting form");
      this.userData.SignUserUp(this.signUpForm);
      console.log("popping sign up form");
      this.nav.pop();
    }
  }


}
