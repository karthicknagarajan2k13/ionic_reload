import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TodayofferPage } from "./todayoffer";

@NgModule({
  declarations: [
    TodayofferPage
  ],
  imports: [
    IonicPageModule.forChild(TodayofferPage)
  ]
})
export class Module {}