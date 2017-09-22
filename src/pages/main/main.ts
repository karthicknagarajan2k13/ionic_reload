import { Component } from '@angular/core';
import { App,NavController,IonicPage, NavParams } from 'ionic-angular';


@IonicPage()
/**
 * Generated class for the MainPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {




  constructor(public app: App,public navCtrl: NavController, public navParams: NavParams) {


 }

		register() {
			this.navCtrl.push('RegisterPage');
		}
		login() {
			this.app.getRootNav().setRoot( 'LoginPage' );
			//this.navCtrl.push('LoginPage');
		}
}
