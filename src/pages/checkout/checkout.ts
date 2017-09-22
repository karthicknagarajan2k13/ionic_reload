import { Component,OnInit } from '@angular/core';
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
import { User } from './user.interface';
import { Network } from '@ionic-native/network';
import { NgForm } from '@angular/forms';

/**
 * Generated class for the MycartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage implements OnInit {
  public user: User;

  ngOnInit() {
    this.user = {

   email:'',
	fname:'',
    straddr: '',
    address: '',
    mobile: '',
    compname: '',
    country: '',
    city: '',
    zipcode: ''
    }
  }
	
	payment: PayPalPayment;
	
/* payment: PayPalPayment = new PayPalPayment(totalprice, 'USD', 'TV', 'sale'); */
	currencies = ['EUR', 'USD'];
	payPalEnvironment: string = 'payPalEnvironmentSandbox';
 public isDisabled:boolean=true;
	public mainList:Array<any>;
	public loadedmainList:Array<any>;
    rootNavCtrl: NavController;
    user_id:any;
    total_price:any;
    prod_tot_quan:any;
   count:any = 1;

 checkout: string = "shipping";

buttonColor1: string = '#2196f3';
buttonColor2: string = '#ffffff';
cityVal:any;
countryVal:any;
getBillList:any;
getBillProdDet:any;
getAddr:any;
cartid:any;
userid:any;
carcount:any;
email:any;
fname:any;
orderid:any;
 public cart : any= [];
 order_successID:any;

  constructor(	private network: Network,public app: App,public navParams: NavParams,public alertCtrl: AlertController,public http: Http,public loadCtrl: LoadingController,public toastCtrl: ToastController,
		public nativeStorage: NativeStorage, public nav: NavController,private storage:Storage) {
  console.log("---dddddjdjhdkdhdjd");
this.storage.get('user_name').then((val) => {
		this.fname=val;
			
			
		});	
		this.storage.get('email').then((val) => {
			this.email=val;
					
		});
		
		this.storage.get('orderid').then((val) => {
			this.orderid=val;
			console.log("this.orderid-------"+val);
					
		});

	this.storage.get('cartid').then((val) => {
		this.cart=val.join(',');
	
		  console.log('this.cart----=',this.cart);	
			
		});	
		this.storage.get('userid').then((val) => {
			this.userid=val;
			console.log('this.userid----=',this.userid);	
			
		});
		  
 this.storage.get('carcount').then((val) => {
			this.carcount=val;
			console.log("this.carcount--"+this.carcount);
			
		});	
  
	}

 onSegmentChanged(segmentButton) {
   console.log("Segment changed to", segmentButton.value);
   if(segmentButton.value==="shipping"){
   this.isDisabled=true;
   }
   }
	makePayment(totalprice,orderid,userid) {
		console.log(totalprice+"--totalprice--"+orderid);
		this.payment= new PayPalPayment(totalprice, 'USD', 'TV', 'sale');
		
		PayPal.init({
			PayPalEnvironmentProduction: Config.payPalEnvironmentProduction,
			PayPalEnvironmentSandbox: Config.payPalEnvironmentSandbox
		}).then(() => {
			PayPal.prepareToRender(this.payPalEnvironment, new PayPalConfiguration({})).then(() => {
				PayPal.renderSinglePaymentUI(this.payment).then((response) => {
					
				//	alert(`Successfully paid. Status = ${response.response.state}`);
					//console.log(response);
			let headers  = new Headers({ 'Content-Type': 'application/json' });
			
			let postParams = {
			userid:userid,
			order_id:orderid,
		}

			console.log("postParams--"+JSON.stringify(postParams));

			this.http.post("http://aryvartdev.com/reload/api/ApiController/success_pay",postParams,headers)

			.subscribe(data => {
			this.loadCtrl.create({
			  content: 'Please wait...',
			  duration: 1000,
			  dismissOnPageChange: true
			}).present();
			console.log(data['_body']);


			this.order_successID=data.json().order_success_id;
		
				this.storage.set('ordersuccessid',this.order_successID);

				this.app.getRootNav().setRoot('OrderCompletePage'); 
			}, error => {
			console.log(error);// Error getting the data
			});
					
					
					
					
				}, () => {
					console.error('Error or render dialog closed without being successful');
				});
			}, () => {
				console.error('Error in configuration');
			});
		}, () => {
			console.error('Error in initialization, maybe PayPal isn\'t supported or something else');
		});
	}
		newAddr(){
this.buttonColor1 = '#2196f3'; //desired Color
this.buttonColor2 = '#ffffff';
console.log("fdg")

}
			
		savedAddr(){
this.buttonColor2 = '#2196f3'; //desired Color
this.buttonColor1 = '#ffffff';
console.log("fdhhg")
}
	back()
			{

			this.app.getRootNav().setRoot( 'MycartPage' ); 
			}
registerUser(form: User,forms: NgForm,userid,cartid){
var desc;
console.log(forms.value.desc);
if(forms.value.desc === undefined){
	desc="";
	console.log("desc**if--"+desc);
}
else{
	desc=forms.value.desc;
	console.log("desc**else--"+desc);
}

	let headers  = new Headers({ 'Content-Type': 'application/json' });
			let postParams = {
			userid:userid,
			company_name:form.compname,
			phone:form.mobile,
			country:form.country,
			street_address:form.straddr,
			address:form.address,
			city:form.city,
			zipcode:form.zipcode,
			description:desc,
			all_cart_id:cartid}
alert(forms.value.desc)
			console.log("postParams--"+JSON.stringify(postParams));



			this.http.post("http://aryvartdev.com/reload/api/ApiController/make_order",postParams,headers)

			.subscribe(data => {
			this.loadCtrl.create({
			  content: 'Please wait...',
			  duration: 1000,
			  dismissOnPageChange: true
			}).present();
console.log(data['_body']);
			console.log("-orderid--"+data.json().orderid);
this.orderid=data.json().orderid;
			this.storage.set('orderid',data.json().orderid);
this.isDisabled=false;
this.checkout = "confirmation";

		this.getBillAddr(userid);
			}, error => {
			console.log(error);// Error getting the data
			});

			





}	
public getBillAddr(userid){

let headers  = new Headers({ 'Content-Type': 'application/json' });
			let postParams = {
			userid:userid}

			console.log("postParams--"+JSON.stringify(postParams));

			this.http.post("http://aryvartdev.com/reload/api/ApiController/get_billing_address",postParams,headers)

			.subscribe(data => {
			this.loadCtrl.create({
			  content: 'Please wait...',
			  duration: 1000,
			  dismissOnPageChange: true
			}).present();

			console.log(data['_body']);
			this.getBillList=data.json();



		console.log("getBillList--"+JSON.stringify(this.getBillList.message.billing_address));
		
			this.getAddr=this.getBillList.message.billing_address;

			this.getBillProdDet=this.getBillList.message.product_view
		console.log("getBillProdDet--"+JSON.stringify(this.getBillProdDet));
		
			this.total_price = 0;
			for (var i = 0; i < this.getBillProdDet.length; i++) {
				var product = this.getBillProdDet[i];
				



				this.total_price = this.getrate(product.product_price,product.offer)+this.total_price;
		this.storage.set('totalprice', this.total_price);

		}
			console.log("this.total_price--"+this.total_price);
			}, error => {
			console.log(error);// Error getting the data
			});


}
public getrate(rate,offer){

				var originalrate=(rate-(rate * offer)/100);
				if(originalrate>0){
						return originalrate ;
				}
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
