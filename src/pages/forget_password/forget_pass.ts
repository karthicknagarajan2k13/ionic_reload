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
import { Network } from '@ionic-native/network';
@IonicPage()
@Component({
  templateUrl: 'forget_pass.html',
   
})
	export class ForgetPasswordPage implements OnInit {
  public user: User;

  ngOnInit() {
    this.user = {
      email: '',
      password: '',
    }
  }

		constructor(	private network: Network,public app: App,public alertCtrl: AlertController,public http: Http,public loadCtrl: LoadingController,public toastCtrl: ToastController, public fb: Facebook,
		public nativeStorage: NativeStorage, public nav: NavController,private googlePlus: GooglePlus) 
		{
		
		}
		forgetPassUser(form: User, isValid: boolean) {
			    console.log(form, isValid);
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

				'email':form.email
 
			} 


			 	let headers  = new Headers({ 'Content-Type': 'application/json' });
	
				this.http.post("http://aryvartdev.com/reload/api/ApiController/ForgotPassword", postParams,headers)
				.subscribe(data => {
				this.loadCtrl.create({
				content: 'Please wait...',
				duration: 1000,
				dismissOnPageChange: true
				}).present();
			if(data.json().status=="1")
			{let alert = this.alertCtrl.create({
					title: data.json().message,
				
					buttons: [
				       {
						text: 'OK',
						role: 'OK',
						handler: () => {
						console.log('OK clicked');
						this.app.getRootNav().setRoot( 'LoginPage' );
						}
						}
					]
				});
				alert.present();}
				else{
					let alert = this.alertCtrl.create({
			title: 'Failed',
			subTitle: 'Please try again!',
			buttons: [
				{
					text: 'OK',
				 role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
				}
			]
			});
			alert.present(); 
				}
				 
					console.log(data['_body']);
					console.log(data['_body'].status);
				}, error => {
				
				console.log(error);// Error getting the data
				});
			
		}
		}	
	
		back() {
			this.app.getRootNav().setRoot('LoginPage');
		}
		
	}
