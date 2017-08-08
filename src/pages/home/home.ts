import { Component, NgZone } from '@angular/core';
import { NavController, AlertController, LoadingController, Events } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';

import { FillClassDetails } from '../fillclassdetails/fillclassdetails';

import { AuthProvider } from '../../services/auth';
import { ToastService } from '../../services/toasts';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ AuthProvider, ToastService ]
})
export class HomePage {

  userCreds = {
    email: '',
    password: ''
   };

  aftry: any;


  constructor(public navCtrl: NavController, private toastService: ToastService, public alertCtrl: AlertController, public loadingCtrl: LoadingController, private authProvider: AuthProvider, private events: Events, private keyboard: Keyboard) {
    events.subscribe('user:wantsToLogIn', () => {
      setTimeout (() => {
        this.login();
      }, 0);
    });
  }

  startLogin(){
    console.log('starting to send event');
    this.events.publish('user:wantsToLogIn');
  }

  login() {
    this.keyboard.close();
    let loading = this.loadingCtrl.create({
        content: 'Please wait while we check if your existence is true...'
    });
    loading.present();
    console.log('inside login method');
    this.authProvider.loginWithEmail(this.userCreds.email, this.userCreds.password).then( () => {
      // this.authProvider.loginWithEmail('ninad@ninad.com', 'password').then( () => {
      // this.authProvider.loginWithEmail('ninadpardhiye7@gmail.com', 'NinadPardhiye').then( () => {
        console.log('have logged in');
        this.events.publish('user:loggedIn');
        this.navCtrl.setRoot(FillClassDetails);
        loading.dismiss();
        this.keyboard.close();
    }).catch((error) => {
      let toast = this.toastService.createNormalBottomToast(error.message);
      loading.dismiss();
      this.keyboard.close();
      toast.present();
    });
  }

}
