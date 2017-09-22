import { Component } from '@angular/core';
import {App, NavController, NavParams ,IonicPage} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Network } from '@ionic-native/network';

import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
/**
 * Generated class for the CategorypagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-categorypage',
  templateUrl: 'categorypage.html',
})
export class CategorypagePage {

  categoryid: any
categorys: any;

	rows: any;

	

  items:any;



	public mainList:Array<any>;
	public categoryss:Array<any>;
    rootNavCtrl: NavController;
  constructor(	private network: Network, public app: App,private navParams: NavParams,public alertCtrl: AlertController,public http: Http,public loadCtrl: LoadingController,public toastCtrl: ToastController,
		public nativeStorage: NativeStorage, public nav: NavController) {
				this.rootNavCtrl = navParams.get('rootNavCtrl');
		
			this.categoryid = navParams.get('param1'); 
			
		if(navParams.get('param2') !=null){
			this.categorys = navParams.get('param2'); 
			this.categoryss=this.categorys.subcategory;
			console.log("categoryid--"+JSON.stringify( this.categorys));
		}
			
			let headers  = new Headers({ 'Content-Type': 'application/json' });
		let postParams = { 

	  category_id:this.categoryid,
	 
			}
			this.http.post("http://aryvartdev.com/reload/api/ApiController/category_product",postParams,headers)
			 .map(res => res.json())
     .subscribe(data => {
      this.loadCtrl.create({
       content: 'Please wait...',
       duration: 1000,
       dismissOnPageChange: true
     }).present();

     console.log(data['_body']);
this.mainList = data.message;
	
			console.log("-this-"+JSON.stringify(  this.mainList));
			this.rows = Array.from(Array(Math.ceil(  this.mainList.length / 2)).keys());
			
     console.log(postParams);
     }, error => {
     console.log(error);// Error getting the data
     });	
			
  }
  
  detailpage(item,product_id)
			{

			this.nav.push('ProductdetailPage', {
				param1: item, productId: product_id
			});
			}
  getrate(rate,offer)
			{
				
			var originalrate=(rate-(rate * offer)/100);
			if(originalrate>0){
			return originalrate ;
			}
		
			}	
			getoffer(offer)
				{
					if(offer!=undefined && offer !='')
					{return offer+"%";
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
	back()
			{

		this.app.getRootNav().setRoot( 'HomePage' ); 
			}
categorypage(categoryid)
{
	this.app.getRootNav().setRoot('CategorypagePage', {
				param1: categoryid, param2: null
			});
}
}
