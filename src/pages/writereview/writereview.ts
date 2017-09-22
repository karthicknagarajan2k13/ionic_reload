import { Component } from '@angular/core';
import { App,IonicPage,NavController, NavParams } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
/**
 * Generated class for the WritereviewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-writereview',
  templateUrl: 'writereview.html',
})
export class WritereviewPage {

  constructor(public toastCtrl: ToastController,public app: App, public navCtrl: NavController, public navParams: NavParams) {
  }

reviewUser(form: NgForm,userid){
	
if(form.value.headline===""){
	 let toast = this.toastCtrl.create({
         message: "Enter headline",
         duration:3000
         });
         toast.onDidDismiss(() => {
           });
         toast.present();
}
else if(form.value.review===""){
	 let toast = this.toastCtrl.create({
         message: "Enter review",
         duration:3000
         });
         toast.onDidDismiss(() => {
           });
         toast.present();
}
else{
	console.log(form.value.headline+"--"+form.value.review)
}
}
	back()
			{

			this.app.getRootNav().setRoot( 'MyorderdetailPage' ); 
			}
          onModelChange(x){
 console.log(x)

 }   
}
