import { Component } from '@angular/core';
import { App,NavController, NavParams ,IonicPage} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { NativeStorage } from '@ionic-native/native-storage';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
/**
 * Generated class for the SaveproductPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
status:any;
carcount:any;
userid:any;
mainListlength:any;
mainListlength2:any=0;
count:any;
	public mainList:Array<any>;
	public loadedmainList:Array<any>;
    rootNavCtrl: NavController;
  constructor(	private network: Network,private storage: Storage,public app: App,public navParams: NavParams,public alertCtrl: AlertController,public http: Http,public loadCtrl: LoadingController,public toastCtrl: ToastController,
		public nativeStorage: NativeStorage, public nav: NavController) {
  		
		 this.storage.get('carcount').then((val) => {
			this.carcount=val;
			console.log("this.carcount--"+this.carcount);
			
		});	
		this.storage.get('userid').then((val) => {
			this.userid=val;
		let headers  = new Headers({ 'Content-Type': 'application/json' });
			let postParams = { 

	  userid:this.userid,
	 
			}
			 console.log("-save--"+JSON.stringify( postParams));	
			this.http.post("http://aryvartdev.com/reload/api/ApiController/saved_products",postParams,headers)
			.map(res => res.json())
			.subscribe(data => {/* 
			this.loadCtrl.create({
			  content: 'Please wait...',
			  duration: 1000,
			  dismissOnPageChange: true
			}).present();
 */
			this.mainListlength = data.message.length;

			this.mainListlength2=this.mainListlength;
			console.log("---ddd"+JSON.stringify(data.message.list_product));
			this.mainList = data.message.list_product;
			}, error => {
			console.log(error);// Error getting the data
			});
			this.rootNavCtrl = navParams.get('rootNavCtrl');
			

		});

  
  
  }
  
  addToCart(prod_addToCart_id,userid){
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
   let postParams = { 

 product_id:prod_addToCart_id,
    userid:userid
      }
      console.log(postParams);
       let headers  = new Headers({ 'Content-Type': 'application/json' });
       console.log(postParams);
      this.http.post("http://aryvartdev.com/reload/api/ApiController/addcart",postParams,headers)
.map(res => res.json())     
	 .subscribe(data => {
  /*      this.loadCtrl.create({
        content: 'Please wait...',
        duration: 1000,
        dismissOnPageChange: true
      }).present(); */

		
					 this.toastCtrl.create({
				message:data.message,
				duration: 2000,
				position: 'bottom'
			  }).present();
      console.log(data['_body']);
  console.log(data);
      console.log(postParams);
      }, error => {
      console.log(error);// Error getting the data
      });

		}
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

		this.app.getRootNav().setRoot( 'HomePage' ); 
			}
			
			deleteproduct(no,productid,userid)
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
  	let headers  = new Headers({ 'Content-Type': 'application/json' });
			let postParams = { 

	  userid:userid,
	 save_product_id:productid
			}
			console.log("postParams-----"+JSON.stringify(postParams));
			this.http.post("http://aryvartdev.com/reload/api/ApiController/remove_saved_product",postParams,headers)
			
			.subscribe(data => {
			this.loadCtrl.create({
			  content: 'Please wait...',
			  duration: 1000,
			  dismissOnPageChange: true
			}).present();
  (this.mainList).splice(no, 1);

  	
		
					 this.toastCtrl.create({
				message:data.json().message,
				duration: 2000,
				position: 'bottom'
			  }).present();

			
		console.log(data.json());
		this.count=data.json().count;
			}, error => {
			console.log(error);// Error getting the data
			});
			
			
		}
		//this.app.getRootNav().setRoot( 'HomePage' ); 
			}
			
			
			
			
			
					   mycart()
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
	this.app.getRootNav().setRoot( 'MycartPage' );  
		}
  }
}
