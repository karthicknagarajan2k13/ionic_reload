import { Component } from '@angular/core';

import {App,IonicPage, NavController} from 'ionic-angular';
// import {SuperTabsController} from "ionic2-super-tabs";
import { Network } from '@ionic-native/network';
import { Storage } from '@ionic/storage';

import { PopoverController} from 'ionic-angular';
import { PopoverPage } from "./popover";
import { ToastController } from 'ionic-angular';
@IonicPage({
 
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
	export class HomePage {
	username: string;
	carcount:any;
	page1: any = 'OutletPage';
	page2: any = 'RecentlyviewedPage';
    page3: any = 'LatestPage';
	 page4: any = 'TodayofferPage';
	showTitles: boolean = true;
	constructor(private network: Network,public toastCtrl: ToastController,public app: App,private storage: Storage,public popoverCtrl: PopoverController,public navCtrl: NavController) {
/*     const type = navParams.get('type'); */

	  this.storage.get('carcount').then((val) => {
			this.carcount=val;
			console.log("this.carcount--"+this.carcount);
			
		});	
	}

	ngAfterViewInit() {
    // this.superTabsCtrl.increaseBadge('page1', 10);
    // this.superTabsCtrl.enableTabSwipe('page3', false);
    // this.superTabsCtrl.enableTabsSwipe(false);
	}
openPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }
  onTabSelect(tab: { index: number; id: string; }) {
    console.log(`Selected tab: `, tab);
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
