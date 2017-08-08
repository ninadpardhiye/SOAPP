import { Component, NgZone } from '@angular/core';
import { NavController, AlertController, ToastController, LoadingController } from 'ionic-angular';

import { ClassKid } from '../classes/class_kids';
import { Volunteer } from '../classes/volunteer';
import { PendingOutputs } from '../classes/pending_outputs';

import { FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { DataProvider } from '../../services/data';

@Component({
  selector: 'page-addpendingoutputmentor',
  templateUrl: 'addpendingoutputmentor.html',
  providers: [DataProvider]
})
export class AddPendingOutputMentor {

  volunteers: FirebaseListObservable<any>;
  pendingOutputs: FirebaseListObservable<any>;
  volunteersToShow: Array<Volunteer>;
  classForm: PendingOutputs;

  constructor(public navCtrl: NavController, public dataProvider: DataProvider, public loadingCtrl: LoadingController) {
    this.resetClassForm();
    let loading = this.loadingCtrl.create({
      content: 'Please wait while we get the awesome data...'
    });
    loading.present();
    this.pendingOutputs = this.dataProvider.list('/pendingoutputs');
    this.volunteersToShow = new Array<Volunteer>();
     this.volunteers = this.dataProvider.list('/volunteers');
     this.volunteers.forEach(volunteerData => {
       volunteerData.forEach(volunteer => {
         volunteer.class_teachers.forEach(teacher => {
           this.volunteersToShow.push(teacher);
         });
       });
     });
     loading.dismiss();
     console.log(this.volunteersToShow);
  }

  resetClassForm(){
    this.classForm = {
      $exists: () => true,
      $key: '',
      class_number: '',
      subject: '',
      date: new Date,
      teacher: new Volunteer(),
      subbed: false
    }
  }

  addPendingOutput(){
    console.log('Adding pending output');
    this.volunteers.forEach(volunteerData => {
       volunteerData.forEach(volunteer => {
         volunteer.class_teachers.forEach(teacher => {
           if(this.classForm.teacher == teacher.email){
             this.classForm.teacher = teacher;
           }
         });
       });
     });
     let class_number = this.classForm.class_number;
     let subject = this.classForm.subject;
     let date = this.classForm.date;
     let teacher = this.classForm.teacher;
     let subbed = this.classForm.subbed;
    this.pendingOutputs.push({
      class_number,
      date,
      subject,
      teacher,
      subbed
      });
      this.resetClassForm();
  }

}
