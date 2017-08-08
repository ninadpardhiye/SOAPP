import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { FormFillingTemps } from '../pages/formfillingtemps/formfillingtemps';
import { FillClassDetails } from '../pages/fillclassdetails/fillclassdetails';
import { AddPendingOutputMentor } from '../pages/addpendingoutputmentor/addpendingoutputmentor';
import { VolunteerFillingTemps } from '../pages/volunteerfillingtemp/volunteerfillingtemps';
import { KidFillingTemps } from '../pages/kidfillingtemp/kidfillingtemps';
import { ViewClassOutputsOverview } from '../pages/viewclassoutputs/viewclassoutputsoverview';

import { AuthProvider } from '../services/auth';

@Component({
  templateUrl: 'app.html',
  providers: [AuthProvider]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = HomePage;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public events: Events, private authProvider: AuthProvider) {
    this.initializeApp();
    this.pages = [
      {title: 'Fill Class Details', component: FillClassDetails},
      {title: 'View Class Outputs', component: ViewClassOutputsOverview}
    ];
    events.subscribe('user:loggedIn', () => {
      this.updateMenuItems();
    });
  }

  updateMenuItems(){
    this.authProvider.checkIfUserIsAdmin().then( isAdmin => {
      if(isAdmin) {
        this.pages.push(
          {title: 'Add Pending Output', component: AddPendingOutputMentor}
        );
        this.pages.push(
          {title: 'Add Volunteer To Class', component: VolunteerFillingTemps}
        );
        this.pages.push(
          {title: 'Add Kid To Class', component: KidFillingTemps}
        );
        this.pages.push(
          {title: 'View Class Outputs', component: ViewClassOutputsOverview}
        );
      }
      else {
        this.authProvider.checkIfUserIsMentor().then(isMentor => {
          this.pages.push(
            {title: 'Add Pending Output', component: AddPendingOutputMentor}
          );
        });
      }
    })
  }

  initializeApp(){
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}
