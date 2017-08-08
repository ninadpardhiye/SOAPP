import { Injectable } from '@angular/core';
import { ToastController, Toast } from 'ionic-angular';

@Injectable()
export class ToastService{

  constructor(private toastCtrl: ToastController) {

  }

  createNormalBottomToast(message: string){
    return this.createToast(message, 3000, 'bottom');
  }

  createToast(message: string, duration: number, position: string): Toast{
    return this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position
    });
  }

  showToast(toast: Toast){
    toast.present();
  }

  dismistToast(toast: Toast){
    toast.dismiss();
  }

}
