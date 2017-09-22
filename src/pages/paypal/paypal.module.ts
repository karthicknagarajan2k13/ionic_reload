import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { PayPalPage } from './paypal';




@NgModule({
  declarations: [
    PayPalPage
  ],
  imports: [
    IonicPageModule.forChild(PayPalPage)
  ]
})

export class PayPalModule {

}