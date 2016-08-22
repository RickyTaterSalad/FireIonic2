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
  }

  signUp = function () {
    if(this.signUpForm.station){
      this.userData.SignUserUp(this.signUpForm);
      this.nav.pop();
    }
  }


}
