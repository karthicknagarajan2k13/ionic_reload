import { NgModule } from '@angular/core';

import { ForgetPasswordPage } from "./forget_pass";
import { IonicPageModule } from 'ionic-angular';



@NgModule({
  declarations: [
    ForgetPasswordPage,

  ],
  imports: [
    IonicPageModule.forChild(ForgetPasswordPage)
  ]
})
export class ForgetPasswordModule {}
