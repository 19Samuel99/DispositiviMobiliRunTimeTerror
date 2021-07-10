import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DavederePageRoutingModule } from './davedere-routing.module';

import { DavederePage } from './davedere.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DavederePageRoutingModule
  ],
  declarations: [DavederePage]
})
export class DavederePageModule {}
