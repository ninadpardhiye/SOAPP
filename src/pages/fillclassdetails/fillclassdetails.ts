import { Component, NgZone } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';

import { ClassKid } from '../classes/class_kids';
import { Volunteer } from '../classes/volunteer';

import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-fillclassdetails',
  templateUrl: 'fillclassdetails.html',
  providers: [AngularFireDatabase, AngularFireAuth]
})
export class FillClassDetails {

  kids: FirebaseListObservable<any>;
  volunteers: FirebaseListObservable<any>;
  currentVolunteer: Volunteer;
  currentVolunteerKids: ClassKid;

  classForm: {};

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, private db: AngularFireDatabase, public afAuth: AngularFireAuth, public alertCtrl: AlertController,) {
    this.classForm = {
      subject: ''
    }
    this.currentVolunteer = new Volunteer();
    this.currentVolunteerKids = new ClassKid();

     this.kids = this.db.list('/kids');
     this.volunteers = this.db.list('/volunteers');
     this.findLoggedInVolunteer();
     console.log(this.currentVolunteer);
     console.log(this.currentVolunteerKids);
    // this.findKids();
  }

  findKids(){
    console.log(this.kids);
    this.kids.forEach(data => {
      console.log(data);
      data.forEach(kid => {
        console.log('Class Number ' + kid.class_number);
        kid.kid_names.forEach(element => {
          console.log(element);
        });
      });
    });
  }

  findLoggedInVolunteer(){
    console.log(this.volunteers);
    this.volunteers.forEach(volunteerData => {
      volunteerData.forEach(volunteer => {
        // console.log('Looking at volunteer of class ' + volunteer.class_number);
        volunteer.class_teachers.forEach(teacher => {
          console.log('Auth user' + this.afAuth.auth.currentUser.email);
          console.log('Current User' + teacher.email);
          if(teacher.email == this.afAuth.auth.currentUser.email){
          console.log('Found teacher ' + teacher.name);
          this.currentVolunteer = teacher;
          this.kids.forEach(kidData => {
            kidData.forEach(kid => {
            console.log('Volunteer class' + volunteer.class_number);
            console.log('Kid class' + kid.class_number);
              if(kid.class_number == volunteer.class_number){
                console.log('Found kids ' + kid.class_number);
                this.currentVolunteerKids = kid;
              }
            });
          });
        }
        });
      });

    });
  }

}
