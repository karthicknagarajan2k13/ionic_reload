import { NgModule } from '@angular/core';

import { MycartPage } from "./mycart";
import { IonicPageModule } from 'ionic-angular';



@NgModule({
  declarations: [
    MycartPage,

  ],
  imports: [
    IonicPageModule.forChild(MycartPage)
  ]
})
export class ForgetPasswordModule {}
