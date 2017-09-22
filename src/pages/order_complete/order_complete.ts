import { Component } from '@angular/core';
import { App,NavController, NavParams ,IonicPage} from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from 'ionic-native';
import { Config } from '../../config';
import { ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NativeStorage } from '@ionic-native/native-storage';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Network } from '@ionic-native/network';
import { NgForm } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-order_complete',
  templateUrl: 'order_complete.html',
})

export class OrderCompletePage {
	
orderSuccessID:any;

  constructor(	private network: Network,public app: App,public navParams: NavParams,public alertCtrl: AlertController,public http: Http,public loadCtrl: LoadingController,public toastCtrl: ToastController,
		public nativeStorage: NativeStorage, public nav: NavController,private storage:Storage) {
  			this.storage.get('ordersuccessid').then((val) => {
			this.orderSuccessID=val;
			console.log("orderSuccessID--"+this.orderSuccessID)
			
		});
  
	}
	trackOrder(){
		this.app.getRootNav().setRoot('MyorderPage'); 
	}
	ctnShop(){
	this.app.getRootNav().setRoot('HomePage'); 
	}

}
