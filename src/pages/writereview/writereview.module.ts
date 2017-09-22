import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WritereviewPage } from "./writereview";
import { Ionic2RatingModule } from 'ionic2-rating';
@NgModule({
  declarations: [
    WritereviewPage
  ],
  imports: [
    IonicPageModule.forChild(WritereviewPage),
	Ionic2RatingModule
  ]
})
export class Module {}