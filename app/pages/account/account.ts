import { Component } from '@angular/core';

import { Alert, NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { UserData } from '../../providers/user-data';


@Component({
  templateUrl: 'build/pages/account/account.html',
})
export class AccountPage {
  username: string;
  uid:string;
  constructor(private nav: NavController, private userData: UserData) {
      this.userData = userData;
    console.log("user data");
    console.dir(userData);
  }

  logout(){
    this.userData.logout();
  }


}
