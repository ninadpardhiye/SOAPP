import { Component, NgZone } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';

import { ClassKid } from '../classes/class_kids';

import { DataProvider } from '../../services/data';

import { FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-kidfillingtemps',
  templateUrl: 'kidfillingtemps.html',
  providers: [DataProvider]
})
export class KidFillingTemps {

  classForm: any;
  kids: FirebaseListObservable<any>;
  existingClass: any;

  constructor(public navCtrl: NavController, private dataProvider: DataProvider) {
    this.resetClassKids();
    this.kids = this.dataProvider.list('/kids');
  }

  resetClassKids(){
    this.classForm = {
      class_number: '',
      kid_names: new Array<string>()
    };
  }

  addKids(){
    console.log(this.classForm);
    let tempClass = this.classForm;
    this.findClass(tempClass.class_number).then((data:any) => {
      this.existingClass = data;
      console.log(data);
      if(this.existingClass.class_number){
        this.existingClass.kid_names.push(
          tempClass.kid_names[0]
        );
        console.log(this.existingClass);
        this.dataProvider.update('/kids/' + data.$key, this.existingClass);
      }
    }).catch(() => {
      console.log('Add new entries');
      this.kids.push(tempClass);
    });
    this.resetClassKids();
  }

  findClass(classNumber :string){
    let kidsFound = false;
    return new Promise((resolve, reject) => {
      this.kids.forEach(kidData => {
        kidData.forEach(kidClass => {
          if(classNumber == kidClass.class_number){
            resolve(kidClass);
            kidsFound = true;
            console.log('Kids found');
          }
        });
        if(!kidsFound){
          reject();
          console.log('Kids not found');
        }
      });
    });
  }

}
