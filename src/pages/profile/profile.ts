import { Component,OnInit} from '@angular/core';
import {App, NavController, NavParams, IonicPage ,ActionSheetController} from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { NgForm } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';

import { FormControl, FormGroup, Validators,ValidatorFn,AbstractControl } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage implements OnInit {
  base64Image:any;
rescall:any;

public isDisabled:boolean=true;

  
  user: FormGroup;
  viewprofile: string = "editprofile";

userid:any;
mobile: number = 0;
username:any;
userimage:any;
mobileno:any;
  constructor(	private network: Network,private storage: Storage,public app: App, private navParams: NavParams,public alertCtrl: AlertController,public http: Http,public loadCtrl: LoadingController,public toastCtrl: ToastController,
		public nativeStorage: NativeStorage, public nav: NavController,public actionSheetCtrl: ActionSheetController,public camera:Camera) {


		
this.storage.get('userid').then((val) => {
			this.userid=val;
		});
		this.storage.get('user_name').then((val) => {
		this.username=val;
			
			
		});	
		this.storage.get('image').then((val) => {
			 var profileimage="http://aryvartdev.com/reload/uploads/profile/"+val;

this.userimage=profileimage;
console.log("--userimage*-"+this.userimage);
console.log("--val*-"+val);

    		
		});
		this.storage.get('mobileno').then((val) => {
			this.mobile=val;
					
		});
  }

registerUser(form: NgForm,userid){

let headers  = new Headers({ 'Content-Type': 'application/json' });
 let postParams = {userid:userid,user_name:form.value.username,user_mobile:form.value.mobile}
console.log("--"+JSON.stringify(postParams))
       this.http.post("http://aryvartdev.com/reload/api/ApiController/update_profile",postParams,headers)
      
       .subscribe(data => {
       this.rescall=data.json();
       console.log("-this-"+JSON.stringify(this.rescall.user_id));
        		this.storage.set('user_name', data.json().user_name);
				
				this.storage.set('mobileno', data.json().mobile);
         let toast = this.toastCtrl.create({
         message: "Profile Updated Successfully",
         duration:3000
         });
         toast.onDidDismiss(() => {
           });
         toast.present();
         this.app.getRootNav().setRoot( 'HomePage' ); 
       }, error => {
 
       console.log(error);// Error getting the data
       });

}
onSubmit(users: FormGroup)
{
	alert(users.value.cpassword+"--pas--"+users.value.password+"--cp--"+users.value.re_password);
}
 onSegmentChanged(segmentButton) {
  
   }

edit(){
this.isDisabled=false;
}
	back()
			{

			this.app.getRootNav().setRoot( 'HomePage' ); 
			}
  public presentActionSheet(userid) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
               this.camera.getPicture({
     sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
     destinationType: this.camera.DestinationType.DATA_URL
    }).then((imageData) => {
    alert(imageData)
	
      this.base64Image = 'data:image/jpeg;base64,'+imageData;
      this.userimage=this.base64Image;
	  
	  let headers  = new Headers({ 'Content-Type': 'application/json' });
 let postParams = {userid:userid,image:this.base64Image}
console.log("--"+this.base64Image)
       this.http.post("http://aryvartdev.com/reload/api/ApiController/update_profile_image",postParams,headers)
      
       .subscribe(data => {
       this.rescall=data.json();
       console.log("this.rescall(Gal)---"+JSON.stringify(this.rescall));
      var userprofileurl="http://aryvartdev.com/reload/uploads/profile/"+data.json().image;
console.log("userprofileurl---"+userprofileurl);
 this.storage.set('image', data.json().image);
  let toast = this.toastCtrl.create({
         message: "Profile Updated Successfully",
         duration:3000
         });
         toast.onDidDismiss(() => {
           });
         toast.present();
this.app.getRootNav().setRoot( 'HomePage' ); 

       }, error => {
 
       console.log(error);// Error getting the data
       });
	  
	  
	  
	  
     }, (err) => {
      console.log(err);
    });
          }
        },
        {
          text: 'Use Camera',
          handler: () => {

               this.camera.getPicture({
     sourceType: this.camera.PictureSourceType.CAMERA,
     destinationType: this.camera.DestinationType.DATA_URL
    }).then((imageData) => {
       this.base64Image = imageData;
       alert("-**-"+this.base64Image)
       //this.base64Image = 'data:image/jpeg;base64,'+imageData;
       this.userimage=this.base64Image;

 let headers  = new Headers({ 'Content-Type': 'application/json' });
 let postParams = {userid:userid,image:this.base64Image}
console.log("--"+this.base64Image)
       this.http.post("http://aryvartdev.com/reload/api/ApiController/update_profile_image",postParams,headers)
      
       .subscribe(data => {
       this.rescall=data.json();
       console.log("this.rescall(Cam)---"+JSON.stringify(this.rescall));
      var userprofileurl="http://aryvartdev.com/reload/uploads/profile/"+data.json().image;
console.log("userprofileurl---"+userprofileurl);
 this.storage.set('image', data.json().image);
  let toast = this.toastCtrl.create({
         message: "Profile Updated Successfully",
         duration:3000
         });
         toast.onDidDismiss(() => {
           });
         toast.present();
this.app.getRootNav().setRoot( 'HomePage' ); 

       }, error => {
 
       console.log(error);// Error getting the data
       });





    }, (err) => {
       console.log(err);
    });
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }
  
  
  ngOnInit() {

this.user = new FormGroup({
password: new FormControl('', [Validators.required]),
cpassword: new FormControl('', [Validators.required]),
re_password: new FormControl('', [Validators.required,this.equalto('password')])
});

}

equalto(field_name): ValidatorFn {
return (control: AbstractControl): {[key: string]: any} => {

let input = control.value;

let isValid=control.root.value[field_name]==input
if(!isValid) 
return { 'equalTo': {isValid} }
else 
return null;
};
}
  
}