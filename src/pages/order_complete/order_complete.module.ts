import { NgModule } from '@angular/core';

import { OrderCompletePage } from "./order_complete";
import { IonicPageModule } from 'ionic-angular';



@NgModule({
  declarations: [
    OrderCompletePage,

  ],
  imports: [
    IonicPageModule.forChild(OrderCompletePage)
  ]
})
export class Module {}
