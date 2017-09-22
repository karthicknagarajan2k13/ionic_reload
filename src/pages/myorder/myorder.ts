import { Component } from '@angular/core';
import { Network } from '@ionic-native/network';
import { App,NavController, NavParams ,IonicPage} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';

import { NativeStorage } from '@ionic-native/native-storage';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
/**
 * Generated class for the MyorderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-myorder',
  templateUrl: 'myorder.html',
})
export class MyorderPage {

userid:any;
	public mainList:Array<any>;
	mainListLen:any;
	mainListLen2:any=0;
	status:any;
	public loadedmainList:Array<any>;
    rootNavCtrl: NavController;
    carcount:any;
  constructor(	private network: Network,private storage: Storage,public app: App,public navParams: NavParams,public alertCtrl: AlertController,public http: Http,public loadCtrl: LoadingController,public toastCtrl: ToastController,
		public nativeStorage: NativeStorage, public nav: NavController) {
  this.storage.get('userid').then((val) => {
			
	this.userid=val;

	 this.storage.get('carcount').then((val) => {
			this.carcount=val;
			console.log("this.carcount--"+this.carcount);
			
		});
	  	let headers  = new Headers({ 'Content-Type': 'application/json' });
			let postParams = { 

	  userid:this.userid,
	 
			}
			console.log("-postParams--"+JSON.stringify(postParams));
			this.http.post("http://aryvartdev.com/reload/api/ApiController/order_list",postParams,headers)
			
			.subscribe(data => {/* 
			this.loadCtrl.create({
			  content: 'Please wait...',
			  duration: 1000,
			  dismissOnPageChange: true
			}).present(); */
			console.log("--resp-"+JSON.stringify(data.json()));
			this.status=data.json().status;
			console.log("--this.status-"+this.status);
			console.log("---"+JSON.stringify(data.json().message));

			this.mainList = data.json().message;
			
	/* 			var adminChance = this.mainList;
		$scope.admissionchancesList=[];
		var col = Array();
			for(var i in adminChance) {
			 var data = adminChance[i];
			 $scope.admissionchancesList.push({"name":data.name,"location":data.location,"average_sat":data.average_sat,"acceptance":data.acceptance,"chance":data.chance,"nces_id":data.nces_id,"chance_desc":data.chance_desc});
		} */
			

			this.mainListLen=data.json().message.length;
			this.mainListLen2=data.json().message.length;
			console.log("postParams--"+JSON.stringify(postParams));
			}, error => {
			console.log(error);// Error getting the data
			});
			this.rootNavCtrl = navParams.get('rootNavCtrl');
			
		});

		}

	back()
			{

		this.app.getRootNav().setRoot( 'HomePage' ); 
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
			goOrderDetail(orderdetails){
			
			
			this.app.getRootNav().setRoot( 'MyorderdetailPage'); 
		this.storage.set('orderdetails', orderdetails);
		
			
			}

}
