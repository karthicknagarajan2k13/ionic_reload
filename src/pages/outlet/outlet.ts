import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NativeStorage } from '@ionic-native/native-storage';
import { AlertController } from 'ionic-angular';
import { Ionic2RatingModule } from 'ionic2-rating';
import { Network } from '@ionic-native/network';

import 'rxjs/add/operator/map';
/**
 * Generated class for the RecentlyviewedPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-outlet',
  templateUrl: 'outlet.html',
 
})
export class OutletPage {
image: any;
	rows: any;
	originalrate:any;
	userid:any;

  items:any;


rescall:any;
rowsLen:any=0;

parameter1: any;


	public mainList:Array<any>;
	
    rootNavCtrl: NavController;
    constructor(private network: Network,private storage: Storage,public navParams: NavParams,public alertCtrl: AlertController,public http: Http,public loadCtrl: LoadingController,public toastCtrl: ToastController,
		public nativeStorage: NativeStorage, public nav: NavController) {
		this.loaddata();
		
		   

		this.storage.get('userid').then((val) => {
			this.userid=val;
		let postParams = { 

	  userid:this.userid,
	 
			}
			let headers  = new Headers({ 'Content-Type': 'application/json' });
			this.http.post("http://aryvartdev.com/reload/api/ApiController/productList",postParams,headers)
			.map(res => res.json())
			.subscribe(data => {
			

			this.mainList = data.message;
			
			this.rows = Array.from(Array(Math.ceil(  this.mainList.length / 2)).keys());
			this.rowsLen=data.message.length;
			console.log("row--len--"+data.message);
				console.log("row--len--"+data.carcount);	
			this.storage.set('carcount', data.carcount);
			}, error => {
			console.log(error);// Error getting the data
			});
			this.rootNavCtrl = navParams.get('rootNavCtrl');
			

				
		});
			

		}


			  load(val){
			// alert(val);
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
			categorypage(itemid,items)
			{
		var networkState = this.network.type;
					if(networkState === "none"){
			   let toast = this.toastCtrl.create({
			   message: "No Internet Connection!!",
			   duration:3000
			   });
			   toast.onDidDismiss(() => {
					 });
			   toast.present();
		}
		else{
			this.rootNavCtrl.push('CategorypagePage', {
				param1: itemid, param2: items
		});}
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
			});
		}
		
			}				
			

		loaddata(){	
				let headers  = new Headers({ 'Content-Type': 'application/json' });
	
				this.http.get("http://aryvartdev.com/reload/api/ApiController/categorylist",headers)
				.map(res => res.json())
				.subscribe(data => {
				this.rescall=data.message.product_category;
				console.log("-this-"+JSON.stringify(this.rescall));
				this.rows = Array.from(Array(Math.ceil(this.rescall.length / 2)).keys());
						this.rowsLen=this.rows.length;
			console.log("row--len--"+this.rowsLen);		
				}, error => {
	
				console.log(error);// Error getting the data
				});
			
			}
			
}

  
  
  