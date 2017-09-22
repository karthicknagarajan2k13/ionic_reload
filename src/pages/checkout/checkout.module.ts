import { NgModule } from '@angular/core';

import { CheckoutPage } from "./checkout";
import { IonicPageModule } from 'ionic-angular';



@NgModule({
  declarations: [
    CheckoutPage,

  ],
  imports: [
    IonicPageModule.forChild(CheckoutPage)
  ]
})
export class Module {}
