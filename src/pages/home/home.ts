import { Component, NgZone } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';

import { FillClassDetails } from '../fillclassdetails/fillclassdetails';

import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AngularFireDatabase, AngularFireAuth]
})
export class HomePage {

  userCreds = {
    email: '',
    password: ''
   };

  songs: FirebaseListObservable<any>;
  aftry: any;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, private db: AngularFireDatabase, public afAuth: AngularFireAuth, public alertCtrl: AlertController,) {

  }

  login() {
    // this.afAuth.auth.signInWithEmailAndPassword(this.userCreds.email, this.userCreds.password).then( () => {
      this.afAuth.auth.signInWithEmailAndPassword('ninadpardhiye7@gmail.com', 'NinadPardhiye').then( () => {
      // this.songs = this.db.list('/songs');
      // console.log(this.songs);
      // this.navCtrl.pop(this);
      console.log('Logged in');
      this.navCtrl.setRoot(FillClassDetails);
    }).catch(function(error){
      let toast = this.toastCtrl.create({
        message: error.message,
        duration: 3000,
        position: 'bottom'
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      toast.present();
    });
  }

  // addSong(){
  //   let prompt = this.alertCtrl.create({
  //     title: 'Song Name',
  //     message: "Enter a name for this new song you're so keen on adding",
  //     inputs: [
  //       {
  //         name: 'title',
  //         placeholder: 'Title'
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: data => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Save',
  //         handler: data => {
  //           this.songs.push({
  //             title: data.title
  //           });
  //         }
  //       }
  //     ]
  //   });
  //   prompt.present();
  // }

}
