import { Injectable } from '@angular/core';
import { Platform} from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';

import { AngularFireAuth } from 'angularfire2/auth';

import { DataProvider } from './data';

@Injectable()
export class AuthProvider {
  constructor(private afAuth:AngularFireAuth, private dataProvider: DataProvider) {
  }

  loginWithEmail(email: string, password: string) {
    console.log('in service call');
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password).then((authData) => {
        resolve(authData);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  getCurrentUser(){
    return this.afAuth.auth.currentUser;
  }

  checkIfUserIsMentor(){
    return new Promise((resolve, reject) => {
      this.dataProvider.list('/volunteers').forEach(volunteerData => {
        volunteerData.forEach(volunteer => {
          volunteer.class_teachers.forEach(teacher => {
            if(teacher.email == this.afAuth.auth.currentUser.email){
              if(teacher.isMentor){
                resolve(true);
              }
            }
          });
        });
      });
    })
  }

  checkIfUserIsAdmin(){
    return new Promise((resolve, reject) => {
      if(this.getCurrentUser().email == 'ninadpardhiye7@gmail.com'){
        resolve(true);
      };
    });
  }

}
