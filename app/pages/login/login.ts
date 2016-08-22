import { Component } from '@angular/core';

import { NavController,Toast,ToastOptions } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { AuthProvider } from '../../providers/auth';

@Component({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
  login:{username?: string, password?: string} = {};
  submitted = false;


  constructor(private nav:NavController, private auth:AuthProvider) {
  }

  onLogin() {
    this.submitted = true;
    this.auth.loginWithGoogleUsingPluginPromise().then((res)=> {
      let toast = Toast.create({
        message: res.toString(),
        duration: 100000
      });
      toast.onDismiss(() => {
      });
      this.nav.present(toast);

    });
    /*
    this.userData.login().then((success)=> {
        this.nav.push(TabsPage);
      },
      (err)=> {
        let toast = Toast.create({
          message: err.toString(),
          duration: 100000
        });
        toast.onDismiss(() => {
          console.log('Dismissed toast');
        });
        this.nav.present(toast);
      });
      */
  }
}
