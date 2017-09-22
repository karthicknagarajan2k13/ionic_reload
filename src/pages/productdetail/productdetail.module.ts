import { NgModule } from '@angular/core';

import { ProductdetailPage } from "./productdetail";
import { IonicPageModule } from 'ionic-angular';

import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    ProductdetailPage,

  ],
  imports: [
    IonicPageModule.forChild(ProductdetailPage),
	Ionic2RatingModule
  ]
})
export class Module {}
