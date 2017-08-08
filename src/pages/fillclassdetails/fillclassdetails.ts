import { Component, NgZone } from '@angular/core';
import { NavController, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { ClassKid } from '../classes/class_kids';
import { Volunteer } from '../classes/volunteer';
import { PendingOutputs } from '../classes/pending_outputs';
import { ClassOutputs } from '../classes/class_outputs';
import { SingleClassOutput } from '../classes/single_class_output';
import { Elastic } from '../classes/elastic';

import { DataProvider } from '../../services/data';
import { AuthProvider } from '../../services/auth';

import { FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-fillclassdetails',
  templateUrl: 'fillclassdetails.html',
  providers: [DataProvider, AuthProvider]
})
export class FillClassDetails {

  kids: FirebaseListObservable<any>;
  volunteers: FirebaseListObservable<any>;
  pendingoutputs: FirebaseListObservable<any>;
  classOutputs: FirebaseListObservable<any>;
  currentVolunteer: Volunteer;
  currentVolunteerKids: ClassKid;
  pendingOutput: any;
  isPendingOutput: boolean;

  classForm: {
    class_output: string,
    kids_output: {
      kid_name: string,
      kid_output: string
    }[]
  };

  constructor(public loadingCtrl: LoadingController, private dataProvider: DataProvider, public authProvider: AuthProvider) {
    this.classForm = {
        class_output: '',
        kids_output: [{
          kid_name: '',
          kid_output: ''
        },
        {
          kid_name: '',
          kid_output: ''
        },
        {
          kid_name: '',
          kid_output: ''
        },
        {
          kid_name: '',
          kid_output: ''
        },
        {
          kid_name: '',
          kid_output: ''
        },
        {
          kid_name: '',
          kid_output: ''
        }]
      };

     this.isPendingOutput = false;
     this.currentVolunteer = new Volunteer();
     this.currentVolunteerKids = new ClassKid();

     this.kids = this.dataProvider.list('/kids');
     this.volunteers = this.dataProvider.list('/volunteers');
     this.pendingoutputs = this.dataProvider.list('/pendingoutputs');
     this.classOutputs = this.dataProvider.list('/classoutputs');
     let loading = this.loadingCtrl.create({
        content: 'Please wait while we get your data...'
      });
      loading.present();
     this.findLoggedInVolunteer().then((teacher: any)  => {
       this.currentVolunteer = teacher;
       this.findPendingOutputs().then((foundPendingOutput: any) => {
         this.pendingOutput = foundPendingOutput;
         if(this.pendingOutput.class_number != ''){
           this.isPendingOutput = true;
           this.findKids().then((foundkids: any) => {
            this.currentVolunteerKids = foundkids;
            loading.dismiss();
           }).catch(() => {
             loading.dismiss();
           });
         }
       }).catch(() => {
         loading.dismiss();
       });
     }).catch(() => {
       loading.dismiss();
     });
  }

  findPendingOutputs(){
    console.log('Finding pending outputs');
    let pendingOutputFound = false;
    return new Promise((resolve, reject) => {
      this.pendingoutputs.forEach(pendingOutputData => {
        pendingOutputData.forEach(pendingOutput => {
          if(pendingOutput.teacher.email == this.currentVolunteer.email){
            pendingOutputFound = true;
            resolve(pendingOutput);
          }
        });
        if(!pendingOutputFound){
          reject();
        }
      });
    });
  }

  findKids(){
    console.log('Finding kids');
    let kidFound = false;
    return new Promise((resolve, reject) => {
      this.kids.forEach(kidData => {
        kidData.forEach(kid => {
          if(kid.class_number == this.pendingOutput.class_number){
            kidFound = true;
            resolve(kid);
          }
        });
        if(!kidFound){
          reject();
        }
      });
    });
  }

  findLoggedInVolunteer(){
    console.log('Finding a volunteer');
    let volunteerFound = false;
    return new Promise((resolve, reject) => {
      this.volunteers.forEach(volunteerData => {
        volunteerData.forEach(volunteer => {
          console.log(this.authProvider.getCurrentUser().email);
          volunteer.class_teachers.forEach(teacher => {
            console.log(teacher.email);
            if(teacher.email == this.authProvider.getCurrentUser().email){
              resolve(teacher);
              volunteerFound = true;
              console.log('volunteer found');
            }
          });
        });
        if(!volunteerFound){
          reject();
          console.log('volunteeer not found');
        }
      });
    });
  }

  customTrackBy(index: number, obj: any): any {
    return index;
  }

  addClassOutput(){
    let currentClassOutput = new ClassOutputs();
    currentClassOutput.class_number = this.pendingOutput.class_number;
    currentClassOutput.subbed = this.pendingOutput.subbed;
    let singleOutput = new SingleClassOutput();
    singleOutput.class_output = this.classForm.class_output;
    singleOutput.date = this.pendingOutput.date;
    singleOutput.teacher = this.pendingOutput.teacher;
    let index = 0;
    this.classForm.kids_output.forEach(kidReview => {
      console.log(kidReview);
      console.log(this.currentVolunteerKids.kid_names[index]);
      if(kidReview.kid_output != ''){
        singleOutput.kids.push({
          kid_name: this.currentVolunteerKids.kid_names[index],
          kid_review: kidReview.kid_output
        });
        index++;
      }
    });
    singleOutput.subject = this.pendingOutput.subject;
    // if(this.pendingOutput.subject == 'English'){
    //   currentClassOutput.english_outputs.push(singleOutput);
    // }
    // else if(this.pendingOutput.subject == 'Math'){
    //   currentClassOutput.math_outputs.push(singleOutput);
    // }
    // else if(this.pendingOutput.subject == 'Science'){
    //   currentClassOutput.science_outputs.push(singleOutput);
    // }
    currentClassOutput.output = singleOutput;
    this.classOutputs.push(currentClassOutput);
    this.dataProvider.remove('/pendingoutputs/' + this.pendingOutput.$key);
    this.isPendingOutput = false;
  }

}
