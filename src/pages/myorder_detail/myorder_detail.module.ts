import { NgModule } from '@angular/core';

import { MyorderdetailPage } from "./myorder_detail";
import { IonicPageModule } from 'ionic-angular';



@NgModule({
  declarations: [
    MyorderdetailPage,

  ],
  imports: [
    IonicPageModule.forChild(MyorderdetailPage)
  ]
})
export class Module {}
