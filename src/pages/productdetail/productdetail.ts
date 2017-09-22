import { Component } from '@angular/core';
import { App,NavController, NavParams, IonicPage } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';
@IonicPage()
@Component({
  selector: 'page-productdetail',
  templateUrl: 'productdetail.html',
})
export class ProductdetailPage {

 greeting: string;
  sections:any;
  items:any;

   @ViewChild(Slides) slides: Slides;

/*  constructor(private nav: NavController) {

    this.items = [[0, 1, 2],[0, 1, 2, 3, 4],[0, 1, 2, 3, 4]]
	} */

rescall:any;
  rows: any;
  image: any
parameter1: any;
product_id:any;
userid:any;
product_image:any;
prod_name:any;
prod_desc:any;
prod_original_rate:any;
prod_offer:any;
prod_offer_rate:any;
prod_addToCart_id:any;
prod_relatedProducts:any;
namevalu:any;
carcount:any;


rate:any=2;
   prod: string = "overview";
  constructor(	private network: Network,private storage: Storage,public app: App, private navParams: NavParams,public alertCtrl: AlertController,public http: Http,public loadCtrl: LoadingController,public toastCtrl: ToastController,
		public nativeStorage: NativeStorage, public nav: NavController) {

 let loadingP = this.loadCtrl.create({
    content: 'Loading Please Wait...'
  });
  loadingP.present();


		  this.storage.get('carcount').then((val) => {
			this.carcount=val;
			console.log("this.carcount--"+this.carcount);
			
		});		
	this.storage.get('userid').then((val) => {
			//this.load(val);
			this.userid=val;
					this.image = navParams.get('param1'); 

      this.product_id = navParams.get('productId');
     // this.userid = "13"; 

    let headers  = new Headers({ 'Content-Type': 'application/json' });
    let postParams = { 

     product_id:this.product_id,
    userid:this.userid
   
      }


	  console.log(""+JSON.stringify(postParams));
     this.http.post("http://aryvartdev.com/reload/api/ApiController/productDetails",postParams,headers)
     .map(res => res.json())
      .subscribe(data => {

 setTimeout(() => {
    loadingP.dismiss();
  }, 1000);

      /* this.loadCtrl.create({
        content: 'Please wait...',
        duration: 1000,
        dismissOnPageChange: true
      }).present();*/


      console.log("res---"+JSON.stringify(data));
    this.rescall=data.message.product_image;
    this.prod_name=data.message.product_details.product_name;
    this.prod_addToCart_id=data.message.product_details.product_id;
    this.prod_desc=data.message.product_details.product_description;

    this.prod_original_rate=data.message.product_details.product_price;
    this.prod_offer=data.message.product_details.offer;

    this.prod_relatedProducts=data.message.related_product;

    this.prod_offer_rate=(this.prod_original_rate-(this.prod_original_rate * this.prod_offer)/100);
   console.log(postParams);
      }, error => {
      console.log(error);// Error getting the data
      });

	
		});

	

  }
      onModelChange(x){
 console.log(x)

 }   
 next() {
  this.slides.slideNext()
  }
  prev() {
  this.slides.slidePrev()
  }
	back()
			{
this.nav.pop();
		//	this.app.getRootNav().setRoot( 'HomePage' ); 
			}
      
 
  detailpage(item,product_id)
      {
          console.log("product_id--"+product_id);
       console.log("items--"+item);
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
        this.nav.push('ProductdetailPage', {
        param1: item, productId: product_id
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
      console.log("add---"+JSON.stringify( postParams));
       let headers  = new Headers({ 'Content-Type': 'application/json' });
       console.log(postParams);
      this.http.post("http://aryvartdev.com/reload/api/ApiController/addcart",postParams,headers)
.map(res => res.json())     
	 .subscribe(data => {
       this.loadCtrl.create({
        content: 'Please wait...',
        duration: 1000,
        dismissOnPageChange: true
      }).present();

	this.storage.set('carcount', data.carcount);
	  console.log("--"+data.carcount);

			if(data.status=="1")
			{
					this.carcount=parseInt(this.carcount)+1;
			}
			else{
			}
			
			
			
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

saveProduct(prod_addToCart_id,userid){
	
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
      console.log("---"+JSON.stringify( postParams));
       let headers  = new Headers({ 'Content-Type': 'application/json' });
       console.log(postParams);
      this.http.post("http://aryvartdev.com/reload/api/ApiController/save_product",postParams,headers)
      .map(res => res.json())
	  .subscribe(data => {
       this.loadCtrl.create({
        content: 'Please wait...',
        duration: 1000,
        dismissOnPageChange: true
      }).present();

		
					 this.toastCtrl.create({
				message:data.message,
				duration: 2000,
				position: 'bottom'
			  }).present();
 

      console.log(postParams);
      }, error => {
      console.log(error);// Error getting the data
      });

}
}
		loaddata(){	
				this.http.get("assets/data/data.json")
				.map(res => res.json())
				.subscribe(data => {
		 this.loadCtrl.create({
      content: 'Please wait...',
      duration: 1000,
      dismissOnPageChange: true
    }).present();


				this.rescall=data.results;
				console.log("-this-"+JSON.stringify(this.rescall));
				this.rows = Array.from(Array(Math.ceil(this.rescall.length / 2)).keys());
							
				}, error => {
	
				console.log(error);// Error getting the data
				});
			
			}
			
			   mycart()
  {
	  
	this.app.getRootNav().setRoot( 'MycartPage' );  

  }
}