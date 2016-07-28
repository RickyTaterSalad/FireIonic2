import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { UserData } from '../../providers/user-data';

@Component({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
  login:{username?: string, password?: string} = {};
  submitted = false;

  constructor(private nav:NavController, private userData:UserData) {
  }

  onLogin() {
    this.submitted = true;
    this.userData.login();
    this.nav.push(TabsPage);
  }

}
