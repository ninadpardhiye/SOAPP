import { Component, NgZone } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';

import { ClassVolunteer } from '../classes/class_volunteers';

import { DataProvider } from '../../services/data';

import { FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-volunteerfillingtemps',
  templateUrl: 'volunteerfillingtemps.html',
  providers: [DataProvider]
})
export class VolunteerFillingTemps {

  classForm: any;
  volunteers: FirebaseListObservable<any>;
  selectOptions = {
    title: 'Select the volunteer subject'
  };
  public subjects :Array<string>;
  existingClass: any;

  constructor(public navCtrl: NavController, private dataProvider: DataProvider) {
    this.resetClassVolunteers();
    this.volunteers = this.dataProvider.list('/volunteers');
    this.subjects = new Array<string>();
    this.subjects.push('Math');
    this.subjects.push('Science');
    this.subjects.push('English');
  }

  resetClassVolunteers(){
    this.classForm = {
      class_number: '',
      class_teachers: [{
        email: '',
        name: '',
        subject: '',
        isMentor: false
      }]
    };
  }

  addVolunteer(){
    console.log(this.classForm);
    let tempClass = this.classForm;
    this.findClass(tempClass.class_number).then(data => {
      this.existingClass = data;
      if(this.existingClass.class_number){
        this.existingClass.class_teachers.push({
          email: tempClass.class_teachers.email,
          name: tempClass.class_teachers.name,
          subject: tempClass.class_teachers.subject,
          isMentor: tempClass.class_teachers.isMentor
          });
        console.log(this.existingClass);
        // this.dataProvider.update('/volunteers', this.existingClass);
      }
    }).catch(() => {
      console.log('Add new entries');
      this.volunteers.push(tempClass);
    });
    this.resetClassVolunteers();
  }

  findClass(classNumber :string){
    let volunteerFound = false;
    return new Promise((resolve, reject) => {
      this.volunteers.forEach(volunteerData => {
        volunteerData.forEach(volunteer => {
          if(classNumber == volunteer.class_number){
            resolve(volunteer);
            volunteerFound = true;
          }
        });
        if(!volunteerFound){
          reject();
        }
      });
    });
  }

}
