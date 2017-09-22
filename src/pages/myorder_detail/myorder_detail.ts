import { Component } from '@angular/core';
import { Network } from '@ionic-native/network';
import { App,NavController, NavParams ,IonicPage} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';

import { NativeStorage } from '@ionic-native/native-storage';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
/**
 * Generated class for the MyorderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-myorder_detail',
  templateUrl: 'myorder_detail.html',
})
export class MyorderdetailPage {
orderdetails:any;
userid:any;
	 public mainList : any= [];

	mainListLen:any;
	mainListLen2:any=0;
	public loadedmainList:Array<any>;
    rootNavCtrl: NavController;
  constructor(	private network: Network,private storage: Storage,public app: App,public navParams: NavParams,public alertCtrl: AlertController,public http: Http,public loadCtrl: LoadingController,public toastCtrl: ToastController,
		public nativeStorage: NativeStorage, public nav: NavController) {
  
    

this.storage.get('orderdetails').then((val) => {
			
			this.orderdetails = val;
			console.log("this.orderdetails--"+this.orderdetails);
			
  console.log("this.mainList----"+JSON.stringify(this.orderdetails));
  	 this.mainList = this.orderdetails.product_details;
	

			this.mainListLen=this.orderdetails.product_details.length;
			this.mainListLen2=this.orderdetails.product_details.length;
			
		});

  
  this.storage.get('userid').then((val) => {
			
	this.userid=val;
});

		}
getrate(rate,offer)
			{
				
			var originalrate=(rate-(rate * offer)/100);
			if(originalrate>0){
			return originalrate ;
			}
		
			}
	back()
			{

		this.app.getRootNav().setRoot( 'MyorderPage' ); 
			}
			goOrderDetail(){
			alert("sdgg")
			}
			reviewpage(){
				this.app.getRootNav().setRoot( 'WritereviewPage' ); 
			}

}
