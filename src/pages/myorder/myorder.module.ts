import { NgModule } from '@angular/core';

import { MyorderPage } from "./myorder";
import { IonicPageModule } from 'ionic-angular';



@NgModule({
  declarations: [
    MyorderPage,

  ],
  imports: [
    IonicPageModule.forChild(MyorderPage)
  ]
})
export class ForgetPasswordModule {}
