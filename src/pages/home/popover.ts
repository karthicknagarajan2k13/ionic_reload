import { Component } from '@angular/core';
import {App, ViewController,IonicPage } from 'ionic-angular';
import {NavController} from "ionic-angular/index";
import { Storage } from '@ionic/storage';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';
import { Network } from '@ionic-native/network';

@IonicPage()
/**
 * Generated class for the PopoverComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'popover',
  templateUrl: 'popover.html',
    providers: [GooglePlus]
})
export class PopoverPage {

	user: any;
	userReady: boolean = false;

userid:any;
username:any;
userimage:any;
 displayName: any;
  emails: any;
  familyName: any;
  givenName: any;
  userId: any;
  imageUrl: any;

  isLoggedIn:boolean = false;

  constructor(	private network: Network,public fb: Facebook,
  		public nativeStorage: NativeStorage,private googlePlus: GooglePlus,private storage: Storage,public app: App,public nav: NavController,public viewCtrl: ViewController) {
		this.storage.get('userid').then((val) => {
			this.userid=val
		});
		this.storage.get('user_name').then((val) => {
			this.username=val;
			
		});	
		this.storage.get('image').then((val) => {
			this.userimage=val;
			console.log("this.userimage(popover)---"+this.userimage)
					
		});
	
  }
  
  ionViewCanEnter(){
		let env = this;
		this.nativeStorage.getItem('user')
		.then(function (data){
			env.user = {
				name: data.name,
				gender: data.gender,
				picture: data.picture
			};
				env.userReady = true;
		}, function(error){
			console.log(error);
		});
	}

	close()
	{
    this.viewCtrl.dismiss();
  }
  saycontactpage() {
	this.nav.push('ContactPage');
  }
  
  sayaboutpage()
  {
	this.nav.push('AboutPage');
  }
  
   saypaypalpage()
  {
	this.nav.push('PayPalPage');
  }
  
  logout()
  {
	  	
		let env = this;
		this.fb.logout()
		.then(function(response) {
			//user logged out so we will remove him from the NativeStorage
			env.nativeStorage.remove('user');
		 console.log("response-----"+response);
		}, function(error){
			console.log(error);
		});
		
		
		
	
	   this.viewCtrl.dismiss();
	this.app.getRootNav().setRoot( 'LoginPage' );  
	this.storage.set('userid', '');
	this.storage.set('user_name', '');
				this.storage.set('image', '');
				this.storage.set('mobileno', '');
					this.storage.set('email', '');
			
				 	this.storage.set('carcount', '');
	// this.nav.setRoot('LoginPage');
	//this.nav.pop();
	//this.nav.push('MainPage');
	 this.googlePlus.logout()
      .then(res => {
        console.log("--"+res);
        this.displayName = "";
        this.emails = "";
        this.familyName = "";
        this.givenName = "";
        this.userId = "";
        this.imageUrl = "";

        this.isLoggedIn = false;
      })
      .catch(err => console.error(err));
  }
   saveproduct()
  {
	  			var networkState = this.network.type;
					if(networkState === "none"){
		alert("no internet connection");
		}
		else{
	   this.viewCtrl.dismiss();
	this.app.getRootNav().setRoot( 'SaveproductPage' );  
		}
  }
  orderhistory()
  { 
			var networkState = this.network.type;
					if(networkState === "none"){
		alert("no internet connection");
		}
		else{
  this.viewCtrl.dismiss();
	this.app.getRootNav().setRoot( 'MyorderPage' );  
		}
  }
  profile()
  {


  this.viewCtrl.dismiss();
	this.app.getRootNav().setRoot( 'ProfilePage' );  

  }
   mycart()
  {
	  
	  
	  			var networkState = this.network.type;
					if(networkState === "none"){
		alert("no internet connection");
		}
		else{
	   this.viewCtrl.dismiss();
	this.app.getRootNav().setRoot( 'MycartPage' );  
		}
  }
  notification()
  {
	  			var networkState = this.network.type;
					if(networkState === "none"){
				alert("no internet connection");
		}
		else{
	  
	     this.viewCtrl.dismiss();
	this.app.getRootNav().setRoot( 'NotificationPage' );  

  }}
  
}
