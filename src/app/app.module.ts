import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SuperTabsModule } from '../ionic2-super-tabs/src';
import { MyApp } from './app.component';
import { Facebook } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';
import { IonicStorageModule } from '@ionic/storage';

import { HomeModule } from "../pages/home/home.module";
import { Network } from '@ionic-native/network';
import { Ionic2RatingModule } from 'ionic2-rating';

import { HttpModule } from '@angular/http';
import { Camera } from '@ionic-native/camera';
import { LoginModule } from "../pages/login/login.module";
import { MainModule } from "../pages/main/main.module";
import { RegisterModule } from "../pages/register/register.module";
import { GooglePlus } from '@ionic-native/google-plus';

import { PopoverModule } from '../pages/home/popover.module';

@NgModule({
  declarations: [
    MyApp,

  ],
  
  imports: [
    BrowserModule,
  IonicModule.forRoot(MyApp,{tabsPlacement: 'top',tabsHideOnSubPages: true}),
  LoginModule,
	HomeModule,
PopoverModule,
RegisterModule,
MainModule,
HttpModule,
  Ionic2RatingModule,
 IonicStorageModule.forRoot(),
	SuperTabsModule.forRoot()
  ],

  
  
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

  ],
  providers: [
    StatusBar,
    SplashScreen,
	    Facebook,
		GooglePlus,
		Camera,
    NativeStorage,
       {provide: ErrorHandler, useClass: IonicErrorHandler},
	   Network
	  ]
})
export class AppModule {}
