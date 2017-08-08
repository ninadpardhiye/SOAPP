import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Keyboard } from '@ionic-native/keyboard';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FormFillingTemps } from '../pages/formfillingtemps/formfillingtemps';
import { FillClassDetails } from '../pages/fillclassdetails/fillclassdetails';
import { AddPendingOutputMentor } from '../pages/addpendingoutputmentor/addpendingoutputmentor';
import { VolunteerFillingTemps } from '../pages/volunteerfillingtemp/volunteerfillingtemps';
import { KidFillingTemps } from '../pages/kidfillingtemp/kidfillingtemps';
import { ViewClassOutputsOverview } from '../pages/viewclassoutputs/viewclassoutputsoverview';
import { ViewClassOutputsDetail } from '../pages/viewclassoutputdetail/viewclassoutputdetail';

import { Elastic } from '../pages/classes/elastic';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthProvider } from '../services/auth';
import { DataProvider } from '../services/data';

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyDfReiSGQbyb7ifi5G1Lq-rLI5yV8L2-Bk",
    authDomain: "soapp-3d560.firebaseapp.com",
    databaseURL: "https://soapp-3d560.firebaseio.com",
    projectId: "soapp-3d560",
    storageBucket: "soapp-3d560.appspot.com",
    messagingSenderId: "69732512782"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FillClassDetails,
    FormFillingTemps,
    AddPendingOutputMentor,
    Elastic,
    VolunteerFillingTemps,
    KidFillingTemps,
    ViewClassOutputsOverview,
    ViewClassOutputsDetail
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FillClassDetails,
    FormFillingTemps,
    AddPendingOutputMentor,
    VolunteerFillingTemps,
    KidFillingTemps,
    ViewClassOutputsOverview,
    ViewClassOutputsDetail
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireAuth,
    AuthProvider,
    DataProvider,
    AngularFireDatabase,
    Keyboard,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ],
  exports: [
    Elastic
  ]
})
export class AppModule {}
