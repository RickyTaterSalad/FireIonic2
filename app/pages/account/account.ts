import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {UserData} from '../../providers/user-data';


@Component({
  templateUrl: 'build/pages/account/account.html',
})


export class AccountPage {
  username:string;
  uid:string;

  constructor(private nav:NavController, private userData:UserData) {
    let dt = new Date();
    this.userData = userData;

    console.log("user data");
    console.dir(userData);

  }

  logout() {
    this.userData.logout();
  }


}


