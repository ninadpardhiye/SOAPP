import { Component, NgZone } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';

import { ClassKid } from '../classes/class_kids';
import { Volunteer } from '../classes/volunteer';
import { PendingOutputs } from '../classes/pending_outputs';

import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-addpendingoutputmentor',
  templateUrl: 'addpendingoutputmentor.html',
  providers: [AngularFireDatabase, AngularFireAuth]
})
export class AddPendingOutputMentor {

  volunteers: FirebaseListObservable<any>;
  pendingOutputs: FirebaseListObservable<any>;
  volunteersToShow: Array<Volunteer>;
  classForm: PendingOutputs;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, private db: AngularFireDatabase, public afAuth: AngularFireAuth, public alertCtrl: AlertController,) {
    this.classForm = {
      class_number: '',
      subject: '',
      date: new Date,
      teacher: new Volunteer
    }
    this.pendingOutputs = this.db.list('/pendingoutputs');
    this.volunteersToShow = new Array<Volunteer>()
     this.volunteers = this.db.list('/volunteers');
     this.volunteers.forEach(volunteerData => {
       volunteerData.forEach(volunteer => {
         volunteer.class_teachers.forEach(teacher => {
           this.volunteersToShow.push(teacher);
         });
       });
     });
     console.log(this.volunteersToShow);
  }

  addPendingOutput(){
    console.log('Adding pending output');
    this.pendingOutputs.push(this.classForm);
  }  

}
