import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ClassOutputs } from '../classes/class_outputs';

@Component({
  selector: 'page-home',
  templateUrl: 'viewclassoutputdetail.html'
})
export class ViewClassOutputsDetail {

  public classOutput: ClassOutputs;

  constructor(private navCtrl: NavController, private navParams: NavParams) {
    this.classOutput = navParams.get('currentClassOutput');
  }

}
