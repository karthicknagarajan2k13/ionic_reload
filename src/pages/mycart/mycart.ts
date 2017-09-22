import { Component } from '@angular/core';
import { App,NavController, NavParams ,IonicPage} from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';

/**
 * Generated class for the MycartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-mycart',
  templateUrl: 'mycart.html',
})
export class MycartPage {
userid:any;
	public mainList:Array<any>;
	public loadedmainList:Array<any>;
    rootNavCtrl: NavController;
mainListlength:any;
mainListlength2:any=0;
    prod_tot_quan:any;
   count:any = 1;
   carcount:any;
total_price:any;
 public cart : any= [];
 getCartCount:any;
  constructor(	private network: Network,private storage: Storage,public app: App,public navParams: NavParams,public alertCtrl: AlertController,public http: Http,public loadCtrl: LoadingController,public toastCtrl: ToastController,
		 public nav: NavController) {
  
 this.storage.get('carcount').then((val) => {
			this.carcount=val;
			console.log("this.carcount--"+this.carcount);
			
		});	
  
  
	this.storage.get('userid').then((val) => {
			this.userid=val;
			let headers  = new Headers({ 'Content-Type': 'application/json' });
			let postParams = { userid:this.userid}
			 console.log("-cart--"+JSON.stringify( postParams));	
			this.http.post("http://aryvartdev.com/reload/api/ApiController/cart_list",postParams,headers)
			.map(res => res.json())
			.subscribe(data => {
	/* 		this.loadCtrl.create({
			  content: 'Please wait...',
			  duration: 1000,
			  dismissOnPageChange: true
			}).present(); */

			this.mainList = data.message.cart;
			this.total_price = 0;
for (var i = 0; i < this.mainList.length; i++) {
var product = this.mainList[i];
this.total_price = this.getrate(product.product_price,product.offer,
product.quantity)+this.total_price;

		this.cart.push(product.cart_id);
		this.storage.set('cartid', this.cart);
  console.log('----cart=',this.cart);
}
		this.mainListlength = data.message.cart.length;
		this.mainListlength2=this.mainListlength
			console.log("---"+this.mainListlength);
			}, error => {
			console.log(error);// Error getting the data
			});
			this.rootNavCtrl = navParams.get('rootNavCtrl');

  
	
		});




	}
	
placeorder()
{
	
	this.app.getRootNav().setRoot( 'CheckoutPage' ); 
	
	
}
sub(tot_prod,prod_id,x,quantity){
console.log(tot_prod+"forr--"+prod_id+"--"+x+"--"+quantity);
var found = false;
for (var i = 0; i < this.mainList.length && !found; i++) {
var product = this.mainList[i];
var rowId=i;
if (x === rowId && product.quantity > 1  ) {
found = true;
product.quantity= parseInt(product.quantity)-1;
this.total_price = this.getTotal();
this.updateCart(product.cart_id,product.quantity)
}
else if(product.quantity === 1){
this.toastCtrl.create({
message: 'Remove Items',
duration: 2000,
position: 'bottom'
 }).present();
}

}

}


add(tot_prod,prod_id,x,quantity,price){
	
	
console.log(tot_prod+"forr--"+prod_id+"--"+x+"--"+quantity);
var found = false;

for (var i = 0; i < this.mainList.length && !found; i++) {
var product = this.mainList[i];
var rowId=i;
if (x === rowId && product.quantity < tot_prod) {
found = true;
product.quantity= parseInt(product.quantity)+1;
this.total_price = this.getTotal();
this.updateCart(product.cart_id,product.quantity)

}else if(product.quantity == tot_prod){
this.toastCtrl.create({
message: 'You have reached your limit',
duration: 2000,
position: 'bottom'}).present();
console.log(JSON.stringify(this.mainList));
}

}

console.log("Getting Price----->"+this.total_price)


this.storage.set('mainList',this.mainList);



}


public getTotal(){
var price = 0;
for (var i = 0; i < this.mainList.length; i++) {
var product = this.mainList[i];
price = this.getrate(product.product_price,product.offer,
product.quantity)+price;
}
return price;

}

public updateCart(cartId,prodQty)
{

let headers  = new Headers({ 'Content-Type': 'application/json' });
let postParams = {cart_id:cartId,cart_qty:prodQty}
this.http.post("http://aryvartdev.com/reload/api/ApiController/update_quantity",postParams,headers)

.subscribe(data => {
this.loadCtrl.create({
 content: 'Please wait...',
 duration: 1000,
 dismissOnPageChange: true
}).present();

console.log("ddd"+data['_body']);
}, error => {
console.log(error);// Error getting the data
});

}



			 getrate(rate,offer,quantity){
rate = rate*quantity;
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
			let postParams = {  userid:userid,cart_id:productid}
			this.http.post("http://aryvartdev.com/reload/api/ApiController/removecart",postParams,headers)
			
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


this.carcount=data.json().carcount;
					 	this.storage.set('carcount',this.carcount);
						
/* 				this.storage.set('carcount', data.carcount);
	  console.log("--"+data.carcount); */
	console.log("ddd"+data['_body']);
			}, error => {
			console.log(error);// Error getting the data
			});
		}
			}
}
