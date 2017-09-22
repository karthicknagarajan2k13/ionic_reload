import {Component} from '@angular/core';
import {  Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { HomePage } from "../pages/home/home";
import { MainPage } from "../pages/main/main";


@Component({
  templateUrl: 'app.html',
  providers: []
})
export class MyApp {


rootPage:any;
userid:any;

  constructor(public storage: Storage,public platform: Platform, splashScreen: SplashScreen,public statusBar: StatusBar) {

  platform.ready().then(() => {
      splashScreen.hide();
	  
      statusBar.backgroundColorByHexString('#2196f3')
	  
    });
	this.storage.get('userid').then((val) => {
			this.userid=val
			
			console.log("val--"+val);
			if(this.userid != '' && this.userid!=undefined)
			{
				this.rootPage=HomePage;
			}
			else{
				this.rootPage= MainPage;
			}
			
		});
  
  }

 
 
}
