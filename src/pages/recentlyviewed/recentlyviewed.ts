import { Component } from '@angular/core';

import { Storage } from '@ionic/storage';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { NativeStorage } from '@ionic-native/native-storage';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
/**
 * Generated class for the OutletPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-recentlyviewed',
  templateUrl: 'recentlyviewed.html',
})
export class RecentlyviewedPage {
image: any;
	rows: any;
	originalrate:any;
	

  items:any;
rowsLen:any=0;
rescall:any;

parameter1: any;
mainListlength:any;
userid:any;
	public mainList:Array<any>;
	public loadedmainList:Array<any>;
    rootNavCtrl: NavController;
    constructor(private network: Network,private storage: Storage,public navParams: NavParams,public alertCtrl: AlertController,public http: Http,public loadCtrl: LoadingController,public toastCtrl: ToastController,
		public nativeStorage: NativeStorage, public nav: NavController) {
					
					
					this.storage.get('userid').then((val) => {
						this.userid=val;
				let headers  = new Headers({ 'Content-Type': 'application/json' });
		let postParams = { 

	  userid:this.userid,
	 
			}
	
		
			this.http.post("http://aryvartdev.com/reload/api/ApiController/recently_viewed",postParams,headers)
			.map(res => res.json())
			.subscribe(data => {
			/* this.loadCtrl.create({
			  content: 'Please wait...',
			  duration: 1000,
			  dismissOnPageChange: true
			}).present(); */

			this.mainList = data.message;
		this.mainListlength = data.message.length;
			this.rows = Array.from(Array(Math.ceil(  this.mainList.length / 2)).keys());
			this.rowsLen=data.message.length;
		
			
			}, error => {
			console.log(error);// Error getting the data
			});
			this.rootNavCtrl = navParams.get('rootNavCtrl');
			
	
		});
			
		}
			getrate(rate,offer)
			{
				
			var originalrate=(rate-(rate * offer)/100);
			if(originalrate>0){
			return originalrate ;
			}
		
			}	
		getdisplytext(product_quantity,almost_gone)
			{
				
					
				if(product_quantity == 0)
				{
			
			return "Stock Over";
				}
				
				
				else if(almost_gone > product_quantity)
				{
			
			return "Almost Gone!";
				}
				
		
			}
			getoffer(offer)
				{
					if(offer!=undefined && offer !='')
					{return offer+"% OFF";
					}
					
				}
		
			detailpage(item,product_id)
			{
			var networkState = this.network.type;
					if(networkState === "none"){
			   let toast = this.toastCtrl.create({
			   message: "No Internet Connection!!",
			   duration:1000
			   });
			   toast.onDidDismiss(() => {
					 });
			   toast.present();
		}
		else{
			this.rootNavCtrl.push('ProductdetailPage', {
				param1: item, productId: product_id
		});}
			}


}
