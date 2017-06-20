import { Component, NgZone } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';

import { ClassVolunteer } from '../classes/class_volunteers';

import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-formfillingtemps',
  templateUrl: 'formfillingtemps.html',
  providers: [AngularFireDatabase, AngularFireAuth]
})
export class FormFillingTemps {

  classForm: ClassVolunteer;
  volunteers: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, private db: AngularFireDatabase, public afAuth: AngularFireAuth, public alertCtrl: AlertController,) {
    // this.classForm = {
    //   class_number: '',
    //   class_teachers: [{
    //     email: '',
    //     name: '',
    //     subject: ''
    //   },{
    //     email: '',
    //     name: '',
    //     subject: ''
    //   },{
    //     email: '',
    //     name: '',
    //     subject: ''
    //   }]
    //   };
    this.volunteers = this.db.list('/volunteers');
  }

  addKids(){
    this.volunteers.push(this.classForm);
  }

}
