import { Component,OnInit } from '@angular/core';
import {App, IonicPage } from 'ionic-angular';
import {NavController} from "ionic-angular/index";
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';
import { NgForm } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { User } from './user.interface';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';
@IonicPage()
@Component({
  templateUrl: 'login.html',
   providers: [GooglePlus]
})
	export class LoginPage implements OnInit {
  public user: User;

  displayName: any;
  emails: any;
  familyName: any;
  givenName: any;
  userId: any;
  imageUrl: any;
users: any;
	userReady: boolean = false;
  isLoggedIn:boolean = false;
  
  
  ngOnInit() {
    this.user = {
   
      email: '',
      password: '',
    }
  }

  save(model: User, isValid: boolean) {
    // call API to save customer
    console.log(model, isValid);
		if(model.email==""){
			 console.log("enter");
			}
  }

		FB_APP_ID: number = 132013990732456;
		constructor(private network: Network,private storage: Storage,public app: App,public alertCtrl: AlertController,public http: Http,public loadCtrl: LoadingController,public toastCtrl: ToastController, public fb: Facebook,
		public nativeStorage: NativeStorage, public nav: NavController,private googlePlus: GooglePlus) 
		{
		this.fb.browserInit(this.FB_APP_ID, "v2.8");
		}

			loginUser(form: User, isValid: boolean) {
				
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
				
					
			let postParams = { 
					 password:form.password,
	  email:form.email,
	
	 
			}
			console.log(postParams);
			 let headers  = new Headers({ 'Content-Type': 'application/json' });
			 console.log(postParams);
			this.http.post("http://aryvartdev.com/reload/api/ApiController/login",postParams,headers)
			.subscribe(data => {
			 this.loadCtrl.create({
			  content: 'Please wait...',
			  duration: 1000,
			  dismissOnPageChange: true
			}).present();
console.log(data['_body']);
			if(data.json().status=="1")
			{
				
				console.log(data.json().image+"data======="+data.json().user_name);
				this.storage.set('userid', data.json().user_id);
				this.storage.set('user_name', data.json().user_name);
				this.storage.set('image', data.json().image);
				this.storage.set('mobileno', data.json().mobile);
					this.storage.set('email', data.json().email);
			
				 	this.storage.set('carcount', data.json().carcount);
	 this.app.getRootNav().setRoot('HomePage');
		/* 	let alert = this.alertCtrl.create({
			title: 'Login Success',
			message: 'Successss!',
			buttons: [
				{
					text: 'OK',
					role: 'OK',
					handler: () => {
					  console.log('OK clicked');
					 this.app.getRootNav().setRoot('HomePage');
					}
				}
			]
			});
			alert.present(); 
 */
			}
			else{
			let alert = this.alertCtrl.create({
			title: data.json().message,
			
			buttons: [
				{
					text: 'OK',
					role: 'cancel',
					cssClass: 'alertDanger',
					handler: () => {
					  console.log('cancelled');
					
					}
				}
			]
			});
			alert.present(); 
			}
			
			
	
			console.log(postParams);
			}, error => {
			console.log(error);// Error getting the data
			});
			
		}
		}
		
		
			goForgetPass(){
		this.app.getRootNav().setRoot('ForgetPasswordPage');
		}
		
		register() {
			this.nav.push('RegisterPage');
		}
		back() {
			this.app.getRootNav().setRoot('MainPage');
		}
	
		
		 doFbLogin(){
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
    let permissions = new Array<string>();

	let env = this;
	
	let http: Http;
    //the permissions your facebook app needs from the user
    permissions = ["public_profile","email"];


    this.fb.login(permissions)
    .then(function(response){
      let userId = response.authResponse.userID;
	  let accessToken =response.authResponse.accessToken;
	  console.log(response.authResponse.accessToken+""+response.authResponse.userID+"-sss--"+JSON.stringify( response));
      let params = new Array<string>();

      //Getting name and gender properties
			env.fb.api("/me?fields=name,gender,email,first_name,last_name,link,locale", params)
      .then(function(user) {
        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";

	//	console.log(userId+"--"+user+"jj--"+user.name+"--"+user.link+"-picture-"+user.picture);
		//alert("--"+user.first_name+"----last---"+user.last_name+"--"+user.link+"--"+user.email+"--"+user.picture+"--"+user.locale+"--"+userId);
		
		 env.nativeStorage.setItem('user',
        {
          name: user.name,
          gender: user.gender,
          picture: user.picture
        })
		
		console.log("-***-"+userId);
		let postParams = { id:userId,first_name:user.first_name,
			 last_name:user.last_name, email:user.email,
			 picture:user.picture,locale:user.locale,link:user.link,gender:user.gender}
			console.log("post----"+JSON.stringify(postParams));
			 let headers  = new Headers({ 'Content-Type': 'application/json' });
			 console.log(postParams);
			env.http.post("http://aryvartdev.com/reload/api/ApiController/fb_register_login",postParams,headers)
			.subscribe(data => {
			 env.loadCtrl.create({
			  content: 'Please wait...',
			  duration: 1000,
			  dismissOnPageChange: true
			}).present();
		env.storage.set('userid', data.json().user_id);
				env.storage.set('user_name', data.json().user_name);
				env.storage.set('image', data.json().image);
				env.storage.set('mobileno', data.json().mobile);
					env.storage.set('email', data.json().email);
			
				 	env.storage.set('carcount', data.json().carcount);
			env.app.getRootNav().setRoot('HomePage');
			console.log("---"+JSON.stringify(data['_body'])+"==="+JSON.stringify(data)+"--json--"+JSON.stringify(data.json()));
			console.log(postParams);
			}, error => {
			console.log(error);// Error getting the data
			});
		
		
		
		
		
     
      })
    }, function(error){
      console.log(error);
    });
	
		 }
  }
		
		

		
		
		
		
		
		
		
		
		
		
	
		
		glogin()
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
			this.googlePlus.login({})
			.then(res => {
				
				   this.displayName = res.displayName;
        this.emails = res.email;
        this.familyName = res.familyName;
        this.givenName = res.givenName;
        this.userId = res.userId;
        this.imageUrl = res.imageUrl;

        this.isLoggedIn = true;
				
				
			console.log("---"+JSON.stringify( res));
			let postParams = { id:res.email,given_name:res.givenName,
			 family_name:res.familyName, email:res.email,
			 picture:res.imageUrl,locale:"",link:""}
			console.log("post----"+postParams);
			 let headers  = new Headers({ 'Content-Type': 'application/json' });
			 console.log(postParams);
			this.http.post("http://aryvartdev.com/reload/api/ApiController/google_register_login",postParams,headers)
			.subscribe(data => {
			 this.loadCtrl.create({
			  content: 'Please wait...',
			  duration: 1000,
			  dismissOnPageChange: true
			}).present();
this.storage.set('userid', data.json().user_id);
				this.storage.set('user_name', data.json().user_name);
				this.storage.set('image', data.json().image);
				this.storage.set('mobileno', data.json().mobile);
					this.storage.set('email', data.json().email);
			
				 	this.storage.set('carcount', data.json().carcount);
			this.app.getRootNav().setRoot('HomePage');
			console.log(data['_body']);
			
			console.log(postParams);
			}, error => {
			console.log(error);// Error getting the data
			});
				
				
			})
			.catch(err => {
			console.error(err);
			alert("error "+JSON.stringify(err));
			});
		}
			
		}
	}
