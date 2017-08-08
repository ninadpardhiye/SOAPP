import { Component, NgZone } from '@angular/core';
import { NavController, AlertController, ToastController, LoadingController, Events } from 'ionic-angular';

import { ClassOutputs } from '../classes/class_outputs';

import { ViewClassOutputsDetail } from '../viewclassoutputdetail/viewclassoutputdetail'

import { DataProvider } from '../../services/data';

import { FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-home',
  templateUrl: 'viewclassoutputsoverview.html',
  providers: [ DataProvider ]
})
export class ViewClassOutputsOverview {

  classOutputs: FirebaseListObservable<any>;
  public foundClassOutputs: Array<ClassOutputs>;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, public alertCtrl: AlertController, public loadingCtrl: LoadingController, private dataProvider: DataProvider, private events: Events) {
    this.foundClassOutputs = new Array<ClassOutputs>();
    this.getAllNeededdata();
  }

  getAllNeededdata() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait while we check if your existence is true...'
    });
    loading.present();
    this.classOutputs = this.dataProvider.list('/classoutputs');
    this.classOutputs.forEach(classOutputData => {
      classOutputData.forEach(classOutput => {
        console.log(classOutput);
        this.foundClassOutputs.push(classOutput);
      });
      console.log(this.foundClassOutputs);
    });
    loading.dismiss();
  }

  showDetailOutput(classOutput: ClassOutputs){
    this.navCtrl.push(ViewClassOutputsDetail, {
      currentClassOutput: classOutput
  });
  }

}
