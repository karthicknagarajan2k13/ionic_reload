import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecentlyviewedPage } from "./recentlyviewed";

@NgModule({
  declarations: [
    RecentlyviewedPage
  ],
  imports: [
    IonicPageModule.forChild(RecentlyviewedPage)
  ]
})
export class Module {}